import { Bell, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface DashboardHeaderProps {
  userRole?: "admin" | "organizer" | "participant";
  userName?: string;
}

export function DashboardHeader({ userRole = "participant" }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 backdrop-blur-lg px-6">
      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search events, resources, clubs..."
          className="pl-10 bg-secondary/50 border-transparent focus:border-primary/20 focus:bg-background"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {(userRole === "admin" || userRole === "organizer") && (
          <Button asChild size="sm">
            <Link to="/events/create">
              <Plus className="h-4 w-4 mr-1" />
              Create Event
            </Link>
          </Button>
        )}

        <Button variant="ghost" size="icon" className="relative" asChild>
          <Link to="/notifications">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs font-bold text-destructive-foreground">
              5
            </span>
          </Link>
        </Button>
      </div>
    </header>
  );
}
