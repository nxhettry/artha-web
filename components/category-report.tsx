"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatCurrency } from "@/lib/utils"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CategoryReport({ data }: { data: any }) {
  const [timeframe, setTimeframe] = useState("all")

  // In a real app, you'd filter data based on timeframe
  // For now, we'll just use the data as is

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Income vs Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Income:</span>
                <span className="font-medium text-green-600">{formatCurrency(data.income)}</span>
              </div>
              <div className="flex justify-between">
                <span>Expenses:</span>
                <span className="font-medium text-red-600">{formatCurrency(data.expense)}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span>Net:</span>
                <span className={`font-medium ${data.income - data.expense >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {formatCurrency(data.income - data.expense)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Borrowed vs Lent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Borrowed:</span>
                <span className="font-medium text-blue-600">{formatCurrency(data.borrow)}</span>
              </div>
              <div className="flex justify-between">
                <span>Lent:</span>
                <span className="font-medium text-orange-600">{formatCurrency(data.lend)}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span>Net:</span>
                <span className={`font-medium ${data.borrow - data.lend >= 0 ? "text-blue-600" : "text-orange-600"}`}>
                  {formatCurrency(data.borrow - data.lend)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

