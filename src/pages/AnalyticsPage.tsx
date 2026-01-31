import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import { Calendar, Users, Building2, TrendingUp, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const monthlyEvents = [
  { month: "Jan", events: 12, attendees: 450 },
  { month: "Feb", events: 15, attendees: 580 },
  { month: "Mar", events: 18, attendees: 720 },
  { month: "Apr", events: 22, attendees: 890 },
  { month: "May", events: 25, attendees: 1050 },
  { month: "Jun", events: 20, attendees: 800 },
];

const eventsByCategory = [
  { name: "Academic", value: 35, color: "hsl(234, 89%, 58%)" },
  { name: "Cultural", value: 25, color: "hsl(172, 66%, 50%)" },
  { name: "Sports", value: 20, color: "hsl(38, 92%, 50%)" },
  { name: "Tech", value: 15, color: "hsl(152, 69%, 45%)" },
  { name: "Social", value: 5, color: "hsl(0, 84%, 60%)" },
];

const resourceUtilization = [
  { name: "Auditorium A", utilization: 85 },
  { name: "Conference Room B", utilization: 72 },
  { name: "Innovation Lab", utilization: 90 },
  { name: "Outdoor Stage", utilization: 45 },
  { name: "Media Lab", utilization: 68 },
];

const attendanceTrend = [
  { week: "Week 1", registered: 120, attended: 98 },
  { week: "Week 2", registered: 150, attended: 125 },
  { week: "Week 3", registered: 180, attended: 155 },
  { week: "Week 4", registered: 200, attended: 175 },
  { week: "Week 5", registered: 220, attended: 195 },
  { week: "Week 6", registered: 250, attended: 220 },
];

const clubEngagement = [
  { name: "Tech Club", members: 150, events: 12, engagement: 85 },
  { name: "Art Society", members: 80, events: 8, engagement: 72 },
  { name: "Music Club", members: 95, events: 10, engagement: 78 },
  { name: "Sports Club", members: 200, events: 15, engagement: 90 },
  { name: "Drama Club", members: 60, events: 6, engagement: 65 },
];

const stats = [
  {
    title: "Total Events",
    value: "112",
    change: "+12%",
    trend: "up",
    icon: Calendar,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Total Attendees",
    value: "4,490",
    change: "+18%",
    trend: "up",
    icon: Users,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    title: "Resource Bookings",
    value: "287",
    change: "+8%",
    trend: "up",
    icon: Building2,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    title: "Avg Attendance Rate",
    value: "87%",
    change: "+5%",
    trend: "up",
    icon: TrendingUp,
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
];

export default function AnalyticsPage() {
  return (
    <DashboardLayout userRole="admin" userName="Admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Analytics</h1>
            <p className="text-muted-foreground mt-1">
              Campus insights and performance metrics
            </p>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold mt-1">{stat.value}</p>
                    <p className="text-sm text-success mt-1">{stat.change} from last month</p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="clubs">Clubs</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Monthly Events & Attendance */}
              <Card>
                <CardHeader>
                  <CardTitle>Events & Attendance Trend</CardTitle>
                  <CardDescription>Monthly overview of events and participants</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyEvents}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="month" className="text-muted-foreground text-xs" />
                      <YAxis className="text-muted-foreground text-xs" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="attendees"
                        stroke="hsl(172, 66%, 50%)"
                        fill="hsl(172, 66%, 50%, 0.2)"
                        name="Attendees"
                      />
                      <Area
                        type="monotone"
                        dataKey="events"
                        stroke="hsl(234, 89%, 58%)"
                        fill="hsl(234, 89%, 58%, 0.2)"
                        name="Events"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Events by Category */}
              <Card>
                <CardHeader>
                  <CardTitle>Events by Category</CardTitle>
                  <CardDescription>Distribution of events across categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={eventsByCategory}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {eventsByCategory.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Attendance Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Registration vs Attendance</CardTitle>
                <CardDescription>Weekly comparison of registrations and actual attendance</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={attendanceTrend}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="week" className="text-muted-foreground text-xs" />
                    <YAxis className="text-muted-foreground text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="registered"
                      stroke="hsl(234, 89%, 58%)"
                      strokeWidth={2}
                      dot={{ fill: "hsl(234, 89%, 58%)" }}
                      name="Registered"
                    />
                    <Line
                      type="monotone"
                      dataKey="attended"
                      stroke="hsl(152, 69%, 45%)"
                      strokeWidth={2}
                      dot={{ fill: "hsl(152, 69%, 45%)" }}
                      name="Attended"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Resource Utilization</CardTitle>
                <CardDescription>Usage percentage of campus resources</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={resourceUtilization} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis type="number" domain={[0, 100]} className="text-muted-foreground text-xs" />
                    <YAxis dataKey="name" type="category" width={120} className="text-muted-foreground text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) => [`${value}%`, "Utilization"]}
                    />
                    <Bar
                      dataKey="utilization"
                      fill="hsl(234, 89%, 58%)"
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clubs" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Club Engagement</CardTitle>
                <CardDescription>Member activity and event participation by club</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {clubEngagement.map((club) => (
                    <div key={club.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{club.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {club.members} members • {club.events} events
                          </p>
                        </div>
                        <span className="text-lg font-bold text-primary">{club.engagement}%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${club.engagement}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-6 mt-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Events</CardTitle>
                  <CardDescription>Number of events per month</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyEvents}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="month" className="text-muted-foreground text-xs" />
                      <YAxis className="text-muted-foreground text-xs" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="events" fill="hsl(234, 89%, 58%)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Event Categories</CardTitle>
                  <CardDescription>Breakdown by event type</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={eventsByCategory}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={({ name }) => name}
                      >
                        {eventsByCategory.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
