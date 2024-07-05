import mongoose from "mongoose";
const { Schema } = mongoose;

const genders = ['male', 'female', 'other'];

const avatarImgSchema = new Schema(
  {
    url: {
      type: String,
      default: "https://ionicframework.com/docs/img/demos/avatar.svg",
    },


  },
  {  id: false }
);

const userSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true, min: 18, max: 99 },
  tall: { type: Number },
  land: { type: String, required: true },
  gender: {
    type: String,
    enum: genders,
    required: true
  },
  avatarImg: avatarImgSchema,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },

  salary: {
    type: Number,
    required: true,
    default: 1000
  },
  vacationDays: {
    type: Number,
    required: true,
    default: 28
  },

  workHours: {
    type: Number,
    required: true,
    default: 140
  },
  contractLimit: {
    type: String,
    required: true,
    default: "One Year"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  department: {
    type: String,
    required: true,
    default: "Web Developer"
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  comments: [{
    type: mongoose.Types.ObjectId,
    ref: "comment"
  }]
});

const userModel = mongoose.model("User", userSchema);
export default userModel;
