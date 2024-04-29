import express from "express"
import { getUsers } from "../controllers/users-controller.js"

const userRoute=express.Router()

userRoute.get("/", getUsers)


export default userRoute