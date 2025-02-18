import express from "express";
import verifyToken from "../utils/verifyJWT.js";
import {
  deleteUser,
  loginUser,
  logoutUser,
  registerUser,
  isLoggedIn,
  updateProfilePicture
} from "../controllers/user.controller.js";

const userRouter = express.Router();

/**
 * @openapi
 * /api/users/register:
 *   post:
 *     description: Registers a user
 *     tags:
 *       - Users
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: user credentials
 *         schema:
 *           type: object
 *           required:
 *             - username
 *             - password
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: User added successfully
 *       409:
 *         description: Username already in use
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   enum:
 *                     - Username already in use
 *       500:
 *         description: Registration failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   enum:
 *                     - Registration failed
 */
userRouter.post("/register", registerUser);

/**
 * @openapi
 * /api/users/login:
 *   post:
 *     description: Logs a user in
 *     tags:
 *       - Users
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: user credentials
 *         schema:
 *           type: object
 *           required:
 *             - username
 *             - password
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: Successful login
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               description: session token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 session_token:
 *                   type: string
 *                   description: Session token
 *       404:
 *         description: User does not exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   enum:
 *                     - User does not exist
 *       403:
 *         description: Incorrect password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   enum:
 *                     - Incorrect password
 */
userRouter.post("/login", loginUser);

/**
 * @openapi
 * /api/users/logout:
 *   post:
 *     description: Logs out a user
 *     tags:
 *       - Users
 *     parameters:
 *       - in: cookie
 *         name: session_token
 *         description: Session token
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Successful logout
 *       404:
 *         description: Not logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   enum:
 *                     - Invalid session token
 */
userRouter.post("/logout", verifyToken, logoutUser);

/**
 * @openapi
 * /api/users/delete:
 *   delete:
 *     description: Deletes a user
 *     tags:
 *       - Users
 *     parameters:
 *       - in: cookie
 *         name: session_token
 *         description: Session token
 *         schema:
 *           type: string
 *         required: true
 *       - in: body
 *         name: password
 *         description: user password
 *         schema:
 *           type: object
 *           required:
 *             - password
 *           properties:
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: Successful user deletion
 *       403:
 *         description: invalid token or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   enum:
 *                     - Invalid token or incorrect password
 */
userRouter.delete("/delete", verifyToken, deleteUser);

/**
 * @openapi
 * /api/users/isLoggedIn:
 *   get:
 *     description: Checks if the user is logged in
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: User is authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 loggedIn:
 *                   type: boolean
 *                 user:
 *                   type: object
 *                   description: User information
 *       401:
 *         description: User is not authenticated
 */
userRouter.get("/isLoggedIn", isLoggedIn);


/**
 * @openapi
 * /api/users/updateProfilePicture:
 *   put:
 *     description: updates a user's profile picture
 *     tags:
 *       - Users
 *     parameters:
 *       - in: cookie
 *         name: session_token
 *         description: Session token
 *         schema:
 *           type: string
 *         required: true
 *       - in: body
 *         name: profile_url
 *         description: url for profile picture 
 *         schema:
 *           type: object
 *           required:
 *             - profile_url
 *           properties:
 *             profile_url:
 *               type: string
 *     responses:
 *       200:
 *         description: Profile picture updated
 *       409:
 *         description: Attempted to set same profile picture
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   enum:
 *                     - Attempted to set same profile picture
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   enum:
 *                     - User not found
 */
userRouter.put("/updateProfilePicture", verifyToken, updateProfilePicture);

export default userRouter;
