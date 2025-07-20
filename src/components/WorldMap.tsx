import { useEffect, useState } from "react";
import { MapPin, Wifi } from "lucide-react";

interface WorldMapProps {
  isVisible: boolean;
  selectedRegion: string;
  isConnected: boolean;
}

export function WorldMap({ isVisible, selectedRegion, isConnected }: WorldMapProps) {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    if (isVisible && isConnected) {
      const timer = setTimeout(() => setAnimationStep(1), 500);
      return () => clearTimeout(timer);
    } else {
      setAnimationStep(0);
    }
  }, [isVisible, isConnected]);

  const servers = [
    { id: "us-east", name: "New York", x: "22%", y: "35%", region: "US East" },
    { id: "us-west", name: "Los Angeles", x: "12%", y: "38%", region: "US West" },
    { id: "uk", name: "London", x: "48%", y: "28%", region: "United Kingdom" },
    { id: "germany", name: "Frankfurt", x: "52%", y: "30%", region: "Germany" },
    { id: "japan", name: "Tokyo", x: "85%", y: "38%", region: "Japan" },
    { id: "australia", name: "Sydney", x: "87%", y: "75%", region: "Australia" },
    { id: "singapore", name: "Singapore", x: "78%", y: "58%", region: "Singapore" },
    { id: "canada", name: "Toronto", x: "20%", y: "28%", region: "Canada" },
  ];

  const selectedServer = servers.find(server => server.id === selectedRegion);

  if (!isVisible) return null;

  return (
    <div className={`
      fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4
      transition-all duration-500 ease-out
      ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
    `}>
      <div className={`
        bg-card/95 backdrop-blur-md border border-border/50 rounded-2xl p-6 max-w-2xl w-full
        shadow-2xl transform transition-all duration-700 ease-out
        ${isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}
      `}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-success rounded-full animate-vpn-pulse" />
            <h3 className="text-xl font-bold">Global VPN Network</h3>
          </div>
          {isConnected && (
            <div className="flex items-center gap-2 text-success text-sm font-medium">
              <Wifi className="h-4 w-4" />
              Connected to {selectedServer?.region}
            </div>
          )}
        </div>

        {/* World Map SVG */}
        <div className="relative bg-muted/20 rounded-xl p-4 overflow-hidden">
          {/* Animated background grid */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
              {Array.from({ length: 96 }).map((_, i) => (
                <div key={i} className="border border-primary/20" />
              ))}
            </div>
          </div>

          {/* Simplified world map using CSS */}
          <div className="relative h-64 w-full">
            {/* Continents as colored shapes */}
            <div className="absolute inset-0">
              {/* North America */}
              <div className="absolute bg-primary/20 rounded-lg" style={{
                left: "8%", top: "25%", width: "25%", height: "35%"
              }} />
              
              {/* Europe */}
              <div className="absolute bg-primary/20 rounded-lg" style={{
                left: "45%", top: "20%", width: "15%", height: "25%"
              }} />
              
              {/* Asia */}
              <div className="absolute bg-primary/20 rounded-lg" style={{
                left: "60%", top: "15%", width: "35%", height: "40%"
              }} />
              
              {/* Africa */}
              <div className="absolute bg-primary/20 rounded-lg" style={{
                left: "45%", top: "40%", width: "18%", height: "35%"
              }} />
              
              {/* Australia */}
              <div className="absolute bg-primary/20 rounded-lg" style={{
                left: "82%", top: "70%", width: "15%", height: "15%"
              }} />
              
              {/* South America */}
              <div className="absolute bg-primary/20 rounded-lg" style={{
                left: "25%", top: "55%", width: "12%", height: "30%"
              }} />
            </div>

            {/* Server locations */}
            {servers.map((server, index) => {
              const isSelected = server.id === selectedRegion;
              const shouldAnimate = animationStep > 0;
              
              return (
                <div
                  key={server.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: server.x, top: server.y }}
                >
                  {/* Connection lines to selected server */}
                  {isSelected && shouldAnimate && (
                    <svg
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        width: "200px",
                        height: "200px",
                        left: "-100px",
                        top: "-100px"
                      }}
                    >
                      <circle
                        cx="100"
                        cy="100"
                        r="30"
                        fill="none"
                        stroke="hsl(var(--success))"
                        strokeWidth="2"
                        opacity="0.3"
                        className="animate-ping"
                      />
                      <circle
                        cx="100"
                        cy="100"
                        r="50"
                        fill="none"
                        stroke="hsl(var(--success))"
                        strokeWidth="1"
                        opacity="0.2"
                        className="animate-ping"
                        style={{ animationDelay: "0.5s" }}
                      />
                    </svg>
                  )}

                  {/* Server dot */}
                  <div
                    className={`
                      w-4 h-4 rounded-full border-2 transition-all duration-500 cursor-pointer
                      ${isSelected 
                        ? 'bg-success border-success shadow-lg shadow-success/50 scale-125' 
                        : 'bg-primary border-primary/50 hover:scale-110'
                      }
                    `}
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      transform: shouldAnimate ? 'scale(1)' : 'scale(0)',
                      transition: 'transform 0.3s ease-out'
                    }}
                  >
                    {/* Pulse animation for selected server */}
                    {isSelected && (
                      <div className="absolute inset-0 rounded-full bg-success animate-ping opacity-50" />
                    )}
                  </div>

                  {/* Server label */}
                  <div
                    className={`
                      absolute top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap
                      text-xs font-medium px-2 py-1 rounded-md backdrop-blur-sm
                      transition-all duration-500
                      ${isSelected 
                        ? 'bg-success/20 text-success border border-success/30' 
                        : 'bg-card/80 text-foreground/70 border border-border/30'
                      }
                    `}
                    style={{
                      opacity: shouldAnimate ? 1 : 0,
                      transform: shouldAnimate 
                        ? 'translateX(-50%) translateY(0)' 
                        : 'translateX(-50%) translateY(10px)',
                      transitionDelay: `${index * 0.1 + 0.2}s`
                    }}
                  >
                    {server.name}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stats overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>8 Server Locations</span>
              <span>99.9% Uptime</span>
              <span>60+ Countries</span>
            </div>
          </div>
        </div>

        {/* Connection info */}
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            {isConnected 
              ? `Securely connected to ${selectedServer?.region || selectedRegion}`
              : "Select a server location to connect"
            }
          </p>
        </div>
      </div>
    </div>
  );
}