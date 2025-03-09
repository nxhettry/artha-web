import mongoose from "mongoose";

// Define Transaction Schema
const TransactionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["income", "expense", "borrow", "lend"],
    },
    description: {
      type: String,
      trim: true,
    },
    person: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Define Person Schema
const PersonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create or retrieve models
export const Transaction =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", TransactionSchema);
export const Person =
  mongoose.models.Person || mongoose.model("Person", PersonSchema);
