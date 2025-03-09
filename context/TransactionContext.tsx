"use client";

import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { getAllTransactions } from "@/lib/data";

interface Transaction {
  _id: string;
  title: string;
  amount: number;
  category: string;
  description: string;
  person?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface TransactionContextType {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

export const TransactionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTransaction = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await getAllTransactions();

        if (res) {
          setTransactions(res as Transaction[]);
        } else {
          setError("Failed to fetch transactions");
        }
      } catch (error) {
        console.log("Error fetching transactions", error);
        setError((error as string) || "An error occured");
      } finally {
        setLoading(false);
      }
    };

    getTransaction();
  }, []);

  return (
    <TransactionContext.Provider value={{ transactions, loading, error }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransaction must be used within a TransactionProvider");
  }
  return context;
};
