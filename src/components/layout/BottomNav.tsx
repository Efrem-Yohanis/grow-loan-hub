import { Home, PiggyBank, Landmark, MoreHorizontal } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/savings", icon: PiggyBank, label: "Savings" },
  { to: "/loans", icon: Landmark, label: "Loans" },
  { to: "/more", icon: MoreHorizontal, label: "More" },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border md:hidden">
      <div className="flex items-center justify-around py-2 px-4 safe-area-inset-bottom">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={cn(
              "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200",
              "text-muted-foreground hover:text-foreground"
            )}
            activeClassName="text-primary bg-primary/10"
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
