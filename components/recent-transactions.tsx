/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatCurrency, formatDate } from "@/lib/utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function RecentTransactions({ transactions }: { transactions: any }) {
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

  return (
    <div className="space-y-4">
      {transactions.length === 0 ? (
        <p className="text-center py-4 text-muted-foreground">
          No recent transactions
        </p>
      ) : (
        transactions.map((transaction: any) => (
          <div
            key={transaction._id}
            className="flex items-center justify-between py-2"
          >
            <div className="space-y-1">
              <p className="font-medium leading-none">{transaction.title}</p>
              <p className="text-sm text-muted-foreground">
                {formatDate(transaction.createdAt)}
              </p>
            </div>
            <div
              className={`font-medium ${getCategoryColor(
                transaction.category
              )}`}
            >
              {getAmountPrefix(transaction.category)}
              {formatCurrency(transaction.amount)}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
