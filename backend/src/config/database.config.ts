import mongoose from "mongoose";
import { config } from "./app.config";

const connectDatabase = async () => {
  try {
    console.log("Attempting to connect to MongoDB:", config.MONGO_URI);
    await mongoose.connect(config.MONGO_URI, {
      serverSelectionTimeoutMS: 30000, // 30s instead of 10s
      connectTimeoutMS: 30000,
      socketTimeoutMS: 30000,
    });
    console.log("Connected to Mongo database");
  } catch (error) {
    console.log("Error connecting to Mongo database:", error);
    process.exit(1);
  }
};

export default connectDatabase;
