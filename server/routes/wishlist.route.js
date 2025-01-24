import express from "express";
import { newWishlist, newWishlistItem, getWishlist, deleteWishlistItem, deleteWishlist, renameWishlist} from "../controllers/wishlist.controller.js"

const router = express.Router();

router.post("/", newWishlist)

router.delete("/:id", newWishlistItem)

export default router;
