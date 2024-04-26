import mongoose from "mongoose"
const genders = ['male', 'female', 'other'];




const userSchema= new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number ,required: true, min: 18, max: 99},
    tall: { type: Number },
   land: { type: String , required: true},
    gender: {
       type: String,
       enum: genders,
       required: true
 },
 //image: { type: String, required: true },

    email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },

  userData:[{type: mongoose.Types.ObjectId, ref: "userData"}],
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }

})




 const userModel=mongoose.model("user", userSchema)
 export default userModel