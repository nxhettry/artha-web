import { getAllTransactions } from "@/lib/data";
import React from "react";
import TransactionList from "@/components/transaction-list";

const PeopleReport = async () => {
  // Get all transactions
  const transactions = await getAllTransactions();

  return (
    <main className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Person Report</h1>
      <TransactionList initialTransactions={transactions} />
    </main>
  );
};

export default PeopleReport;
