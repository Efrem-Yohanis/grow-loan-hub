import { LayoutDashboard, TrendingUp, Users, Smartphone, Download, UserPlus, UserMinus, ArrowUpCircle, ChevronRight, Database, Megaphone, Headphones, Gavel, Moon, Lock, Activity, BarChart3, Store, FileCode2 } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";

const dailyMetrics = [
  { title: "Daily Active Customers", url: "/metric/daily-active-customers", icon: Users },
  { title: "Daily Gross Adds", url: "/metric/daily-gross-adds", icon: UserPlus },
  { title: "Daily Non-Gross Adds", url: "/metric/daily-non-gross-adds", icon: UserMinus },
  { title: "Daily App Downloads", url: "/metric/daily-app-downloads", icon: Download },
  { title: "Daily Active Micro Merchants", url: "/metric/daily-active-micro-merchants", icon: Store },
  { title: "Daily Active Unified Merchants", url: "/metric/daily-active-unified-merchants", icon: Store },
];

const thirtyDayMetrics = [
  { title: "30D Active Total", url: "/metric/30d-active-total", icon: TrendingUp },
  { title: "30D Active New", url: "/metric/30d-active-new", icon: UserPlus },
  { title: "30D Active Existing", url: "/metric/30d-active-existing", icon: Users },
  { title: "30D Active Transacting Total", url: "/metric/30d-active-transacting-total", icon: Activity },
  { title: "30D Active New (txn)", url: "/metric/30d-active-new-txn", icon: ArrowUpCircle },
  { title: "30D Active Existing (txn)", url: "/metric/30d-active-existing-txn", icon: ArrowUpCircle },
  { title: "30D Active App Users", url: "/metric/30d-active-app-users", icon: Smartphone },
  { title: "30D App Transacting", url: "/metric/30d-app-transacting", icon: BarChart3 },
  { title: "30D Active Micro Merchants", url: "/metric/30d-active-micro-merchants", icon: Store },
  { title: "30D Active Unified Merchants", url: "/metric/30d-active-unified-merchants", icon: Store },
];

const ninetyDayMetrics = [
  { title: "90D Active Total", url: "/metric/90d-active-total", icon: TrendingUp },
  { title: "90D Active New", url: "/metric/90d-active-new", icon: UserPlus },
  { title: "90D Active Existing", url: "/metric/90d-active-existing", icon: Users },
  { title: "90D Active Transacting Total", url: "/metric/90d-active-transacting-total", icon: Activity },
  { title: "90D Active New (txn)", url: "/metric/90d-active-new-txn", icon: ArrowUpCircle },
  { title: "90D Active Existing (txn)", url: "/metric/90d-active-existing-txn", icon: ArrowUpCircle },
];

function MetricsSubMenu({ metrics, label, icon: Icon, defaultOpen = false }: { 
  metrics: typeof dailyMetrics; 
  label: string; 
  icon: React.ComponentType<{ className?: string }>;
  defaultOpen?: boolean;
}) {
  const { open } = useSidebar();
  
  if (!open) {
    return (
      <SidebarMenuItem className="animate-fade-in">
        <SidebarMenuButton className="group relative overflow-hidden rounded-lg hover:bg-sidebar-accent/80 transition-all duration-300 justify-center">
          <Icon className="h-4 w-4 transition-transform group-hover:scale-110 group-hover:text-sidebar-primary" />
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return (
    <Collapsible defaultOpen={defaultOpen} className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton className="group relative overflow-hidden rounded-lg hover:bg-sidebar-accent/80 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity" />
            <Icon className="h-4 w-4 transition-transform group-hover:scale-110 group-hover:text-sidebar-primary" />
            <span className="text-sm transition-colors">{label}</span>
            <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {metrics.map((metric, idx) => (
              <SidebarMenuSubItem key={metric.title} className="animate-fade-in" style={{ animationDelay: `${idx * 15}ms` }}>
                <SidebarMenuSubButton asChild className="group relative overflow-hidden hover:bg-sidebar-accent/80 transition-all duration-300">
                  <NavLink
                    to={metric.url}
                    end
                    className="relative z-10"
                    activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  >
                    <metric.icon className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
                    <span className="text-xs">{metric.title}</span>
                  </NavLink>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

export function AppSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar className={!open ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-sidebar border-r border-sidebar-border shadow-elegant overflow-hidden">
        {/* Header Section */}
        {open && (
          <div className="px-4 py-3 border-b border-sidebar-border/50">
            <div className="relative inline-block">
              <h2 className="text-base font-bold bg-gradient-primary bg-clip-text text-transparent">
                CVM Metrics
              </h2>
              <div className="absolute -inset-2 bg-gradient-primary opacity-20 blur-xl -z-10" />
            </div>
            <p className="text-xs text-sidebar-foreground/60 mt-0.5">Real-time analytics</p>
          </div>
        )}

        {/* Navigation Section */}
        <SidebarGroup className={open ? "px-3 py-2" : "px-1 py-2"}>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              {/* Dashboard Overview */}
              <SidebarMenuItem className="animate-fade-in">
                <SidebarMenuButton asChild className={`group relative overflow-hidden rounded-lg hover:bg-sidebar-accent/80 transition-all duration-300 ${!open ? "justify-center" : ""}`}>
                  <NavLink 
                    to="/" 
                    end
                    className="relative z-10"
                    activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium border-l-2 border-sidebar-primary"
                  >
                    <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity" />
                    <LayoutDashboard className="h-4 w-4 transition-transform group-hover:scale-110 group-hover:text-sidebar-primary" />
                    {open && <span className="text-sm transition-colors">Dashboard Overview</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Daily Metrics */}
              <MetricsSubMenu metrics={dailyMetrics} label="Daily Metrics" icon={Activity} defaultOpen />
              
              {/* 30D Metrics */}
              <MetricsSubMenu metrics={thirtyDayMetrics} label="30D Metrics" icon={TrendingUp} />
              
              {/* 90D Metrics */}
              <MetricsSubMenu metrics={ninetyDayMetrics} label="90D Metrics" icon={BarChart3} />

              {/* Base Preparation */}
              <SidebarMenuItem className="animate-fade-in">
                <SidebarMenuButton asChild className={`group relative overflow-hidden rounded-lg hover:bg-sidebar-accent/80 transition-all duration-300 ${!open ? "justify-center" : ""}`}>
                  <NavLink 
                    to="/base-preparation" 
                    end
                    className="relative z-10"
                    activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium border-l-2 border-sidebar-primary"
                  >
                    <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity" />
                    <Database className="h-4 w-4 transition-transform group-hover:scale-110 group-hover:text-sidebar-primary" />
                    {open && <span className="text-sm transition-colors">Base Preparation</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Campaign Management */}
              <SidebarMenuItem className="animate-fade-in">
                <SidebarMenuButton asChild className={`group relative overflow-hidden rounded-lg hover:bg-sidebar-accent/80 transition-all duration-300 ${!open ? "justify-center" : ""}`}>
                  <NavLink 
                    to="/campaign-management" 
                    end
                    className="relative z-10"
                    activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium border-l-2 border-sidebar-primary"
                  >
                    <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity" />
                    <Megaphone className="h-4 w-4 transition-transform group-hover:scale-110 group-hover:text-sidebar-primary" />
                    {open && <span className="text-sm transition-colors">Campaign Management</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* SQL Query Library */}
              <SidebarMenuItem className="animate-fade-in">
                <SidebarMenuButton asChild className={`group relative overflow-hidden rounded-lg hover:bg-sidebar-accent/80 transition-all duration-300 ${!open ? "justify-center" : ""}`}>
                  <NavLink 
                    to="/sql-query-library" 
                    end
                    className="relative z-10"
                    activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium border-l-2 border-sidebar-primary"
                  >
                    <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity" />
                    <FileCode2 className="h-4 w-4 transition-transform group-hover:scale-110 group-hover:text-sidebar-primary" />
                    {open && <span className="text-sm transition-colors">SQL Query Library</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Ops Support - Collapsible */}
              {open ? (
                <Collapsible className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton className="group relative overflow-hidden rounded-lg hover:bg-sidebar-accent/80 transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity" />
                        <Headphones className="h-4 w-4 transition-transform group-hover:scale-110 group-hover:text-sidebar-primary" />
                        <span className="text-sm transition-colors">Ops Support</span>
                        <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem className="animate-fade-in">
                          <SidebarMenuSubButton asChild className="group relative overflow-hidden hover:bg-sidebar-accent/80 transition-all duration-300">
                            <NavLink to="/ops-support/court-issue" className="relative z-10" activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium">
                              <Gavel className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
                              <span className="text-xs">Court Issue</span>
                            </NavLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem className="animate-fade-in">
                          <SidebarMenuSubButton asChild className="group relative overflow-hidden hover:bg-sidebar-accent/80 transition-all duration-300">
                            <NavLink to="/ops-support/dormant-list" className="relative z-10" activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium">
                              <Moon className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
                              <span className="text-xs">Dormant List</span>
                            </NavLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem className="animate-fade-in">
                          <SidebarMenuSubButton asChild className="group relative overflow-hidden hover:bg-sidebar-accent/80 transition-all duration-300">
                            <NavLink to="/ops-support/pinlock" className="relative z-10" activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium">
                              <Lock className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
                              <span className="text-xs">Pinlock</span>
                            </NavLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem className="animate-fade-in">
                  <SidebarMenuButton className="group relative overflow-hidden rounded-lg hover:bg-sidebar-accent/80 transition-all duration-300 justify-center">
                    <Headphones className="h-4 w-4 transition-transform group-hover:scale-110 group-hover:text-sidebar-primary" />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
