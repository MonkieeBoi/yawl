import mongoose from "mongoose";
import Wishlist from '../models/wishlist.model.js';
import { newItemHelper } from "./item.controller.js";
import Item from "../models/item.model.js";
import User from "../models/user.model.js";

export const newWishlist = async (req, res) => {
  const wishlistDetails = req.body;
  wishlistDetails.items = []

  const newWishlist = new Wishlist(wishlistDetails)

  if (!wishlistDetails.name) {
    return res.status(400).json({success:false, message: "Not all fields were provided"});
  }

  try {
    await newWishlist.save();
    res.status(201).json({success:true, data: newWishlist});
  } catch (error) {
    console.error("Error in new wishlist item:", error.message)
    res.status(500).json({success: false, message: "Server Error"});
  }
}

export const newWishlistItem = async (req, res) => {
  const item = req.body;
  const newItem = newItemHelper(item)
  if (newItem === 500) {

    res.status(500).json({success: false, message: "Server Error"});
  } else if (newItem === 400) {

    res.status(400).json({success: false, message: "Not all fields provided"});
  } else {
    res.status(201).json({success: true, data: item});
  }
}

export const getWishlistByUser = async (req, res) => {
  const {username} = req.params
  try {
    const user = await User.findOne({ username }).populate("wishlist");

    if (user) {
      res.status(200).json({success: true, data: user.wishlist}); 
    }
    res.status(404).json({success: false, message: "User not found" });
  } catch (error) {
    res.status(404).json({success: false, message: "User not found" });;
  }
  return
};

export const getWishlistById = async (req, res) => {
  const {wishlistId} = req.params
  try {
    const wishlist = await Wishlist.findById(wishlistId);
    if (wishlist) {
      res.status(200).json({success: true, data: wishlist});
    } else {
    res.status(404).json({success: false, message: "Wishlist Not Found"});
    }
  } catch (error) {
    res.status(404).json({success: false, message: "Wishlist Not Found"});
  }
  return
}

export const deleteWishlistItem = async (req, res) => {
  const {wishlistId} = req.params
  const {itemId} = req.params
  try {
    const wishlist = await Wishlist.findById(wishlistId);
    const index = wishlist.items.findIndex(x => x == itemId)
    if (index !== -1) {
      wishlist.item.splice(index, 1);
      await Item.findByIdAndDelete(itemId)
      wishlist.save()
      res.status(200).json({success: true, message: `Deleted item with id: ${itemId}`});
    } else {
    res.status(404).json({success: false, message: "Item Not Found"});
    }
  } catch (error) {
    res.status(404).json({success: false, message: "Wishlist Not Found"});
  }
  return
}

// TODO make sure they are authed
export const deleteWishlist = async (req, res) => {
  const {id} = req.params
  try {
    await Wishlist.findByIdAndDelete(id);
    res.status(200).json({success: true, message: `Deleted item with id: ${id}`});
  } catch (error) {
    res.status(404).json({success: false, message: "Not Found"});

  }
}


export const renameWishlist = async (req, res) => {
  const { userId } = req;
  const { id, name } = req.body;

  if (!(id && name)) {
    return res.status(422).json({ message: "Not all fields were provided" });
  }

  try {
    const wishlist = await Wishlist.findById(id);

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    if (wishlist.author != userId) {
      return res.status(401).json({ message: "Wishlist not owned by current user" });
    }

    wishlist.name = name;
    await wishlist.save();
    return res.sendStatus(200);
  } catch (e) {
    return res.status(500).json({ message: "Failed to rename wishlist" });
  }
};
