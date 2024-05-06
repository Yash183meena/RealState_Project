import mongoose from "mongoose";

const userschema=new mongoose.Schema({
      username:{
            type:String,
            unique:true,
            required:true
      },
      email:{
            type:String,
            unique:true,
            required:true
      },
      password:{
            type:String,
            required:true
      },
      avatar:{
            type:String,
            default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZWPEbLHUeotJRbLGKp1yVO6Hgckj201aDjvAOcBU67Q&s"
      }

},{timestamps:true})

const User=mongoose.model("User",userschema);

export default User;