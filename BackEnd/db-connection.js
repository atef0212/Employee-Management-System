import mongoose from "mongoose";
import './config/congfig.js'

export async function connect(){

    try{

        await mongoose.connect(process.env.UEI)
        console.log("Database connected successfully");

    }catch(error){
        console.error("Database connection error:", error);

    }
}