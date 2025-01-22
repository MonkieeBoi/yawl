import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const hash_rounds = 10;

export const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const usernameUsed = await User.exists({ username: username });

    if (usernameUsed) {
      return res.status(409).json({ message: "Username already in use" });
    }

    const hashedPass = await bcrypt.hash(password, hash_rounds);
    const user = new User({
      username: username,
      password: hashedPass,
    });

    await user.save();

    res.status(201);
  } catch (error) {
    return res.status(500).json({ message: "Registration failed" });
  }
};

export const loginUser = async (req, res) => {
}

export const logoutUser = async (req, res) => {
}

export const deleteUser = async (req, res) => {
}
