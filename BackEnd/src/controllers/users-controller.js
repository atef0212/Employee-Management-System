import userModel from "../models/users-Schema.js";
import employeeModel from "../models/employee-Schema.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const getUsers = async (req, res) => {
  try {
    const users = await userModel.find({}).populate('userData');
    const employees = await employeeModel.find({});
    
    // Merging users and employees into a single array
    const allUsers = [...users, ...employees];
    
    res.status(200).json({ success: true, users: allUsers });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: "Fetching users failed, please try again later." });
  }
};




const signup=async (req, res) => {
  try {
    const {  name,
      age,
      tall,
      land,
      gender,
      email,
      password, } = req.body;

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

    // Create a new user with hashed password
    const newUser = await userModel.create({
      email,
      age,
      tall,
      land,
      gender,
      name,
      role,
      password: hashedPassword,
    });



  res.status(201).json({ msg: "New user added", newUser:newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};







export  {getUsers, signup};
