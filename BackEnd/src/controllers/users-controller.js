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




const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "Invalid username or password" });
    }
    // Compare the provided password with the hashed password stored in the database
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ msg: "Invalid username or password" });
    }

    // If logIn is successful, generate JWT token
    const payload = {
      userId: user.id,


    };
    const token = jwt.sign(payload, "secretKey", { expiresIn: "1h" });

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ message: "login successfully", user , token});
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






export  {getUsers, signup, login, logout};
