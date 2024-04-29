import express from "express"
import { getUsers, signup } from "../controllers/users-controller.js"

const userRoute=express.Router()

userRoute.get("/", getUsers)
userRoute.post("/signup",signup )




export default userRoute