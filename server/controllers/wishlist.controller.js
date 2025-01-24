import mongoose from "mongoose";
import Wishlist from '../models/wishlist.model.js';

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
  return
}

export const getWishlist = async (req, res) => {
  return
}

export const deleteWishlistItem = async (req, res) => {
  return
}

export const deleteWishlist = async (req, res) => {
  return
}


export const renameWishlist = async (req, res) => {
  return
}
