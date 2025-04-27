import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true, 
    },
    password: {
        type: String,
        required: true,
        select:false, // 
    },
    role: {
        type: String,
        enum:["admin", "user"],
        default: "user",
    },
    image:{
        public_id:{
            type: String,
            default: "https://res.cloudinary.com/dqj0xgk8v/image/upload/v1698231234/blank-profile-picture-973460_640_ojxq5c.png",
        },
        secure_url:{
            type: String,
            default: "blank-profile-picture-973460_640",
        }
    },
    address: {
        type: String,
        default: "Not provided",
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const User = mongoose.model("User", userSchema);
export default User;