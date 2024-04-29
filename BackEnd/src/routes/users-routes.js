import express from "express"
import { getUsers,signup, login, logout } from "../controllers/users-controller.js"
import { useValidator,logInValidator, validate } from "../maddleWare/useValidator.js"
const userRoute=express.Router()

userRoute.get("/", getUsers)
userRoute.post("/signup",useValidator, validate, signup)
userRoute.post("/login", logInValidator, validate,login)
userRoute.post("/logout", logout)

export default userRoute