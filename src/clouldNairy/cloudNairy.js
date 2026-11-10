import { v2 as cloudinary } from "cloudinary";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret:process.env.API_SECRET,
});

export const uploadImage = async (filepath) => {
  try {
    const result = await cloudinary.uploader.upload(filepath, {
      public_id: uuidv4(),
      folder: `e_commerceApp`, 
    });

    return result.secure_url;
  } catch (error) {
    console.log("Cloudinary Error:", error);
    throw new Error("Image upload failed"); // مهم جداً
  }
};
