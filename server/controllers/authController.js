import bcrypt from "bcryptjs";
import cloudinary from "cloudinary";
import User from "../models/user.mode.js";
import JwtService from "../utils/jwtUtils.js";
const cookieOptions = {
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    httpOnly: true,
    secure:true, // Set to true if using HTTPS
};
const login=async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Please provide email and password" });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
    const isPasswordMatch = bcrypt.compare(password,user.password);
    if (!isPasswordMatch) {
        return res.status(401).json({ message: "Incorrect password" });
    }
    const token =JwtService.generateToken({userId: user._id, role: user.role });
    res.cookie('token', token, cookieOptions);
    user.password = undefined; // Remove password from user object
    return res.status(200).json({ success: true,message:"User logged in successfully" ,user: user,token });  
}
const signup=async (req, res) => {
    const { name, email, password,address,role,phoneNumber} = req.body;
    if (!name || !email || !password || !address || !role ||!phoneNumber) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }
    const user = new User({ name, email, password ,address, role ,phoneNumber});
    const hashedPassword = await bcrypt.hash(password,10);
    user.password = hashedPassword;
    
    if(req.file){
      try{
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
            folder: "TRAOF",
            width: 150,
            height: 150,
            crop: "fill",
        });
        user.image.public_id = result.public_id;
        user.image.secure_url = result.secure_url;
       
      }catch(error){
        return res.status(500).json({ message: "Image upload failed", error });
      }
    }
    
    await user.save();
    
    return res.status(201).json({ success: true,message:"User created successfully" ,user});
}
export { login, signup };

