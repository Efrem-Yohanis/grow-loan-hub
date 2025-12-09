import { ArrowUpRight, ArrowDownRight, Percent, Landmark, PiggyBank } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Transaction, formatCurrency, formatDate } from "@/lib/mockData";
import { cn } from "@/lib/utils";

interface TransactionListProps {
  transactions: Transaction[];
  limit?: number;
}

const categoryIcons = {
  deposit: PiggyBank,
  withdrawal: ArrowDownRight,
  interest: Percent,
  loan_disbursement: Landmark,
  loan_repayment: Landmark,
};

const categoryColors = {
  deposit: "bg-success/10 text-success",
  withdrawal: "bg-warning/10 text-warning",
  interest: "bg-info/10 text-info",
  loan_disbursement: "bg-primary/10 text-primary",
  loan_repayment: "bg-destructive/10 text-destructive",
};

export function TransactionList({ transactions, limit = 5 }: TransactionListProps) {
  const displayTransactions = transactions.slice(0, limit);

  return (
    <Card variant="elevated" className="animate-fade-up stagger-2" style={{ opacity: 0 }}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Recent Transactions</CardTitle>
        <Button variant="ghost" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {displayTransactions.map((transaction) => {
            const Icon = categoryIcons[transaction.category];
            const colorClass = categoryColors[transaction.category];

            return (
              <div
                key={transaction.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <div className={cn("h-10 w-10 rounded-full flex items-center justify-center", colorClass)}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{transaction.description}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(transaction.date)}</p>
                </div>
                <div className="text-right">
                  <p
                    className={cn(
                      "font-semibold",
                      transaction.type === "credit" ? "text-success" : "text-foreground"
                    )}
                  >
                    {transaction.type === "credit" ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                  </p>
                  <p
                    className={cn(
                      "text-xs",
                      transaction.status === "completed"
                        ? "text-muted-foreground"
                        : transaction.status === "pending"
                        ? "text-warning"
                        : "text-destructive"
                    )}
                  >
                    {transaction.status}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
