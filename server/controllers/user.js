import User from "./../models/User.js";
import md5 from "md5"
import JWT from "jsonwebtoken"
const postSingup= async(req,res)=>{
    const {name,email,password}=req.body;
    if(!name,!email,!password){
        return res.json({
            success:false,
            message:"All fields are required"
        })
    }
    const emailValidationRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameValidationRegex=/^[a-zA-Z ]+$/;
    const passwordValidationRegex= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if(nameValidationRegex.test(name)===false){
        return res.json({
            success:false,
            message:"Name Should only contain alphabets"
        })
    }
    if(emailValidationRegex.test(email)===false){
        return res.json({
            success:false,
            message:"Invalid email format"
        })
    }
    if(passwordValidationRegex.test(password)===false){
        return res.json({
            success:false,
            message:"Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        })
    }

    const existingUser= await User.findOne({email});
    if(existingUser){
        return res.json({
            success:false,
            message:`User with email: ${email} has already registered`
        })
    }
    const newuser= new User({name,email,password: md5(password)})

    const savedUser= await newuser.save();
    res.json({
        success:true,
        user:savedUser,
        message:"User registered Successfully",
    })
}

const postLogin=async(req,res)=>{
    const {email,password}=req.body;
    if(!email,!password){
        return res.status(400).json({
            success:false,
            message:"All fields are required",
        })
    }
    const existingUser= await User.findOne({email,password: md5(password) }).select(" _id name email ")
    if(existingUser){

        const token = JWT.sign({
            _id:existingUser._id, email:existingUser.email, name:existingUser.name
        },
            process.env.JWT_SECERT,
        {expiresIn:"1d"}
    )

        res.json({
            success:true,
            message:"Login Successful",
            user:existingUser,token
        })
    }else{
        res.json({
            success:false,
            message:"Invalid email or password",
            user:null
        })
    }
}

export {postSingup, postLogin};