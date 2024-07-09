import exress from "express"
import { authenticateToken, refreshAccessToken } from "../maddleWare/check-auth.js";
import { comment, getAllcomments, editComment, deleteComment } from "../controllers/users-controller.js";

const commentRoute=exress.Router()

commentRoute.post("/:userId/comment",authenticateToken, comment);
commentRoute.put("/:commentId",authenticateToken, editComment);
commentRoute.delete("/:commentId",authenticateToken, deleteComment);
commentRoute.get("/",authenticateToken, getAllcomments)
export default commentRoute