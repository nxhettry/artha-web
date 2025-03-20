import type { Metadata } from "next";
import TransactionForm from "@/components/transaction-form";

export const metadata: Metadata = {
  title: "New Transaction",
  description: "Add a new transaction to your finance tracker",
};

export const dynamic = "force-dynamic";

export default async function NewTransactionPage() {
  return (
    <main className="container mx-auto px-4 py-6 max-w-lg">
      <h1 className="text-2xl font-bold mb-6">New Transaction</h1>
      <TransactionForm />
    </main>
  );
}
