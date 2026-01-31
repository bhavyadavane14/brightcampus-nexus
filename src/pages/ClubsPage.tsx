import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Search,
  Plus,
  Calendar,
  UserPlus,
  Settings,
  MoreHorizontal,
  Crown,
  Shield,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Club {
  id: number;
  name: string;
  description: string;
  members: number;
  events: number;
  category: string;
  role?: "admin" | "member" | null;
  isJoined: boolean;
}

const clubs: Club[] = [
  {
    id: 1,
    name: "Tech Club",
    description: "Exploring technology, coding, and innovation through workshops and hackathons.",
    members: 150,
    events: 12,
    category: "Technology",
    role: "admin",
    isJoined: true,
  },
  {
    id: 2,
    name: "Art Society",
    description: "Creative expression through various art forms including painting, sculpture, and digital art.",
    members: 80,
    events: 8,
    category: "Arts",
    role: "member",
    isJoined: true,
  },
  {
    id: 3,
    name: "Music Club",
    description: "For music enthusiasts to learn, perform, and appreciate various genres of music.",
    members: 95,
    events: 10,
    category: "Arts",
    role: "member",
    isJoined: true,
  },
  {
    id: 4,
    name: "Sports Club",
    description: "Promoting fitness and sportsmanship through various athletic activities and competitions.",
    members: 200,
    events: 15,
    category: "Sports",
    role: null,
    isJoined: false,
  },
  {
    id: 5,
    name: "Drama Club",
    description: "Theatrical performances, acting workshops, and stage productions.",
    members: 60,
    events: 6,
    category: "Arts",
    role: null,
    isJoined: false,
  },
  {
    id: 6,
    name: "Photography Club",
    description: "Capturing moments and learning professional photography techniques.",
    members: 45,
    events: 5,
    category: "Arts",
    role: null,
    isJoined: false,
  },
  {
    id: 7,
    name: "Debate Society",
    description: "Developing public speaking and critical thinking through competitive debates.",
    members: 70,
    events: 9,
    category: "Academic",
    role: "member",
    isJoined: true,
  },
  {
    id: 8,
    name: "Environment Club",
    description: "Promoting sustainability and environmental awareness on campus.",
    members: 55,
    events: 7,
    category: "Social",
    role: null,
    isJoined: false,
  },
];

export default function ClubsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const myClubs = clubs.filter((club) => club.isJoined);
  const discoverClubs = clubs.filter((club) => !club.isJoined);

  const filteredClubs = (activeTab === "my-clubs" ? myClubs : activeTab === "discover" ? discoverClubs : clubs).filter(
    (club) =>
      club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Technology: "bg-primary/10 text-primary",
      Arts: "bg-accent/10 text-accent",
      Sports: "bg-success/10 text-success",
      Academic: "bg-warning/10 text-warning",
      Social: "bg-info/10 text-info",
    };
    return colors[category] || "bg-muted text-muted-foreground";
  };

  return (
    <DashboardLayout userRole="organizer" userName="John Doe">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Clubs & Communities</h1>
            <p className="text-muted-foreground mt-1">
              Join clubs, connect with peers, and organize events together
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Club
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search clubs..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Clubs</TabsTrigger>
            <TabsTrigger value="my-clubs">My Clubs ({myClubs.length})</TabsTrigger>
            <TabsTrigger value="discover">Discover</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClubs.map((club) => (
                <Card key={club.id} className="card-interactive">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Users className="h-6 w-6" />
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          {club.role === "admin" && (
                            <DropdownMenuItem>
                              <Settings className="h-4 w-4 mr-2" />
                              Manage Club
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <CardTitle className="text-lg">{club.name}</CardTitle>
                      {club.role === "admin" && (
                        <Crown className="h-4 w-4 text-warning" />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getCategoryColor(club.category)}>{club.category}</Badge>
                      {club.role && (
                        <Badge variant="outline" className="capitalize">
                          {club.role}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {club.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {club.members} members
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {club.events} events
                      </span>
                    </div>
                    {club.isJoined ? (
                      <Button variant="outline" className="w-full">
                        View Club
                      </Button>
                    ) : (
                      <Button className="w-full">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Join Club
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredClubs.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-2">No clubs found</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Try adjusting your search or create a new club
                </p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Club
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
