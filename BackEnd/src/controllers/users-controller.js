import userModel from "../models/users-Schema.js";
import employeeModel from "../models/employee-Schema.js";

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

export  {getUsers};
