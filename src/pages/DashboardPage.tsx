import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Users,
  Building2,
  TrendingUp,
  ArrowRight,
  Clock,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  {
    title: "Upcoming Events",
    value: "12",
    change: "+3 this week",
    icon: Calendar,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Active Bookings",
    value: "5",
    change: "2 pending approval",
    icon: Building2,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    title: "Club Memberships",
    value: "4",
    change: "Tech Club, Art Club...",
    icon: Users,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    title: "Attendance Rate",
    value: "87%",
    change: "+5% from last month",
    icon: TrendingUp,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
];

const upcomingEvents = [
  {
    id: 1,
    title: "Tech Talk: AI in Education",
    date: "Today, 3:00 PM",
    location: "Auditorium A",
    status: "approved",
    attendees: 45,
  },
  {
    id: 2,
    title: "Hackathon 2024 Kickoff",
    date: "Tomorrow, 10:00 AM",
    location: "Innovation Lab",
    status: "approved",
    attendees: 120,
  },
  {
    id: 3,
    title: "Art Exhibition Opening",
    date: "Mar 15, 5:00 PM",
    location: "Gallery Hall",
    status: "pending",
    attendees: 30,
  },
];

const recentBookings = [
  {
    id: 1,
    resource: "Conference Room B",
    date: "Mar 12, 2:00 PM - 4:00 PM",
    status: "approved",
  },
  {
    id: 2,
    resource: "Projector Set #3",
    date: "Mar 14, 9:00 AM - 12:00 PM",
    status: "pending",
  },
  {
    id: 3,
    resource: "Outdoor Stage",
    date: "Mar 18, All Day",
    status: "approved",
  },
];

const quickActions = [
  { title: "Create Event", href: "/events/create", icon: Calendar },
  { title: "Book Resource", href: "/resources", icon: Building2 },
  { title: "View Analytics", href: "/analytics", icon: TrendingUp },
  { title: "Browse Clubs", href: "/clubs", icon: Users },
];

export default function DashboardPage() {
  return (
    <DashboardLayout userRole="organizer" userName="John Doe">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Welcome back, John! 👋</h1>
            <p className="text-muted-foreground mt-1">
              Here's what's happening on campus today.
            </p>
          </div>
          <div className="flex gap-3">
            <Button asChild>
              <Link to="/events/create">
                <Calendar className="h-4 w-4 mr-2" />
                Create Event
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="card-interactive">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold mt-1">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {quickActions.map((action) => (
                <Button
                  key={action.title}
                  variant="outline"
                  className="h-auto py-4 flex-col gap-2"
                  asChild
                >
                  <Link to={action.href}>
                    <action.icon className="h-5 w-5" />
                    <span className="text-sm">{action.title}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Upcoming Events */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Upcoming Events</CardTitle>
                <CardDescription>Events you're organizing or attending</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/events">
                  View all
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-start gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-medium truncate">{event.title}</h4>
                      <Badge variant={event.status as "approved" | "pending"}>
                        {event.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {event.location}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {event.attendees} attendees
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Bookings */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Recent Bookings</CardTitle>
                <CardDescription>Your resource reservations</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/resources/my-bookings">
                  View all
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent shrink-0">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-medium">{booking.resource}</h4>
                      <Badge variant={booking.status as "approved" | "pending"}>
                        {booking.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{booking.date}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
