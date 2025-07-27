import { useState } from "react";
import { Shield, ArrowRight, CheckCircle, Globe, Lock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Lock,
      title: "Military-Grade Encryption",
      description: "AES-256 encryption protects your data"
    },
    {
      icon: Globe,
      title: "26 Global Servers",
      description: "Access content from anywhere in the world"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized servers for maximum speed"
    },
    {
      icon: CheckCircle,
      title: "Zero Logs Policy",
      description: "We never track or store your activity"
    }
  ];

  return (
    <div className="min-h-screen relative bg-vpn-gradient-cyber">
      <div className="absolute inset-0 bg-background/50" />
      
      <div className="relative z-10">

        <main className="container mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center space-y-8 mb-20 animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-primary-glow to-success-glow">
              Browse Securely,<br />Anywhere
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto font-medium leading-relaxed">
              Protect your privacy with military-grade encryption. Access global content with zero logs policy. 
              <span className="text-success font-bold"> Completely free forever.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <Button 
                variant="vpnSuccess"
                size="lg"
                onClick={() => navigate('/signup')}
                className="text-xl px-8 py-6 group shadow-vpn-success"
              >
                Start Free Now
                <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
              <p className="text-sm text-foreground/60">
                No credit card required • No time limits
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-8 mt-12 text-sm text-foreground/70">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full animate-vpn-pulse" />
                <span>Protected Usage</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary-glow rounded-full animate-vpn-pulse" style={{ animationDelay: '0.5s' }} />
                <span>26 Countries</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-vpn-pulse" style={{ animationDelay: '1s' }} />
                <span>99.9% Uptime</span>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card 
                key={feature.title}
                className="border-0 bg-vpn-gradient-glass backdrop-blur-sm hover:bg-card/40 transition-all duration-500 hover:scale-105 hover:shadow-vpn-glow group animate-slide-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <feature.icon className="h-12 w-12 mx-auto mb-4 text-primary-glow group-hover:animate-vpn-pulse" />
                  <h3 className="font-bold mb-2 text-lg">{feature.title}</h3>
                  <p className="text-sm text-foreground/70">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-20 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <Card className="border-0 bg-vpn-gradient-glass backdrop-blur-sm shadow-vpn-premium max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                <p className="text-foreground/80 mb-6">
                  Join millions of users who trust SecureVPN for their privacy and security needs.
                </p>
                <Button 
                  variant="vpn"
                  size="lg"
                  onClick={() => navigate('/signup')}
                  className="text-lg px-8 py-4 group"
                >
                  Create Free Account
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Data Flow Animation */}
          <div className="mt-16 relative">
            <div className="absolute inset-0 opacity-30">
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-primary-glow to-transparent relative overflow-hidden">
                <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-transparent via-white to-transparent animate-data-flow" />
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm mt-16">
          <div className="container mx-auto px-4 py-6">
            <div className="text-center text-sm text-muted-foreground">
              CopyRight@OmarRadwan
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}