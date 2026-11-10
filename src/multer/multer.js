import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { AppError } from "../utilities/AppError.js";



function multerRefactor(folderName){
   const storage = multer.diskStorage({
    // destination: function (req, file, cb) {
    //   cb(null, "uploads/" + folderName);
    // },
    // filename: function (req, file, cb) {
    //   cb(null, uuidv4() + "-" + file.originalname);
    // },
  });
  const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new AppError("image only", 401), false);
    }
  };
  const upload = multer({ storage, fileFilter });
  return upload
}
export const uploadSingleFile = (fileName, folderName) =>  multerRefactor(folderName).single(fileName);
export const uploadMultiFile = (arrOfFields, folderName) => multerRefactor(folderName).fields(arrOfFields);

