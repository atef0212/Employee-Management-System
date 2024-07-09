import userModel from "../models/users-Schema.js";
import bcrypt from 'bcrypt'
import commentModel from "../models/comment-Schema.js";
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from "cloudinary";


const getUsers = async (req, res) => {
  let users;
  try {
     users = await userModel.find(users)
    
    // Merging users and employees into a single array

   
    res.status(200).json({  users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: "Fetching users failed, please try again later." });
  }
};
const getUserById= async(req, res)=>{
  const {id}=req.params
  try{
    const getUser= await userModel.findById(id)
    if(!getUser){
      return res.status(404).json({ msg: "User not found" });
    }
    return res.status(200).json({ msg: 'User founded successfully', getUser });

  }
  catch (error) {
    console.error('Error finding user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// = async (req, res) => {
//   const userId = req.params.userId;
//   const newData = req.body;

//   try {
//       const updatedUser = await userModel.findByIdAndUpdate(userId, newData);
//       res.status(200).json(updatedUser);
//   } catch (error) {
//       res.status(500).json({ error: error.message });
//   }
// }

const editEmployeedata = async (req, res, next) => {
  const { id } = req.params;
  const newData = req.body;

  try {
    // Find the existing user by ID and update with new data
    const existingUser = await userModel.findByIdAndUpdate(id, newData, { new: true });

    if (!existingUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Save the updated user data
    await existingUser.save();

    // Send response
    res.status(200).json({ msg: "User data updated successfully", existingUser });
  } catch (error) {
    // Handle errors
    console.error("Error updating user data:", error);
    res.status(500).json({ msg: "Internal Server Error" });
    next(error);
  }
};



const deleteUser=async (req, res)=>{
  let {id}=req.params
  try {
    const deletedUser = await userModel.findByIdAndDelete(id);
console.log(deleteUser)

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ msg: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

const signup = async (req, res) => {
  try {
    console.log('Received file:', req.file); // Log the received file

    const { name, age, tall, land, gender, email, password } = req.body;

    // Check if the email already exists in the database
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    let role = "user";
    if (email === "che@gmail.com") {
      role = "admin";
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);




    // Upload avatar image to Cloudinary
    const fileImg = await cloudinary.uploader.upload(req.file.path);
    const { secure_url, public_id } = fileImg;

    // Create a new user with hashed password
    const newUser = new userModel({
      email,
      age,
      tall,
      land,
      gender,
      name,
      role,
      password: hashedPassword,
      avatarImg: { url: secure_url, id: public_id },
    });
    await newUser.save();
    res.status(201).json({ msg: "New user added", newUser: newUser });
    console.log("new User", newUser)
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};


const uploadAvatarImg = async (req, res) => {
  try {

    const { id } = req.params;
    console.log(id)
    console.log(req.file)
    const fileImg = await cloudinary.uploader.upload(req.file.path);

    const { secure_url, public_id } = fileImg;

    const userToUpdate = await userModel.findByIdAndUpdate(
      id,
      { avatarImg: { url: secure_url, id: public_id } },
      { new: true }
    );

    if (!userToUpdate) {
      return res.status(404).json({ message: "User not found!" });
    }
    const updatedUser = userToUpdate.toObject();
    delete updatedUser.password;
    res.json({ message: "User updated", updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const findUser = await userModel.findOne({ email });
    if (!findUser) {
      return res.status(404).json({ msg: "Invalid username or password" });
    }
    // Compare the provided password with the hashed password stored in the database
    const validPassword = await bcrypt.compare(password, findUser.password);

    if (!validPassword) {
      return res.status(401).json({ msg: "Invalid username or password" });
    }

    // If logIn is successful, generate JWT token
    const user = {
      userId: findUser._id,
      role:findUser.role


    };
    const accessToken = jwt.sign(user,"secretKey" , { expiresIn: "1h" });
 const refreshToken = jwt.sign({ userId: user.userId },"tokenRefreshsecretKey" , { expiresIn: "7d" });

    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
      }) .cookie("refreshToken", refreshToken, {
        httpOnly: true,
      })
      .status(200)
      .json({ message: "login successfully",user, accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};







const logout = async (req, res) => {
  try {
    // Respond with a success message
    res.clearCookie("token").status(200).json({ message: "logout successful" });
  } catch (error) {
    // If token verification fails, or any other error occurs
    res.status(500).json({ message: error.message });
  }
};

const comment = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { comments } = req.body;

    const newComment = new commentModel({
      userId: userId,
      text: comments,
    });

    await newComment.save();

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.comments.push(newComment._id);
    await user.save();

    return res.status(200).json({ message: "Comment added successfully", comment: newComment });
  } catch (error) {
    console.error("Error adding comment:", error);
    return res.status(500).json({ message: "Comment not added", error: error.message });
  }
};
const getComment = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await userModel.findById(userId).populate('comments');
    console.log("user", user)
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ comments: user.comments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return res.status(500).json({ message: 'Error fetching comments', error: error.message });
  }
};
const getAllcomments = async (req, res) => {
  try {
    const comments = await commentModel.find()
      .populate({
        path: 'userId',
        select: 'name avatarImg.url' // Only select the name and avatar image URL fields
      })
      .exec();
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
const editComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;

    const updatedComment = await commentModel.findByIdAndUpdate(commentId, { text }, { new: true });

    if (!updatedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.json({ message: 'Comment updated successfully', updatedComment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const deleteComment= async (req, res) => {
  try {
    const { commentId } = req.params;

    const deletedComment = await commentModel.findByIdAndDelete(commentId);

    if (!deletedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.json({ message: 'Comment deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
export  {getComment,getAllcomments,getUsers, signup, login, logout, editEmployeedata, deleteUser, getUserById, uploadAvatarImg,comment, editComment, deleteComment};
