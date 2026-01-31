import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Search,
  Filter,
  Grid3X3,
  List,
  Clock,
  MapPin,
  Users,
  Plus,
  Eye,
  Edit,
  MoreHorizontal,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type EventStatus = "draft" | "pending" | "approved" | "rejected" | "completed";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  club: string;
  status: EventStatus;
  attendees: number;
  maxAttendees: number;
  image?: string;
}

const events: Event[] = [
  {
    id: 1,
    title: "Tech Talk: AI in Education",
    description: "Exploring the future of AI-powered learning tools and their impact on education.",
    date: "Mar 12, 2024",
    time: "3:00 PM",
    location: "Auditorium A",
    organizer: "John Doe",
    club: "Tech Club",
    status: "approved",
    attendees: 45,
    maxAttendees: 100,
  },
  {
    id: 2,
    title: "Hackathon 2024",
    description: "48-hour coding competition with amazing prizes and networking opportunities.",
    date: "Mar 15-17, 2024",
    time: "10:00 AM",
    location: "Innovation Lab",
    organizer: "Sarah Chen",
    club: "Tech Club",
    status: "approved",
    attendees: 120,
    maxAttendees: 150,
  },
  {
    id: 3,
    title: "Art Exhibition: Modern Perspectives",
    description: "Showcase of student artwork exploring contemporary themes.",
    date: "Mar 18, 2024",
    time: "5:00 PM",
    location: "Gallery Hall",
    organizer: "Emily Wilson",
    club: "Art Society",
    status: "pending",
    attendees: 30,
    maxAttendees: 80,
  },
  {
    id: 4,
    title: "Career Fair 2024",
    description: "Connect with top employers and explore internship opportunities.",
    date: "Mar 22, 2024",
    time: "9:00 AM",
    location: "Main Hall",
    organizer: "Career Services",
    club: "Career Club",
    status: "approved",
    attendees: 250,
    maxAttendees: 500,
  },
  {
    id: 5,
    title: "Music Festival",
    description: "Annual spring music festival featuring student bands and performances.",
    date: "Mar 25, 2024",
    time: "4:00 PM",
    location: "Outdoor Amphitheater",
    organizer: "Mike Johnson",
    club: "Music Club",
    status: "draft",
    attendees: 0,
    maxAttendees: 300,
  },
  {
    id: 6,
    title: "Photography Workshop",
    description: "Learn professional photography techniques from industry experts.",
    date: "Mar 28, 2024",
    time: "2:00 PM",
    location: "Media Lab",
    organizer: "Lisa Park",
    club: "Photography Club",
    status: "rejected",
    attendees: 0,
    maxAttendees: 25,
  },
];

export default function EventsPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.club.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || event.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const getStatusColor = (status: EventStatus) => {
    const colors = {
      draft: "draft",
      pending: "pending",
      approved: "approved",
      rejected: "rejected",
      completed: "completed",
    };
    return colors[status];
  };

  return (
    <DashboardLayout userRole="organizer" userName="John Doe">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Events</h1>
            <p className="text-muted-foreground mt-1">
              Browse and manage all campus events
            </p>
          </div>
          <Button asChild>
            <Link to="/events/create">
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Link>
          </Button>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <div className="border rounded-lg p-1 flex">
              <Button
                variant={view === "grid" ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setView("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={view === "list" ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setView("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Events</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {view === "grid" ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                  <Card key={event.id} className="card-interactive overflow-hidden">
                    <div className="h-40 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <Calendar className="h-16 w-16 text-primary/40" />
                    </div>
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <Badge variant={getStatusColor(event.status) as any}>
                          {event.status}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">{event.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {event.description}
                      </p>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{event.date} • {event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>{event.attendees} / {event.maxAttendees} attendees</span>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">by {event.club}</span>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredEvents.map((event) => (
                  <Card key={event.id} className="card-interactive">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0">
                          <Calendar className="h-8 w-8 text-primary/60" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-2 mb-1">
                            <h3 className="font-semibold truncate">{event.title}</h3>
                            <Badge variant={getStatusColor(event.status) as any}>
                              {event.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground truncate mb-2">
                            {event.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              {event.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5" />
                              {event.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-3.5 w-3.5" />
                              {event.attendees} attendees
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Event
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">No events found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Try adjusting your search or filters
            </p>
            <Button asChild>
              <Link to="/events/create">Create an Event</Link>
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
