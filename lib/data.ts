import { cache } from "react";
import { connectToDatabase } from "@/lib/mongodb";
import { Transaction } from "@/lib/models";
import { Person } from "@/lib/models";

export const getTransactionSummary = cache(async () => {
  await connectToDatabase();

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
    result[item._id] = item.total;
  });

  // Calculate balance
  result.balance = result.income + result.borrow - result.expense - result.lend;

  return result;
});

export const getRecentTransactions = cache(async (limit = 5) => {
  await connectToDatabase();

  const transactions = await Transaction.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

  return transactions;
});

export const getAllTransactions = cache(async () => {
  await connectToDatabase();

  const transactions = await Transaction.find().sort({ createdAt: -1 }).lean();

  return transactions;
});

export const getCategoryReport = cache(async () => {
  // For simplicity, we'll reuse the transaction summary
  return getTransactionSummary();
});

export const getPersons = cache(async () => {
  await connectToDatabase();

  const persons = await Person.find().lean();

  return persons;
});
