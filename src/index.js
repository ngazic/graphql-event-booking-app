import { app } from "./app.js";
import "dotenv/config";
import mongoose from "mongoose";

const port = 4000;

const start = async () => {
  try {
    if (!process.env.MONGO_PASSWORD) {
      throw new Error("MONGO_PASSWORD env variable is not defined");
    }

    if (!process.env.MONGO_DB) {
      throw new Error("MONGO_DB env variable is not defined");
    }

    // Handling mongodb connection
    const uri =
      "mongodb+srv://ngazic:" +
      process.env.MONGO_PASSWORD +
      "@cluster0.zaq4q.mongodb.net/" +
      process.env.MONGO_DB +
      "?retryWrites=true&w=majority";

    await mongoose.connect(uri);
    console.log("Connected to MongoDB server!");

    // Run the server
    app.listen(port, () => {
      console.log("listening on port " + port);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
