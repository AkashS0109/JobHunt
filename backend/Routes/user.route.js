import express from "express"
import { login,register, Updatedprofile ,logout} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {singleUpload} from "../middlewares/multer.js"


const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login)
router.route("/logout").get(logout);  //get bcz we r not ending any data
router.route("/profile/update").post(isAuthenticated,singleUpload,Updatedprofile);





export default router;