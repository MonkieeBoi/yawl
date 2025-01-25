import mongoose from "mongoose";
import Wishlist from '../models/wishlist.model.js';
import { newItemHelper } from "./item.controller.js";

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
  return
}

export const getWishlist = async (req, res) => {
  return
}

export const deleteWishlistItem = async (req, res) => {

  return
}

export const deleteWishlist = async (req, res) => {
  const {id} = req.params
  try {
    await Wishlist.findByIdAndDelete(id);
    res.status(200).json({success: true, message: `Deleted item with id: ${id}`});
  } catch (error) {
    res.status(404).json({success: false, message: "Not Found"});

  }
  return
}


export const renameWishlist = async (req, res) => {
  return
}
