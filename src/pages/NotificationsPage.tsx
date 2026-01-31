import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  Calendar,
  Building2,
  Users,
  CheckCircle,
  AlertCircle,
  Info,
  Clock,
  Check,
  Trash2,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type NotificationType = "event" | "booking" | "club" | "system";
type NotificationPriority = "high" | "medium" | "low";

interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
  priority: NotificationPriority;
}

const notifications: Notification[] = [
  {
    id: 1,
    type: "event",
    title: "Event Approved",
    message: "Your event 'Tech Talk: AI in Education' has been approved by the admin.",
    time: "5 minutes ago",
    read: false,
    priority: "high",
  },
  {
    id: 2,
    type: "booking",
    title: "Booking Confirmed",
    message: "Your booking for Conference Room B on Mar 12 has been confirmed.",
    time: "1 hour ago",
    read: false,
    priority: "medium",
  },
  {
    id: 3,
    type: "club",
    title: "New Member Request",
    message: "Sarah Chen has requested to join Tech Club. Review their application.",
    time: "2 hours ago",
    read: false,
    priority: "medium",
  },
  {
    id: 4,
    type: "event",
    title: "Event Reminder",
    message: "Hackathon 2024 starts tomorrow at 10:00 AM. Don't forget to check in!",
    time: "3 hours ago",
    read: true,
    priority: "high",
  },
  {
    id: 5,
    type: "system",
    title: "System Maintenance",
    message: "Scheduled maintenance on Mar 15, 2:00 AM - 4:00 AM. Some features may be unavailable.",
    time: "1 day ago",
    read: true,
    priority: "low",
  },
  {
    id: 6,
    type: "booking",
    title: "Booking Request Pending",
    message: "Your booking request for Outdoor Stage is pending admin approval.",
    time: "2 days ago",
    read: true,
    priority: "medium",
  },
  {
    id: 7,
    type: "event",
    title: "Event Registration",
    message: "You've successfully registered for 'Career Fair 2024'.",
    time: "3 days ago",
    read: true,
    priority: "low",
  },
  {
    id: 8,
    type: "club",
    title: "Club Announcement",
    message: "Art Society has posted a new announcement about the upcoming exhibition.",
    time: "4 days ago",
    read: true,
    priority: "low",
  },
];

export default function NotificationsPage() {
  const [notificationList, setNotificationList] = useState(notifications);
  const [activeTab, setActiveTab] = useState("all");

  const unreadCount = notificationList.filter((n) => !n.read).length;

  const getIcon = (type: NotificationType) => {
    const icons = {
      event: Calendar,
      booking: Building2,
      club: Users,
      system: Info,
    };
    return icons[type];
  };

  const getIconColor = (type: NotificationType) => {
    const colors = {
      event: "bg-primary/10 text-primary",
      booking: "bg-accent/10 text-accent",
      club: "bg-success/10 text-success",
      system: "bg-warning/10 text-warning",
    };
    return colors[type];
  };

  const markAsRead = (id: number) => {
    setNotificationList((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotificationList((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotificationList((prev) => prev.filter((n) => n.id !== id));
  };

  const filteredNotifications = notificationList.filter((n) => {
    if (activeTab === "unread") return !n.read;
    if (activeTab === "events") return n.type === "event";
    if (activeTab === "bookings") return n.type === "booking";
    return true;
  });

  return (
    <DashboardLayout userRole="organizer" userName="John Doe">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Notifications</h1>
            <p className="text-muted-foreground mt-1">
              Stay updated with your campus activities
            </p>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              <Check className="h-4 w-4 mr-2" />
              Mark all as read
            </Button>
          )}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">
              All
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 flex items-center justify-center">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <Card>
              <CardContent className="p-0">
                {filteredNotifications.length > 0 ? (
                  <div className="divide-y divide-border">
                    {filteredNotifications.map((notification) => {
                      const Icon = getIcon(notification.type);
                      return (
                        <div
                          key={notification.id}
                          className={`flex items-start gap-4 p-4 transition-colors hover:bg-muted/50 ${
                            !notification.read ? "bg-primary/5" : ""
                          }`}
                        >
                          <div className={`p-2 rounded-lg shrink-0 ${getIconColor(notification.type)}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <p className={`font-medium ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}>
                                  {notification.title}
                                </p>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {notification.message}
                                </p>
                              </div>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  {!notification.read && (
                                    <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                                      <Check className="h-4 w-4 mr-2" />
                                      Mark as read
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem
                                    className="text-destructive"
                                    onClick={() => deleteNotification(notification.id)}
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{notification.time}</span>
                              {!notification.read && (
                                <Badge variant="default" className="h-5 text-xs">New</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-medium mb-2">No notifications</h3>
                    <p className="text-sm text-muted-foreground">
                      You're all caught up! Check back later for updates.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
