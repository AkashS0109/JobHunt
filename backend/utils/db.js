import mongoose from "mongoose";


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
     
    });
   
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit the process with failure
  }
};

export default connectDB;



// // Database connection
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URL);
//     console.log('mongooBD connteced Successfully');
//   }
//   catch(error){
//     console.log(error);
//   }
    
// }
// export default connectDB;
