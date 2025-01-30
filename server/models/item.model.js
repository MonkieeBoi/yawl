import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
}, {
    timestamps: true
  });



const Item = mongoose.model('Item', itemSchema)

export default Item;
