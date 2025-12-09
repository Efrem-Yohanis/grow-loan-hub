import { Plus, ArrowDownToLine, Calculator, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const actions = [
  {
    icon: Plus,
    label: "Add Savings",
    description: "Make a deposit",
    variant: "default" as const,
  },
  {
    icon: ArrowDownToLine,
    label: "Withdraw",
    description: "Request funds",
    variant: "outline" as const,
  },
  {
    icon: Calculator,
    label: "Loan Calculator",
    description: "Check eligibility",
    variant: "secondary" as const,
  },
  {
    icon: FileText,
    label: "Statements",
    description: "View history",
    variant: "secondary" as const,
  },
];

export function QuickActions() {
  return (
    <div className="animate-fade-up stagger-1" style={{ opacity: 0 }}>
      <h3 className="text-sm font-semibold text-muted-foreground mb-3">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {actions.map((action, index) => (
          <Button
            key={action.label}
            variant={action.variant}
            className={cn(
              "h-auto flex-col gap-2 py-4 px-3",
              action.variant === "default" && "shadow-glow"
            )}
          >
            <action.icon className="h-5 w-5" />
            <div className="text-center">
              <p className="text-sm font-semibold">{action.label}</p>
              <p className="text-xs opacity-70">{action.description}</p>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}
