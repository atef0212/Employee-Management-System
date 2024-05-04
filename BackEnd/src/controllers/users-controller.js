import userModel from "../models/users-Schema.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
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

const addEmployeeData = async (req, res, next) => {
  const { salary, vacationDays, workHours, contractLimit, createdAt,updatedAt,department } = req.body;
  console.log(req.body)
  const userIdToUpdate = req.params.uid;

  try {
    const existingUser = await userModel.findById(userIdToUpdate);

    if (!existingUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Update user data
    existingUser.salary = salary;
    existingUser.vacationDays = vacationDays;
    existingUser.workHours = workHours;
    existingUser.contractLimit = contractLimit;
    existingUser.createdAt = createdAt;
    existingUser.updatedAt=updatedAt
    existingUser.department=department

    // Save the updated user data
    await existingUser.save();
    
    // Send response
    res.status(200).json({ msg: "User data updated successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error updating user data:", error);
    res.status(500).json({ msg: "Internal Server Error" });
    next(error);
  }
};


// const addEmployee = async (req, res) => {
//   try {
//     // Assuming the request body contains the necessary employee data
//     const newEmployee = await employeeModel.create(req.body);
//     res.status(201).json({ success: true, employee: newEmployee });
//   } catch (error) {
//     console.error("Error adding employee:", error);
//     res.status(500).json({ success: false, message: "Adding employee failed, please try again later." });
//   }
// };

const deleteUser=async (req, res)=>{
  let {id}=req.params
  try {
    const deletedUser = await userModel.findByIdAndDelete(id);


    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ msg: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}


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






export  {getUsers, signup, login, logout, addEmployeeData, deleteUser, getUserById};
