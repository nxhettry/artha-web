import { getAllTransactions } from "@/lib/data";
import React from "react";
import TransactionList from "@/components/transaction-list";

const PeopleReport = async ({
  searchParams,
}: {
  searchParams: { person?: string };
}) => {
  // Get all transactions
  const transactions = await getAllTransactions();

  const searchPerson = await searchParams;
  const person = searchPerson.person;

  // Filter transactions based on selected person
  const filteredTransactions = person
    ? transactions.filter((transaction) => transaction.person === person)
    : transactions;

  return (
    <main className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Person Report</h1>
      <TransactionList initialTransactions={filteredTransactions} />
    </main>
  );
};

export default PeopleReport;
