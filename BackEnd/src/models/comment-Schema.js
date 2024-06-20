import mongoose from "mongoose";
const { Schema } = mongoose;

const commentSchema =  new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const commentModel = mongoose.model("comment", commentSchema);
export default commentModel;
