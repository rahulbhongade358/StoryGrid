import User from "./../models/User.js";

const postSingup= async(req,res)=>{
    const {username,email,password}=req.body;
    if(!username,!email,!password){
        return res.json({
            success:false,
            message:"All fields are required"
        })
    }
    const emailValidationRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameValidationRegex=/^[a-zA-Z ]+$/;
    const passwordValidationRegex= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if(nameValidationRegex.test(username)===false){
        return res.json({
            success:false,
            message:"Username Should only contain alphabets"
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
    const newuser= new User({username,email,password})

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
    const existingUser= await User.findOne({email,password});
    if(existingUser){
        res.json({
            success:true,
            message:"Login Successful",
            user:existingUser
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