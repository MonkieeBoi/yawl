import mongoose from "mongoose";

const wishListSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  items:{
    type: Array,
    required: true
  },
}, {
    timestamps: true
  });



const Wishlist = mongoose.model('Wishlist', wishListSchema)

export default Wishlist;
