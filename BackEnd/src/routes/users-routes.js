import express from "express"
import { getUsers,signup, login, logout } from "../controllers/users-controller.js"

const userRoute=express.Router()

userRoute.get("/", getUsers)
userRoute.post("/signup", signup)
userRoute.post("/login", login)
userRoute.post("/logout", logout)

export default userRoute