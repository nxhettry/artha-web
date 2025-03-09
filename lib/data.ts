import { cache } from "react";
import connectDb from "@/lib/mongodb";
import Transaction from "@/models/transaction.model";
import Person from "@/models/person.model";
import { TransactionData } from "./actions";

export const getTransactionSummary = cache(async () => {
  await connectDb();

  // Aggregate transactions by category
  const summary = await Transaction.aggregate([
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" },
      },
    },
  ]);

  // Convert to object with category totals
  const result = {
    income: 0,
    expense: 0,
    borrow: 0,
    lend: 0,
    balance: 0,
  };

  summary.forEach((item) => {
    result[item._id as keyof typeof result] = item.total;
  });

  // Calculate balance
  result.balance = result.income + result.borrow - result.expense - result.lend;

  return result;
});

export const getRecentTransactions = cache(async (limit = 5) => {
  await connectDb();

  const transactions = await Transaction.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

  return transactions;
});

export const getAllTransactions = cache(async (): Promise<TransactionData[]> => {
  await connectDb();

  const transactions = await Transaction.find().sort({ createdAt: -1 }).lean();

  return JSON.parse(JSON.stringify(transactions)) as TransactionData[];
});

export const getCategoryReport = cache(async () => {
  // For simplicity, we'll reuse the transaction summary
  return getTransactionSummary();
});

export const getPersons = cache(async () => {
  await connectDb();

  const persons = await Person.find().lean();

  return persons;
});
