import mongoose, { Schema, models, model } from "mongoose";

const TransactionSchema = new Schema(
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

// Use try-catch and destructure models from mongoose
const Transaction = models?.Transaction || model("Transaction", TransactionSchema);

export default Transaction;