import mongoose from "mongoose";

export const dbConnection = async() => {
  await mongoose
    .connect(process.env.DB_CONNECTION)
    .then(() => {
      console.log(" db connected");
    })
    .catch((err) => {
      console.log(err);
    });
};
