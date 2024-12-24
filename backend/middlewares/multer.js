import multer from "multer";

// it play role as a mddle ware so it is used in authentication
const storage =multer.memoryStorage();
export const singleUpload = multer({ storage }).single("file"); 