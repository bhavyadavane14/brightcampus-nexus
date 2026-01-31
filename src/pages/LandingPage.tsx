import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Users,
  Building2,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Shield,
  Clock,
  MessageSquare,
} from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Event Management",
    description: "Create, approve, and track campus events with full lifecycle management.",
  },
  {
    icon: Building2,
    title: "Resource Booking",
    description: "Book classrooms, labs, and equipment with real-time availability.",
  },
  {
    icon: Users,
    title: "Club Communities",
    description: "Manage clubs, memberships, and cross-club collaborations seamlessly.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reports",
    description: "Get insights on events, resources, and engagement with visual dashboards.",
  },
  {
    icon: MessageSquare,
    title: "In-App Messaging",
    description: "Communicate with teams through private and group messaging.",
  },
  {
    icon: Shield,
    title: "Role-Based Access",
    description: "Secure permissions for Admins, Organizers, and Participants.",
  },
];

const workflow = [
  { step: 1, title: "Register & Join", description: "Create an account and join your clubs" },
  { step: 2, title: "Plan Events", description: "Organize events and book resources" },
  { step: 3, title: "Get Approval", description: "Submit for admin review and approval" },
  { step: 4, title: "Execute & Track", description: "Run events and track analytics" },
];

const stats = [
  { value: "500+", label: "Events Hosted" },
  { value: "50+", label: "Active Clubs" },
  { value: "10K+", label: "Students" },
  { value: "100+", label: "Resources" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
              <Calendar className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">CampusHub</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#workflow" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </a>
            <a href="#stats" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Impact
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-6 animate-fade-in">
            <Sparkles className="h-3 w-3 mr-1" />
            Unified Campus Management
          </Badge>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-slide-up">
            Streamline Your
            <br />
            <span className="text-gradient">Campus Experience</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            One platform to manage events, book resources, coordinate clubs, and track everything happening on campus.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Button size="xl" variant="hero" asChild>
              <Link to="/register">
                Start for Free
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button size="xl" variant="hero-outline" asChild>
              <Link to="/login">View Demo</Link>
            </Button>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="container mx-auto px-4 mt-16 animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <div className="relative mx-auto max-w-5xl rounded-2xl border border-border/50 bg-card p-2 shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-border">
              <div className="w-3 h-3 rounded-full bg-destructive/50" />
              <div className="w-3 h-3 rounded-full bg-warning/50" />
              <div className="w-3 h-3 rounded-full bg-success/50" />
            </div>
            <div className="aspect-video rounded-lg bg-gradient-to-br from-muted to-secondary flex items-center justify-center">
              <div className="grid grid-cols-3 gap-4 p-8 w-full max-w-3xl">
                <div className="col-span-2 space-y-4">
                  <div className="h-8 bg-primary/20 rounded-lg w-3/4" />
                  <div className="h-32 bg-card rounded-lg border border-border" />
                  <div className="h-24 bg-card rounded-lg border border-border" />
                </div>
                <div className="space-y-4">
                  <div className="h-20 bg-card rounded-lg border border-border" />
                  <div className="h-20 bg-card rounded-lg border border-border" />
                  <div className="h-20 bg-card rounded-lg border border-border" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Features</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A comprehensive suite of tools designed for modern campus management workflows.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/20 hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section id="workflow" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">How It Works</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple 4-Step Workflow</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From registration to analytics, everything flows seamlessly.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {workflow.map((item, index) => (
              <div key={item.step} className="relative">
                {index < workflow.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent z-0" />
                )}
                <div className="relative z-10 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-primary-foreground/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="relative rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-12 md:p-20 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzIiBjeT0iMyIgcj0iMyIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Ready to Transform Your Campus?
              </h2>
              <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
                Join thousands of students and administrators already using CampusHub.
              </p>
              <Button size="xl" variant="secondary" asChild>
                <Link to="/register">
                  Get Started Now
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Calendar className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">CampusHub</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 CampusHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
