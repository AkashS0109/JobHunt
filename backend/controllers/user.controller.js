import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

export const register= async (req, res) => {
  try {
    const { fullname, email, password, role } = req.body;
    const file = req.file; // For profile photo if uploading through form

    // Handle Google Signup if idToken is provided
  

    // Handle Form Signup (if idToken is not provided)
    if (!fullname || !email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing in the form data",
        success: false,
      });
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "User already exists. Please login.",
        success: false,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Handle profile photo upload (optional)
    let profilePhotoUrl = null;
    if (file) {
      const fileUri = getDataUri(file);
      const cloudinaryResponse = await cloudinary.uploader.upload(fileUri.content);
      profilePhotoUrl = cloudinaryResponse.secure_url;
    }

    // Create new user
    const newUser = await User.create({
      fullname,
      email,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: profilePhotoUrl,
      },
    });

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // Return response
    return res.status(201).cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    }).json({
      message: "Account Created Successfully",
      user: {
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        role: newUser.role,
        profile: newUser.profile,
      },
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: "Something is missing" });
    }

    let user = await User.findOne({ email });
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ email, password: hashedPassword, role });
      await newUser.save();
      user = newUser;
    } else {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({
          message: "Incorrect Email or Password",
          success: false,
        });
      }
    }

    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role.",
        success: false,
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    const sanitizedUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    res.status(200).cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    }).json({
      message: `Welcome back ${sanitizedUser.fullname}`,
      user: sanitizedUser,
      success: true,
    });
   
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};



// Logout logic
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0}).json({
        message: "Logged Out Successfully",
        success: true
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
  
};

// Update Profile logic
export const Updatedprofile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;
    
     const fileuri= getDataUri(file);
     
     const cloudRes=await cloudinary.uploader.upload(fileuri.content);


    let skillsArray;
       if(skills){
         skillsArray = skills.split(",");
        
       }
    const userId = req.id; // Middleware authentication

    // Find user by ID
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
        success: false,
      });
    }

    // Update user data

    if(fullname) user.fullname = fullname
    if(email) user.email = email
    if(phoneNumber) user.phoneNumber = phoneNumber
    if(bio) user.profile.bio=bio
    if(skills) user.profile.skills=skillsArray

      //Resume
        if(cloudRes){
          user.profile.resume=cloudRes.secure_url     //save cludinary url
          user.profile.resumeOriginalName=file.originalname //save the original file name
          console.log(user.profile.resumeOriginalName)
        }


    // Save updated user
    await user.save();

    user= {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: {
      ...user.profile,
      resumeOriginalName: user.profile.resumeOriginalName,
    },   
      
      }
    return res.status(200).json({
      message: "Profile updated Successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

