import cloudinary from 'cloudinary';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './config/DBConfig.js';
import authRouter from './routes/authRoutes.js';
dotenv.config();
cloudinary.config({
    cloud_name: 'dgbxiu8yj',
    api_key: '212787435519848',
    api_secret: 'PO3uBRUpGAulGKrw1hPbWxs3kHU'
});
const app=express();
const PORT=process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:'http://localhost:5173',
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
}))
app.use("/api/auth",authRouter);
app.all("*", (req, res) => {
  res.status(200).json({ message: "OOPS page not found" });
})
app.listen(PORT,()=>{
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})