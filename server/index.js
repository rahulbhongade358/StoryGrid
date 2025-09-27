import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { postLogin, postSingup } from "./controllers/user.js";
import {getBlog, postBlog} from "./controllers/blog.js"
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const connectDB = async()=>{
    try{
        const connect = await mongoose.connect(process.env.MONGO_URL);
        if(connect){ 
        console.log("✅ MongoDB connected successfully");}
    }catch(error){
        console.log(`MongoDB connection error: ${error.message}`);
    }
}

app.get("/health",(req,res)=>{
    res.json({
        success:true,
        message:"Server is healthy"
    })
})
app.post("/singup",postSingup);
app.post("/login",postLogin);
app.post("/addblogs",postBlog);
app.get("/blogs",getBlog)
const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})