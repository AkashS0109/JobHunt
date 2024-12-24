
import mongoose from "mongoose";

const jobSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
     requirements:[{
        type:String,   
    }],
    salary:{
        type:Number,
        required:true
    },
    experienceLevel:{
      type:Number,
      required:true
    },
    location:{
        type:String,
        required:true,
    },
    jobType:{
        type:String,
        required:true,
    },
    position:{
        type:String,
        required:true
    },
    // which portionu want relation like job  have relation with company
    company:{
         type:mongoose.Schema.Types.ObjectId,  //job have relation with company id
         ref:'Company',
         required:true
    },
    created_by:{
         type:mongoose.Schema.Types.ObjectId,  //job have relation with company id
         ref:'User',
         required:true
    },
    ///used in application controller to push new applying
    applications:[{
        type:mongoose.Schema.Types.ObjectId,  //job have relation with company id
         ref:'Application',
    }]
},{timestamps:true});
export const Job=mongoose.model("Job",jobSchema)