import { useState } from "react";
import { VPNHeader } from "@/components/VPNHeader";
import { VPNConnect } from "@/components/VPNConnect";
import { RegionSelector } from "@/components/RegionSelector";
import { SpeedTest } from "@/components/SpeedTest";
import { ConnectionStats } from "@/components/ConnectionStats";
import { Footer } from "@/components/Footer";

const Dashboard = () => {
  const [selectedRegion, setSelectedRegion] = useState("us-east");
  const [isConnected, setIsConnected] = useState(false);

  return (
    <div className="min-h-screen relative bg-vpn-gradient-cyber">
      {/* Gradient Overlay for depth */}
      <div className="absolute inset-0 bg-background/50" />
      
      {/* Content */}
      <div className="relative z-10">
        <VPNHeader />
        
        <main className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center space-y-6 mb-12 animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-primary-glow to-success-glow">
              NexoVPN
            </h1>
            <p className="text-xl md:text-2xl text-foreground/90 max-w-2xl mx-auto font-medium">
              Free VPN • Military-grade encryption • Global servers • Zero logs
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-foreground/70">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full animate-vpn-pulse" />
                <span>256-bit AES Encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary-glow rounded-full animate-vpn-pulse" style={{ animationDelay: '0.5s' }} />
                <span>26 Countries</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full animate-vpn-pulse" style={{ animationDelay: '1s' }} />
                <span>100% Free Forever</span>
              </div>
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Left Column - Controls & Analytics */}
            <div className="space-y-6">
              <div className="animate-slide-in-left">
                <RegionSelector 
                  selectedRegion={selectedRegion}
                  onRegionChange={setSelectedRegion}
                />
              </div>
              
              <div className="animate-slide-in-left" style={{ animationDelay: "0.2s" }}>
                <SpeedTest isConnected={isConnected} />
              </div>
              
              {/* Speed Test Tips */}
              <div className="animate-slide-in-left" style={{ animationDelay: "0.4s" }}>
                <div className="p-4 bg-card/40 backdrop-blur-sm rounded-lg border border-border/30">
                  <h3 className="font-semibold mb-3 text-sm text-foreground/90">💡 Speed Test Tips</h3>
                  <div className="space-y-2 text-xs text-foreground/70">
                    <div className="flex items-start gap-2">
                      <span className="text-success">•</span>
                      <span>Connect to VPN first for protected speed testing</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-primary-glow">•</span>
                      <span>Choose nearby servers for best performance</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-yellow-500">•</span>
                      <span>Close other apps for accurate results</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Connection & Stats */}
            <div className="space-y-6">
              <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                <VPNConnect 
                  selectedRegion={selectedRegion} 
                  onConnectionChange={setIsConnected}
                />
              </div>
              
              <div className="animate-slide-in-right" style={{ animationDelay: "0.2s" }}>
                <ConnectionStats 
                  isConnected={isConnected}
                  selectedRegion={selectedRegion}
                />
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 max-w-5xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Always Free",
                  description: "No premium tiers, completely free forever",
                  icon: "💚",
                  accent: "success"
                },
                {
                  title: "Zero Logs",
                  description: "We never track or store your activity",
                  icon: "🛡️",
                  accent: "primary"
                },
                {
                  title: "Global Servers",
                  description: "Access servers in 26 countries",
                  icon: "🌍",
                  accent: "blue"
                }
              ].map((feature, index) => (
                <div 
                  key={feature.title}
                  className="p-6 bg-vpn-gradient-glass backdrop-blur-sm rounded-xl border border-border/30 text-center hover:bg-card/40 transition-all duration-500 hover:scale-105 hover:shadow-vpn-glow group"
                  style={{ animationDelay: `${1 + index * 0.1}s` }}
                >
                  <div className="text-4xl mb-4 group-hover:animate-vpn-pulse">{feature.icon}</div>
                  <h3 className="font-bold mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-sm text-foreground/70">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Data Flow Animation */}
          <div className="mt-12 relative">
            <div className="absolute inset-0 opacity-30">
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-primary-glow to-transparent relative overflow-hidden">
                <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-transparent via-white to-transparent animate-data-flow" />
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;