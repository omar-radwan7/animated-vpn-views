import { useState } from "react";
import { VPNHeader } from "@/components/VPNHeader";
import { VPNConnect } from "@/components/VPNConnect";
import { RegionSelector } from "@/components/RegionSelector";

const Index = () => {
  const [selectedRegion, setSelectedRegion] = useState("us-east");

  return (
    <div className="min-h-screen bg-vpn-gradient-hero">
      <VPNHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold bg-vpn-gradient-primary bg-clip-text text-transparent">
              Secure VPN Connection
            </h1>
            <p className="text-xl text-muted-foreground max-w-md mx-auto">
              Protect your privacy and browse securely with our premium VPN service
            </p>
          </div>

          {/* Region Selector */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <RegionSelector 
              selectedRegion={selectedRegion}
              onRegionChange={setSelectedRegion}
            />
          </div>

          {/* VPN Connect Component */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <VPNConnect selectedRegion={selectedRegion} />
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-4 mt-12 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            {[
              {
                title: "Military-Grade Encryption",
                description: "AES-256 encryption protects your data",
                icon: "🔒"
              },
              {
                title: "No-Log Policy",
                description: "We never track or store your activity",
                icon: "🕵️"
              },
              {
                title: "Global Servers",
                description: "Access content from anywhere in the world",
                icon: "🌍"
              }
            ].map((feature, index) => (
              <div 
                key={feature.title}
                className="p-6 bg-card/30 backdrop-blur-sm rounded-lg border border-border/50 text-center hover:bg-card/50 transition-all duration-300"
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
