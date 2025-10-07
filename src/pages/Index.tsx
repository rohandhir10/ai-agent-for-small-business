import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, CheckCircle, Zap, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "Automated booking system that syncs with your calendar"
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Your customers can book appointments anytime"
    },
    {
      icon: Users,
      title: "Customer Management",
      description: "Keep track of all your appointments in one place"
    },
    {
      icon: Zap,
      title: "Instant Notifications",
      description: "Get notified immediately when new bookings come in"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security for your business data"
    },
    {
      icon: CheckCircle,
      title: "Easy Setup",
      description: "Get started in minutes, no technical skills required"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-lg border-b border-border z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            BookingAI
          </h1>
          <div className="flex gap-4">
            <Button variant="ghost" onClick={() => navigate("/auth")}>
              Sign In
            </Button>
            <Button onClick={() => navigate("/auth")} className="bg-gradient-to-r from-primary to-secondary">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="inline-block animate-fade-in">
            <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold rounded-full bg-primary/10 text-primary">
              AI-Powered Appointment Booking
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent" style={{ animationDelay: "0.1s" }}>
            Grow Your Business<br />With Smart Scheduling
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Transform how you handle appointments. Let AI manage your bookings while you focus on serving your customers.
          </p>
          <div className="flex gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button size="lg" onClick={() => navigate("/auth")} className="bg-gradient-to-r from-primary to-secondary text-lg px-8 shadow-elegant hover:scale-105 transition-all">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/booking/demo")}>
              See Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Everything You Need</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Powerful features designed specifically for small businesses
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-card border border-border hover:shadow-card transition-all hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-secondary to-accent p-12 text-center shadow-elegant">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                Join hundreds of businesses already using BookingAI to manage their appointments
              </p>
              <Button 
                size="lg" 
                onClick={() => navigate("/auth")}
                className="bg-white text-primary hover:bg-white/90 text-lg px-8 shadow-lg hover:scale-105 transition-all"
              >
                Get Started Now
              </Button>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-transparent" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2025 BookingAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
