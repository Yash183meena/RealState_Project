import mongoose from 'mongoose';

const listingSchema=new mongoose.Schema(
      {
            name:{
                  type:String,
                  required:true,
            },
            description:{
                  type:String,
                  required:true,
            },
            address:{
                  type:String,
                  required:true
            },
            regularPrice:{
                  type:Number,
                  required:true,
            },
            discountPrice:{
                  type:Number,
                  required:true
            },
            bathrooms:{
                  type:Number,
                  required:true,
            },
            bedrooms:{
                  type:Number,
                  required:true,
            },
            furnished:{
                  type:Boolean,
                  required:true,
            },
            type:{
               type:String,
               required:true,
            },
            offer:{
                  //offer chal raha hai ya nnahi
                  type:Boolean,
                  required:true,
            },
            imageUrls:{
                  //multiple images can we save in this form of array
                  type:Array,
                  required:true,
            },
            userRef:{
                  //this is for the reference of the user i.e which uuser is can add the property
                  type:String,
                  required:true
            }
     },
{timestamps:true});

const Listing = mongoose.model('Listing',listingSchema);

export default Listing;

