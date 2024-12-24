import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";
const router = express.Router();

router.route("/post").post(isAuthenticated,postJob); //aaautheticated bcz only autheticated uer can create job 
router.route("/get").get(isAuthenticated,getAllJobs);    // post bcz we r sending data
router.route("/getadminjobs").get(isAuthenticated,getAdminJobs);  //get bcz we r not ending any data
router.route("/get/:id").get(isAuthenticated,getJobById);


export default router;