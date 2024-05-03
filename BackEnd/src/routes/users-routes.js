import express from "express"
import { getUsers,signup, login, logout } from "../controllers/users-controller.js"
import { useValidator,logInValidator, validate } from "../maddleWare/useValidator.js"
import { verifyToken, isAdmin } from "../maddleWare/check-auth.js"
const userRoute=express.Router()

userRoute.get("/" , getUsers)
userRoute.post("/signup",useValidator, validate, signup)
userRoute.post("/login", logInValidator, validate,login)
userRoute.post("/logout", logout)

export default userRoute