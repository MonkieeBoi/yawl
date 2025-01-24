import express from "express";
import { newItem, getItem, updateItem, deleteItem } from "../controllers/item.controller.js"

const router = express.Router();

router.post("/", newItem)

router.delete("/:id", deleteItem)

router.get("/:id", getItem)

// router.get("/", getItem)

router.put("/:id", updateItem)

export default router;
