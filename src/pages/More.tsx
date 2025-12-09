import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Bell, 
  Shield, 
  HelpCircle, 
  FileText, 
  Globe, 
  LogOut,
  ChevronRight,
  Phone,
  Mail
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mockUser } from "@/lib/mockData";

const menuItems = [
  { icon: User, label: 'Profile Settings', description: 'Update your personal information' },
  { icon: Bell, label: 'Notifications', description: 'Manage alert preferences' },
  { icon: Shield, label: 'Security', description: 'Password and authentication' },
  { icon: Globe, label: 'Language', description: 'English (US)', hasValue: true },
  { icon: FileText, label: 'Statements', description: 'Download account statements' },
  { icon: HelpCircle, label: 'Help & Support', description: 'FAQs and contact support' },
];

const More = () => {
  return (
    <AppLayout>
      <div className="container py-6 space-y-6">
        {/* Header */}
        <div className="animate-fade-up">
          <h1 className="text-2xl md:text-3xl font-bold">More</h1>
          <p className="text-muted-foreground">Settings and preferences</p>
        </div>

        {/* Profile Card */}
        <Card variant="elevated" className="animate-fade-up">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full hero-gradient flex items-center justify-center text-primary-foreground text-xl font-bold">
                {mockUser.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{mockUser.name}</h2>
                <p className="text-sm text-muted-foreground">{mockUser.email}</p>
                <p className="text-sm text-muted-foreground">{mockUser.phone}</p>
              </div>
              <Button variant="outline" size="sm">Edit</Button>
            </div>
          </CardContent>
        </Card>

        {/* Menu Items */}
        <Card variant="elevated" className="animate-fade-up stagger-1" style={{ opacity: 0 }}>
          <CardContent className="p-2">
            {menuItems.map((item, index) => (
              <button
                key={item.label}
                className={cn(
                  "w-full flex items-center gap-4 p-4 rounded-lg hover:bg-secondary/50 transition-colors",
                  index !== menuItems.length - 1 && "border-b border-border"
                )}
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Card variant="elevated" className="animate-fade-up stagger-2" style={{ opacity: 0 }}>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Need Help?</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="justify-start gap-2">
                <Phone className="h-4 w-4" />
                Call Support
              </Button>
              <Button variant="outline" className="justify-start gap-2">
                <Mail className="h-4 w-4" />
                Email Us
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Logout */}
        <Button 
          variant="ghost" 
          className="w-full text-destructive hover:text-destructive hover:bg-destructive/10 animate-fade-up stagger-3"
          style={{ opacity: 0 }}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>

        {/* App Version */}
        <p className="text-center text-xs text-muted-foreground animate-fade-up stagger-4" style={{ opacity: 0 }}>
          MicroSave v1.0.0 • © 2024 MicroSave Inc.
        </p>
      </div>
    </AppLayout>
  );
};

export default More;
