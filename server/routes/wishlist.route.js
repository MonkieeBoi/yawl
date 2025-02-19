import express from "express";
import { newWishlist, newWishlistItem, getWishlistById, getWishlistByAuthor, deleteWishlistItem, deleteWishlist, renameWishlist} from "../controllers/wishlist.controller.js"
import verifyToken from "../utils/verifyJWT.js";

const router = express.Router();

router.post("/", newWishlist)

router.delete("/:id", newWishlistItem)

router.delete("/:wishlistId/item/:itemId", newWishlistItem)

router.get("/:wishlistId", getWishlistById)

router.get("/:author/wishlists", getWishlistByAuthor)

/**
 * @openapi
 * /api/wishlist:
 *   put:
 *     description: Renames a wishlist
 *     tags:
 *       - Wishlists
 *     parameters:
 *       - in: cookie
 *         name: session_token
 *         description: Session token
 *         schema:
 *           type: string
 *         required: true
 *       - in: body
 *         name: wishlist
 *         description: wishlist id and new name
 *         schema:
 *           type: object
 *           required:
 *             - id
 *             - name
 *           properties:
 *             id:
 *               type: string
 *             name:
 *               type: string
 *     responses:
 *       200:
 *         description: Successful wishlist rename
 *       422:
 *         description: Missing fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   enum:
 *                     - Not all fields were provided
 *       404:
 *         description: Wishlist not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   enum:
 *                     - Wishlist not found
 *       401:
 *         description: Not authorised
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   enum:
 *                     - Wishlist not owned by current user
 */
router.put("/", verifyToken, renameWishlist)

export default router;
