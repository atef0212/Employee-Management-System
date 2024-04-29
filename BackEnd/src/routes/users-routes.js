import express from "express"
<<<<<<< HEAD
import { getUsers,signup, login, logout } from "../controllers/users-controller.js"
=======
import { getUsers, signup } from "../controllers/users-controller.js"
>>>>>>> createRegisterApi

const userRoute=express.Router()

userRoute.get("/", getUsers)
<<<<<<< HEAD
userRoute.post("/signup", signup)
userRoute.post("/login", login)
userRoute.post("/logout", logout)
=======
userRoute.post("/signup",signup )



>>>>>>> createRegisterApi

export default userRoute