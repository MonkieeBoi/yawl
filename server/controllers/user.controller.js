import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const hash_rounds = 10;

export const registerUser = async (req, res) => {
  const { username, password } = req.body;

  if (!(username && password)) {
    return res.status(422).json({ message: "Not all fields were provided" });
  }

  try {
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

    return res.status(200).json({
      data: {
        username: username,
        wishlist: user.wishlist,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Registration failed" });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!(username && password)) {
    return res.status(422).json({ message: "Not all fields were provided" });
  }

  try {
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const pwCorrect = await bcrypt.compare(password, user.password);

    if (!pwCorrect) {
      return res.status(403).json({ message: "Incorrect password" });
    }

    const daysToExpire = 30;

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: daysToExpire + "d" },
    );

    const day = 24 * 60 * 60 * 1000;
    const expiry = new Date(Date.now() + daysToExpire * day);

    res.cookie("session_token", token, { expires: expiry });
    res.status(200).json({ token: token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Login failed" });
  }
};

// TODO: invalidate token somehow
export const logoutUser = async (req, res) => {
  res.cookie("session_token", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged out" });
};

export const deleteUser = async (req, res) => {
  const userId = req.userId;
  const password = req.body.password;

  if (!(userId && password)) {
    return res.status(422).json({ message: "Not all fields were provided" });
  }

  try {
    const { deletedCount } = await User.deleteOne({ _id: userId });
    if (deletedCount == 1) {
      return res.status(404).json({ message: "User does not exist" });
    }
    res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete user" });
  }
};

export const isLoggedIn = async (req, res) => {
  const token = req.cookies.session_token;

  if (!token) {
    return res.status(401).json({ loggedIn: false, message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ loggedIn: false, message: "User not found" });
    }

    return res.status(200).json({ loggedIn: true, user });
  } catch (error) {
    return res.status(401).json({ loggedIn: false, message: "Invalid or expired token" });
  }
}