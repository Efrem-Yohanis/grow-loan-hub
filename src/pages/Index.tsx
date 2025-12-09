import { AppLayout } from "@/components/layout/AppLayout";
import { BalanceCard } from "@/components/dashboard/BalanceCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { SavingsPlanBanner } from "@/components/dashboard/SavingsPlanBanner";
import { LoanSummary } from "@/components/dashboard/LoanSummary";
import { TransactionList } from "@/components/dashboard/TransactionList";
import { mockUser } from "@/lib/mockData";

const Index = () => {
  return (
    <AppLayout>
      <div className="container py-6 space-y-6">
        {/* Welcome Header */}
        <div className="animate-fade-up">
          <p className="text-muted-foreground">Welcome back,</p>
          <h1 className="text-2xl md:text-3xl font-bold">{mockUser.name}</h1>
        </div>

        {/* Balance Card */}
        <BalanceCard
          balance={mockUser.savingsBalance}
          totalSaved={mockUser.totalSaved}
          monthlyGrowth={8.5}
        />

        {/* Quick Actions */}
        <QuickActions />

        {/* Savings Plan Banner */}
        <SavingsPlanBanner
          plan={mockUser.currentPlan}
          startDate={mockUser.planStartDate}
        />

        {/* Two Column Layout for Loan & Transactions */}
        <div className="grid md:grid-cols-2 gap-6">
          <LoanSummary loan={mockUser.activeLoan} />
          <TransactionList transactions={mockUser.transactions} />
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
