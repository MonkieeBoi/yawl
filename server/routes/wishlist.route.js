import express from "express";
import { newWishlist, newWishlistItem, getWishlistById, getWishlistIdsByUser, deleteWishlistItem, deleteWishlist, renameWishlist} from "../controllers/wishlist.controller.js"

const router = express.Router();

router.post("/", newWishlist)

router.delete("/:id", newWishlistItem)

router.delete("/:wishlistId/item/:itemId", newWishlistItem)

router.get("/:wishlistId", getWishlistById)

router.get("/:username/wishlists", getWishlistIdsByUser)

export default router;
