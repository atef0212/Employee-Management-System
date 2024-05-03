// import mongoose from "mongoose"

// const employeeSchema= new mongoose.Schema({
   
//     salary: {
//         type: Number,
//         required: true
//         ,default:1000
//       },
//       vacationDays: {
//         type: Number,
//         required: true
//       },
//       workHours: {
//         type: Number,
//         required: true
//       },
//       contractLimit: {
//         type: Date,
//         required: true
//       },
//     createdAt: {
//         type: Date,
//         default: Date.now
//       },
//       updatedAt: {
//         type: Date,
//         default: Date.now
//       },
//       department: { 
//         type: String,
//         required: true
//       }, 
//    Userss:{
//     type: mongoose.Types.ObjectId,  ref:"user"
//    }

// })
//  const employeeModel=mongoose.model("userData", employeeSchema)
//  export default employeeModel