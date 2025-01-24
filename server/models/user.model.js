import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
  wishlist: {
    type: [{ type: mongoose.Types.ObjectId, ref: "Wishlist" }],
    required: false,
  },
  profilePicture: {
    type: String,
    required: false,
    default: "default",
  },
});

const User = mongoose.model("User", userSchema);

export default User;
