import type { Metadata } from "next";
import TransactionList from "@/components/transaction-list";
import { getAllTransactions } from "@/lib/data";
import { TransactionData } from "@/lib/actions";

export const metadata: Metadata = {
  title: "All Transactions",
  description: "View and filter all your transactions",
};

export default async function TransactionsPage() {
  const transactions = await getAllTransactions();

  return (
    <main className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">All Transactions</h1>
      <TransactionList initialTransactions={transactions as unknown as TransactionData[]} />
    </main>
  );
}
