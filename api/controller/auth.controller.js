import User from "../models/User.model.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import  jwt  from "jsonwebtoken";

export const signup=async(req,res,next)=>{
     const {username,email,password}=req.body;
     const hashedPassword=bcryptjs.hashSync(password,10);
     const newuser=new User({username,email,password : hashedPassword});
     try{
        await newuser.save();
        res.status(201).json({message:"User created succesfully"});
     }
     catch(err){
      //ye middleware function use ke pass jayege jo index.js me hai
        next(err);
     }
     
}

export const signin=async (req,res,next)=>{
         
      const {email,password}=req.body;

      try{
            const validUser=await User.findOne({email});
            if(!validUser){
                  return next(errorHandler(404,"User not found !"));
            }

            const validpassword=bcryptjs.compareSync(password,validUser.password);
            if(!validpassword){
                  return next(errorHandler(401,"Wrong Credentials !"));
            }

            //creating the json web tokens
            const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET);

            //This is for not sending the password with the cookie only send rest inside it username and email is there
            //isse apne ko thunder client me password nahi milega
            const {password:pass,...rest}=validUser._doc

            //now sending the cookie to the server for validate token
            res.cookie("access_token",token,{httpOnly:true})
            .json(rest)
            .status(200)

      }
      catch(err){
            next(err);
      }
}

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

    export const signout=async(req,res,next)=>{
      try{
        res.clearCookie('access_token');
        res.status(200).json('User has been logged out!');
      }
      catch(error){
        next(error);
      }
    }