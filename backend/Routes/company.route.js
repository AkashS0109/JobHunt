import express from "express"

import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";
import { singleUpload } from "../middlewares/multer.js";
const router = express.Router();

router.route("/register").post(isAuthenticated,registerCompany);
router.route("/get").get(isAuthenticated, getCompany);    // post bcz we r sending data
router.route("/get/:id").get(isAuthenticated,getCompanyById);  //get bcz we r not ending any data
router.route("/update/:id").put(singleUpload,updateCompany);


export default router;