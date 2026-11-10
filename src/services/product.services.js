import slugify from "slugify";
import { uploadImage } from "../clouldNairy/cloudNairy.js";

export const serviceProductRoute = async (req, files) => {
    
  if (files?.imageCover) {
    req.body.imageCover = await uploadImage(files.imageCover[0].path);
  }
  if (files?.images) {
   req.body.images = await Promise.all(
      files.images.map((file) => uploadImage(file.path)),
    );
  }

  req.body.userId = req.user._id;
  req.body.slug = slugify(req.body.title);

  return req.body;
};
