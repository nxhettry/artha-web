import mongoose from "mongoose";

let isConnected = false;

export default async function connectDb() {

  try {
    if(isConnected) {
      console.log("Using existing database connection");
      return;
    }

    if(!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in the environment variables");
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI as string);
    isConnected = true;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error}`);
    throw new Error("Unable to connect to MongoDB");
  }
}
