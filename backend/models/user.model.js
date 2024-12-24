
import mongoose from "mongoose";
const userSchema =  new mongoose.Schema({
    fullname:{
        type:String,
        requird:true
    },
    email:{
        type:String,
        requied:true,
        unique:true
    },
    phoneNumber:{
        type:Number,
        requied:true,   
    },
    password:{
        type:String,
        required:true,     
    },
    role:{
        type:String,
        enum:['student','recruiter'],  //here options so we use enum
        required:true,
    },
    profile:{
        bio:{type:String},
        skills:[{type:String}],  //skills of array type so[] is used
        resume:{type:String}, // URl to resume file
        resumeOriginalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId, ref:'Company'}, // created realtion beetwen company and usertable id of company table is stored
        profilePhoto:{
            type:String,
            default:""
        }
    },
},{timestamps:true});  //?
 const User=mongoose.model('User',userSchema);
 export default User;