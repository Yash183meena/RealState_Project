import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import userRoute from './routes/user.route.js'
import authRoute from './routes/auth.route.js'
import cookieParser from "cookie-parser";
import listingRouter from './routes/listing.route.js';

dotenv.config()

const app=express();

app.use(express.json());

//for accesptin and parsing the cookie come from the server
app.use(cookieParser());

mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(()=>{
      console.log("DATABASE CONNECTED SUCCESFULLY");
}).catch((err)=>{
      console.log(err);
})

app.use('/api/user',userRoute)
app.use('/api/auth',authRoute)
app.use('/api/listing',listingRouter);

app.use((err,req,res,next)=>{
      const statuscode=err.statuscode || 500;
      const message=err.message || "Internal server error";

      return res.status(statuscode).json({
            success:false,
            statuscode,
            message,
      })
})

app.listen(2000,()=>{
      console.log("Server is running on the port 2000")
})