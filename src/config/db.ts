import mongoose from "mongoose";
import envConfig from "./config";

const connectToDatabase=async()=>{
    try{
        mongoose.connection.on("connected",()=>{
            console.log("Connected to database successfully!!")
        })
        await mongoose.connect(envConfig.mongodburi as string)
    }catch(error){
        console.log("Failed to connect!!")
        console.log(error)
        process.exit(1)
    }
    
}

export default connectToDatabase