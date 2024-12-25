import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./Routes/user.route.js";
import companyRoute from "./Routes/company.route.js";
import jobRoute from "./Routes/job.route.js";
import applicationRoute from "./Routes/application.route.js";
 

 

// Load environment variables
dotenv.config({ });

const app = express();




// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
     origin: ["http://localhost:5173","https://job-hunt-eosin.vercel.app","https://jobhunt-n68a.onrender.com","http://localhost:8000"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization','Access-Control-Allow-Credentials'],
    credentials: true,
};
app.use(cors(corsOptions));

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Serve Frontend Static Files




 const PORT = process.env.PORT || 3000;
// Start Server
app.listen(PORT, async () => {
    connectDB();
        console.log(`Server Running at port number ${PORT}`);
    });

