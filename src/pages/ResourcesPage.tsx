import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building2,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Clock,
  Users,
  Laptop,
  Projector,
  Mic,
  Camera,
  Car,
  Coffee,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

type ResourceType = "room" | "equipment" | "vehicle" | "other";

interface Resource {
  id: number;
  name: string;
  type: ResourceType;
  description: string;
  capacity?: number;
  location: string;
  available: boolean;
  icon: React.ElementType;
}

interface TimeSlot {
  time: string;
  available: boolean;
  bookedBy?: string;
}

const resources: Resource[] = [
  {
    id: 1,
    name: "Auditorium A",
    type: "room",
    description: "Large auditorium with stage and AV equipment",
    capacity: 500,
    location: "Main Building",
    available: true,
    icon: Building2,
  },
  {
    id: 2,
    name: "Conference Room B",
    type: "room",
    description: "Meeting room with video conferencing",
    capacity: 20,
    location: "Admin Building",
    available: true,
    icon: Building2,
  },
  {
    id: 3,
    name: "Innovation Lab",
    type: "room",
    description: "Tech lab with workstations and 3D printers",
    capacity: 40,
    location: "Engineering Block",
    available: false,
    icon: Laptop,
  },
  {
    id: 4,
    name: "Projector Set #1",
    type: "equipment",
    description: "HD Projector with screen and remote",
    location: "AV Room",
    available: true,
    icon: Projector,
  },
  {
    id: 5,
    name: "Wireless Mic Set",
    type: "equipment",
    description: "4 wireless microphones with receiver",
    location: "AV Room",
    available: true,
    icon: Mic,
  },
  {
    id: 6,
    name: "Camera Kit",
    type: "equipment",
    description: "DSLR camera with tripod and lighting",
    location: "Media Lab",
    available: false,
    icon: Camera,
  },
  {
    id: 7,
    name: "Campus Van",
    type: "vehicle",
    description: "12-seater van for event transportation",
    location: "Parking Lot B",
    available: true,
    icon: Car,
  },
  {
    id: 8,
    name: "Outdoor Stage",
    type: "other",
    description: "Portable stage for outdoor events",
    location: "Central Lawn",
    available: true,
    icon: Building2,
  },
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const currentDate = new Date();

const generateWeekDays = (startDate: Date) => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    days.push(date);
  }
  return days;
};

const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  for (let hour = 8; hour <= 20; hour++) {
    const time = `${hour.toString().padStart(2, "0")}:00`;
    const available = Math.random() > 0.3;
    slots.push({
      time,
      available,
      bookedBy: available ? undefined : "Tech Club",
    });
  }
  return slots;
};

export default function ResourcesPage() {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [weekStart, setWeekStart] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState<{ date: Date; time: string } | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const { toast } = useToast();

  const weekDays = generateWeekDays(weekStart);
  const timeSlots = generateTimeSlots();

  const handlePrevWeek = () => {
    const newDate = new Date(weekStart);
    newDate.setDate(weekStart.getDate() - 7);
    setWeekStart(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(weekStart);
    newDate.setDate(weekStart.getDate() + 7);
    setWeekStart(newDate);
  };

  const handleBookSlot = (date: Date, time: string) => {
    setSelectedSlot({ date, time });
    setBookingOpen(true);
  };

  const confirmBooking = () => {
    setBookingOpen(false);
    toast({
      title: "Booking Request Submitted",
      description: `Your booking for ${selectedResource?.name} has been submitted for approval.`,
    });
    setSelectedSlot(null);
  };

  return (
    <DashboardLayout userRole="organizer" userName="John Doe">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Resource Booking</h1>
          <p className="text-muted-foreground mt-1">
            Book rooms, equipment, and facilities for your events
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search resources..." className="pl-10" />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Resource List */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="font-semibold text-lg">Available Resources</h2>
            <Tabs defaultValue="all">
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                <TabsTrigger value="room" className="flex-1">Rooms</TabsTrigger>
                <TabsTrigger value="equipment" className="flex-1">Equipment</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {resources.map((resource) => (
                <Card
                  key={resource.id}
                  className={`cursor-pointer transition-all ${
                    selectedResource?.id === resource.id
                      ? "border-primary ring-2 ring-primary/20"
                      : "hover:border-primary/20"
                  }`}
                  onClick={() => setSelectedResource(resource)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          resource.available ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <resource.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium truncate">{resource.name}</h3>
                          <Badge variant={resource.available ? "approved" : "rejected"}>
                            {resource.available ? "Available" : "In Use"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {resource.location}
                        </p>
                        {resource.capacity && (
                          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            Capacity: {resource.capacity}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Calendar View */}
          <div className="lg:col-span-2">
            {selectedResource ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{selectedResource.name}</CardTitle>
                      <CardDescription>{selectedResource.description}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" onClick={handlePrevWeek}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="text-sm font-medium min-w-[140px] text-center">
                        {weekDays[0].toLocaleDateString("en-US", { month: "short", day: "numeric" })} -{" "}
                        {weekDays[6].toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                      <Button variant="outline" size="icon" onClick={handleNextWeek}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <div className="min-w-[600px]">
                      {/* Header */}
                      <div className="grid grid-cols-8 gap-1 mb-2">
                        <div className="p-2 text-sm font-medium text-muted-foreground">Time</div>
                        {weekDays.map((date, i) => (
                          <div
                            key={i}
                            className={`p-2 text-center text-sm ${
                              date.toDateString() === currentDate.toDateString()
                                ? "bg-primary/10 rounded-lg font-medium text-primary"
                                : ""
                            }`}
                          >
                            <div>{days[date.getDay()]}</div>
                            <div className="text-lg font-bold">{date.getDate()}</div>
                          </div>
                        ))}
                      </div>

                      {/* Time Slots */}
                      <div className="space-y-1">
                        {timeSlots.map((slot, slotIndex) => (
                          <div key={slot.time} className="grid grid-cols-8 gap-1">
                            <div className="p-2 text-sm text-muted-foreground flex items-center">
                              {slot.time}
                            </div>
                            {weekDays.map((date, dayIndex) => {
                              const isAvailable = Math.random() > 0.3; // Simulated
                              const isPast = date < currentDate && date.toDateString() !== currentDate.toDateString();
                              return (
                                <button
                                  key={dayIndex}
                                  className={`p-2 rounded text-xs transition-colors ${
                                    isPast
                                      ? "bg-muted/50 cursor-not-allowed"
                                      : isAvailable
                                      ? "bg-success/10 hover:bg-success/20 text-success cursor-pointer"
                                      : "bg-destructive/10 text-destructive cursor-not-allowed"
                                  }`}
                                  onClick={() => isAvailable && !isPast && handleBookSlot(date, slot.time)}
                                  disabled={!isAvailable || isPast}
                                >
                                  {isPast ? "-" : isAvailable ? "Available" : "Booked"}
                                </button>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="flex items-center gap-6 mt-6 pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-success/20" />
                      <span className="text-sm text-muted-foreground">Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-destructive/20" />
                      <span className="text-sm text-muted-foreground">Booked</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded bg-muted" />
                      <span className="text-sm text-muted-foreground">Past</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center min-h-[400px]">
                <CardContent className="text-center">
                  <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-2">Select a Resource</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose a resource from the list to view availability
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book {selectedResource?.name}</DialogTitle>
            <DialogDescription>
              {selectedSlot && (
                <>
                  {selectedSlot.date.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  at {selectedSlot.time}
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="purpose">Purpose</Label>
              <Input id="purpose" placeholder="e.g., Team Meeting, Workshop" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="attendees">Expected Attendees</Label>
              <Input id="attendees" type="number" placeholder="e.g., 25" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea id="notes" placeholder="Any special requirements..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBookingOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmBooking}>Submit Booking</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
