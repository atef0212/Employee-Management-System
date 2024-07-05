import exress from "express"
import { authenticateToken, refreshAccessToken } from "../maddleWare/check-auth.js";
import { comment, getAllcomments, editComment, deleteComment } from "../controllers/users-controller.js";

const commentRoute=exress.Router()

commentRoute.post("/:userId/comment",authenticateToken, comment);
commentRoute.put("/:id",authenticateToken, editComment);
commentRoute.delete("/:userId/:commentId", deleteComment);
commentRoute.get("/",authenticateToken, getAllcomments)
export default commentRoute