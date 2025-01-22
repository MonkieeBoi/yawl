import mongoose from "mongoose";
import Item from '../models/item.model.js';

// TODO: implement
export const newItem = async (req, res) => {
  const item = req.body;

  const newItem = new Item(item)

  if (!item.name || !item.image || !item.price || !item.url) {
    return res.status(400).json({success:false, message: "Not all fields were provided"});
  }

  try {
    await newItem.save();
    res.status(201).json({success:true, data: newItem});
  } catch (error) {
    console.error("Error in new wishlist item:", error.message)
    res.status(500).json({success: false, message: "Server Error"});
  }
}

export const deleteItem = async (req, res) => {
  const {id} = req.params
  try {
    await Item.findByIdAndDelete(id);
    res.status(200).json({success: true, message: `Deleted item with id: ${id}`});
  } catch (error) {
    res.status(404).json({success: false, message: "Not Found"});

  }
}

// gets SPECIFIC ITEM
export const getItem = async (req, res) => {
  const {id} = req.params
  try {
    const item = await Item.findById(id);
    res.status(200).json({success: true, data: item});
  } catch (error) {
    res.status(404).json({success: false, message: "Not Found"});

  }
}


// export const getItems = async (req, res) => {
//   try {
//     const items = await Item.find({});
//     res.status(200).json({success: true, data: items});
//   } catch (error) {
//     console.log("Error in fetching items:", error)
//     res.status(500).json({success: false, message: "Server Error"});
//   }
//
// }

export const updateItem = async (req, res) => {
  const {id} = req.params
  const item = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({success: false, message: "item id invalid"});
  }
  try {
    if (!(await Item.findById(id))) {
    return res.status(404).json({success: false, message: "item not found"});
    }
    const updateditem = await Item.findByIdAndUpdate(id, item, {new:true});
    res.status(200).json({success: true, message: `Updated item with id: ${id}`, data: updateditem});
  } catch (error) {
    res.status(500).json({success: false, message: "Server Error"});
  }
}
