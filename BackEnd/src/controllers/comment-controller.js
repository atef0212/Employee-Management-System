import commentModel from "../models/comment";
const addcomment=async(req, res)=>{

    const {comments}=req.body
    try{
        const addcom= await commentModel.add
    }
}