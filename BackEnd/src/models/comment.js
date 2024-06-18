import mongoose from "mongoose"

 const commentSchema= new mongoose.Schema({
    comments: {
        type: String,
        required: false,
        minlength:6,
        maxlength:25
      },
    userC:{
     type: mongoose.Types.ObjectId,  ref:"user"
    }

 })
  const commentModel=mongoose.model("comment", commentSchema)
  export default commentModel