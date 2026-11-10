import slugify from "slugify";
import { uploadImage } from "../clouldNairy/cloudNairy.js";
import { AppError } from "../utilities/AppError.js";

export const serviceBrandRoute=async (body, file)=>{
   body.slug = slugify(body.name);
   if(!file) throw new AppError("you should upload image",400);
   body.logo=await uploadImage(file.path);
   return body;
}
