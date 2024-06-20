import exress from "express"
import { authenticateToken, refreshAccessToken } from "../maddleWare/check-auth.js";
import { comment, getAllcomments } from "../controllers/users-controller.js";
const commentRoute=exress.Router()

commentRoute.post("/:userId/comment",authenticateToken,refreshAccessToken, comment);
commentRoute.get("/",authenticateToken, getAllcomments)
export default commentRoute