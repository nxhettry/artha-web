"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatCurrency, formatDate } from "@/lib/utils";
import { TransactionData } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteTransaction } from "@/lib/actions";
import { toast } from "sonner";

export default function TransactionList({
  initialTransactions,
}: {
  initialTransactions: TransactionData[];
  person: boolean;
}) {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    let filtered = initialTransactions;

    if (newFilters.search) {
      const searchLower = newFilters.search.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.title.toLowerCase().includes(searchLower) ||
          (t.description &&
            t.description.toLowerCase().includes(searchLower)) ||
          (t.person && t.person.toLowerCase().includes(searchLower))
      );
    }

    if (newFilters.category !== "all") {
      filtered = filtered.filter((t) => t.category === newFilters.category);
    }

    setTransactions(filtered);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "income":
        return "text-green-600";
      case "expense":
        return "text-red-600";
      case "borrow":
        return "text-blue-600";
      case "lend":
        return "text-orange-600";
      default:
        return "";
    }
  };

  const getAmountPrefix = (category: string) => {
    switch (category) {
      case "income":
        return "+";
      case "expense":
        return "-";
      case "borrow":
        return "+";
      case "lend":
        return "-";
      default:
        return "";
    }
  };

  const handleDelete = async (transactionId: string) => {
    try {
      const isSuccess = await deleteTransaction(transactionId);

      if (isSuccess) {
        toast.success("Transaction deleted successfully");
      } else {
        toast.error("Failed to delete transaction");
      }

      // Update local state after successful deletion
      const updatedTransactions = transactions.filter(
        (t) => t._id !== transactionId
      );
      setTransactions(updatedTransactions);
      // Also update initial transactions to maintain filter consistency
      initialTransactions = initialTransactions.filter(
        (t) => t._id !== transactionId
      );
    } catch (error) {
      console.error("Failed to delete transaction:", error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search transactions..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
          />
        </div>
        <div className="w-full sm:w-48">
          <Select
            value={filters.category}
            onValueChange={(value) => handleFilterChange("category", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
              <SelectItem value="borrow">Borrow</SelectItem>
              <SelectItem value="lend">Lend</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Person</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-6 text-muted-foreground"
                >
                  No transactions found
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((transaction) => (
                <TableRow key={transaction._id}>
                  <TableCell>{formatDate(transaction.createdAt!)}</TableCell>
                  <TableCell className="font-medium">
                    {transaction.title}
                  </TableCell>
                  <TableCell className="capitalize">
                    {transaction.category}
                  </TableCell>
                  <TableCell>{transaction.person || "-"}</TableCell>
                  <TableCell
                    className={`text-right ${getCategoryColor(
                      transaction.category
                    )}`}
                  >
                    {getAmountPrefix(transaction.category)}
                    {formatCurrency(transaction.amount)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:text-red-500"
                      onClick={() => handleDelete(transaction._id!)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
