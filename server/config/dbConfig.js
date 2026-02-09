import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGO_URL = process.env.MONGO_URL;

export async function dbConnect() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Db connected successfully");
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}
