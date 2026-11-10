import express from 'express'
import { dbConnection } from './database/dbConnection.js';
import bootstrap from "./src/utilities/bootstrap.js"
import dotenv from "dotenv"
import cors from "cors";

dotenv.config()
const app = express()
const port = process.env.PORT || 3000
app.use(cors());

app.use("/api/v1/orders/webhook",
  express.raw({ type: "application/json" })
);

app.use(express.json());

app.use('/uploads',express.static("uploads"));

 app.get("/", (req, res) => {
  res.status(200).send("Server is running 🚀");
});

bootstrap(app);
const startServer = async () => {
  try {
    await dbConnection();
    app.listen(port, () =>
      console.log(`Server running at port ${port}`)
    );
  } catch (error) {
    console.log("Failed to connect DB:", error);
  }
};
startServer();