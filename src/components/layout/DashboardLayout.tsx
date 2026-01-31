import { ReactNode } from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";

interface DashboardLayoutProps {
  children: ReactNode;
  userRole?: "admin" | "organizer" | "participant";
  userName?: string;
}

export function DashboardLayout({ children, userRole = "participant", userName = "User" }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar userRole={userRole} userName={userName} />
      <div className="pl-16 lg:pl-64 transition-all duration-300">
        <DashboardHeader userRole={userRole} userName={userName} />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
