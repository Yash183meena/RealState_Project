import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import userRoute from './routes/user.route.js'
import authRoute from './routes/auth.route.js'
import cookieParser from "cookie-parser";
import listingRouter from './routes/listing.route.js';
import path from 'path';
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

// path.resolve() method without any arguments resolves to the current working directory.
//gives the current working directory
const __dirname=path.resolve();

app.use('/api/user',userRoute)
app.use('/api/auth',authRoute)
app.use('/api/listing',listingRouter);

//ye static wala middelewre routing ke baad hi use karna warna chalega nahi
app.use(express.static(path.join(__dirname,'/client/dist')));
 //sarre jo frontend ke assets hai wo server pr jaakar rkh dega aur uske baad backend ke server par hi apna project run ho jayega and ye production grid me kaam aata hai
app.get('*',(req,res)=>{
      res.sendFile(path.join(__dirname,'client','dist','index.html'));
})

//this gives current_working_directorty/client/dist/index.html'

app.use((error,req,res,next)=>{
      const statuscode=error.statuscode || 500;
      const message=error.message || "Internal server error";

      return res.status(statuscode).json({
            success:false,
            statuscode,
            message,
      })
})

app.listen(2000,()=>{
      console.log("Server is running on the port 2000")
})