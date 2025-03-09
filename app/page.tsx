import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, BarChart3 } from "lucide-react";
import TransactionSummary from "@/components/transaction-summary";
import RecentTransactions from "@/components/recent-transactions";
import { getTransactionSummary, getRecentTransactions } from "@/lib/data";

export default async function Home() {
  const summary = await getTransactionSummary();
  const recentTransactions = await getRecentTransactions(5);

  return (
    <main className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Finance Tracker</h1>
          <p className="text-muted-foreground">
            Manage your personal finances with ease
          </p>
        </div>
        <Link href="/transactions/new">
          <Button className="w-full md:w-auto">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Transaction
          </Button>
        </Link>
      </div>

      <TransactionSummary data={summary} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">
              Recent Transactions
            </CardTitle>
            <Link href="/transactions">
              <Button variant="ghost" size="sm">
                View all
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <RecentTransactions transactions={recentTransactions} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Reports</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Link href="/reports/categories">
                <Button variant="outline" className="w-full justify-start">
                  By Categories
                </Button>
              </Link>
              <Link href="/reports/persons">
                <Button variant="outline" className="w-full justify-start">
                  By Person
                </Button>
              </Link>
              <Link href="/reports/monthly">
                <Button variant="outline" className="w-full justify-start">
                  Monthly Summary
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
