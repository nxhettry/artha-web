"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatCurrency, formatDate } from "@/lib/utils"

export default function TransactionList({ initialTransactions }) {
  const [transactions, setTransactions] = useState(initialTransactions)
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
  })

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)

    // Filter transactions based on new filters
    let filtered = initialTransactions

    if (newFilters.search) {
      const searchLower = newFilters.search.toLowerCase()
      filtered = filtered.filter(
        (t) =>
          t.title.toLowerCase().includes(searchLower) ||
          (t.description && t.description.toLowerCase().includes(searchLower)) ||
          (t.person && t.person.toLowerCase().includes(searchLower)),
      )
    }

    if (newFilters.category !== "all") {
      filtered = filtered.filter((t) => t.category === newFilters.category)
    }

    setTransactions(filtered)
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case "income":
        return "text-green-600"
      case "expense":
        return "text-red-600"
      case "borrow":
        return "text-blue-600"
      case "lend":
        return "text-orange-600"
      default:
        return ""
    }
  }

  const getAmountPrefix = (category) => {
    switch (category) {
      case "income":
        return "+"
      case "expense":
        return "-"
      case "borrow":
        return "+"
      case "lend":
        return "-"
      default:
        return ""
    }
  }

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
          <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                  No transactions found
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((transaction) => (
                <TableRow key={transaction._id}>
                  <TableCell>{formatDate(transaction.createdAt)}</TableCell>
                  <TableCell className="font-medium">{transaction.title}</TableCell>
                  <TableCell className="capitalize">{transaction.category}</TableCell>
                  <TableCell>{transaction.person || "-"}</TableCell>
                  <TableCell className={`text-right ${getCategoryColor(transaction.category)}`}>
                    {getAmountPrefix(transaction.category)}
                    {formatCurrency(transaction.amount)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

