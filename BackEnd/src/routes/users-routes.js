import express from "express";
import {
  getUsers,
  signup,
  login,
  logout,
  editEmployeedata,
  deleteUser,
  getUserById,
  uploadAvatarImg,getComment

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
userRoute.put("/edit/:id",authenticateToken, editEmployeedata);
userRoute.get("/:id", getUserById);
userRoute.delete("/:id",authenticateToken,isAdmin, deleteUser);
userRoute.post("/logout", logout);
userRoute.get("/:userId//comment",getComment )
  .route("/upload-avatar/:id")
  .patch(cloudinaryMulter.single("image"), uploadAvatarImg);

export default userRoute;
