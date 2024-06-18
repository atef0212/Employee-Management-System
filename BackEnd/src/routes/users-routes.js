import express from "express";
import {
  getUsers,
  signup,
  login,
  logout,
  editEmployeedata,
  deleteUser,
  getUserById,
  uploadAvatarImg,
  comment,
} from "../controllers/users-controller.js";
import {
  useValidator,
  logInValidator,
  validate,
} from "../maddleWare/useValidator.js";
import { authenticateToken, isAdmin } from "../maddleWare/check-auth.js";
import { cloudinaryMulter } from "../upload-Images.js";

const userRoute = express.Router();

userRoute.get("/", authenticateToken, getUsers);
userRoute.post("/signup",cloudinaryMulter.single("image"), useValidator, validate, signup);
userRoute.post("/login", logInValidator, validate, login);
userRoute.put("/edit/:id", editEmployeedata);
userRoute.get("/:id", getUserById);
userRoute.delete("/:id", deleteUser);
userRoute.post("/logout", logout);
userRoute.post("/comment/:id", authenticateToken, comment);
userRoute
  .route("/upload-avatar/:id")
  .patch(cloudinaryMulter.single("image"), uploadAvatarImg);

export default userRoute;
