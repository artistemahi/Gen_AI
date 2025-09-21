import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { postUserProfile, getUserProfile } from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/me", verifyToken, postUserProfile);
userRouter.get("/me", verifyToken, getUserProfile);

export default userRouter;