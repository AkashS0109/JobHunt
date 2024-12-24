import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";

const router = express.Router();

router.route("/apply/:id").get(isAuthenticated,applyJob);
router.route("/get").get(isAuthenticated, getAppliedJobs);    // post bcz we r sending data
router.route("/:id/applicants").get(isAuthenticated, getApplicants);  //get bcz we r not ending any data
router.route("/status/:id/update").post(isAuthenticated,updateStatus);


export default router;