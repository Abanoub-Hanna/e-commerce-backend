import slugify from "slugify";
import { AppError } from "../utilities/AppError.js";
import { uploadImage } from "../clouldNairy/cloudNairy.js";

export const serviceCategoryRoute = async (body, file) => {
      body.slug = slugify(body.name);
      if (!file) throw new AppError("upload Image", 500);
      body.image = await uploadImage(file.path);
    
      return body;
}