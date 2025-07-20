import { useEffect, useState } from "react";
import { MapPin, Wifi, X } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    { id: "us-east", city: "New York", country: "United States", x: "22%", y: "35%" },
    { id: "us-west", city: "Los Angeles", country: "United States", x: "12%", y: "38%" },
    { id: "uk", city: "London", country: "United Kingdom", x: "48%", y: "28%" },
    { id: "germany", city: "Frankfurt", country: "Germany", x: "52%", y: "30%" },
    { id: "japan", city: "Tokyo", country: "Japan", x: "85%", y: "38%" },
    { id: "australia", city: "Sydney", country: "Australia", x: "87%", y: "75%" },
    { id: "singapore", city: "Singapore", country: "Singapore", x: "78%", y: "58%" },
    { id: "canada", city: "Toronto", country: "Canada", x: "20%", y: "28%" },
    { id: "france", city: "Paris", country: "France", x: "50%", y: "32%" },
    { id: "netherlands", city: "Amsterdam", country: "Netherlands", x: "50%", y: "29%" },
    { id: "sweden", city: "Stockholm", country: "Sweden", x: "54%", y: "22%" },
    { id: "brazil", city: "São Paulo", country: "Brazil", x: "28%", y: "65%" },
  ];

  const selectedServer = servers.find(server => server.id === selectedRegion);

  if (!isVisible) return null;

  return (
    <div className={`
      fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center p-4
      transition-all duration-500 ease-out
      ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
    `}>
      <div className={`
        bg-gradient-to-br from-card/95 to-card/90 backdrop-blur-xl border border-border/50 rounded-3xl p-8 max-w-4xl w-full
        shadow-2xl transform transition-all duration-700 ease-out relative
        ${isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}
      `}>
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 hover:bg-muted/50"
          onClick={() => {}}
        >
          <X className="h-5 w-5" />
        </Button>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-success rounded-full animate-vpn-pulse" />
            <h3 className="text-2xl font-bold">Global VPN Network</h3>
          </div>
          {isConnected && selectedServer && (
            <div className="flex items-center gap-3 text-success text-sm font-medium bg-success/10 px-4 py-2 rounded-full">
              <Wifi className="h-4 w-4" />
              Connected to {selectedServer.city}, {selectedServer.country}
            </div>
          )}
        </div>

        {/* World Map Container */}
        <div className="relative bg-gradient-to-br from-muted/20 to-muted/40 rounded-2xl p-6 overflow-hidden">
          {/* World Map SVG - More accurate representation */}
          <div className="relative h-80 w-full">
            <svg viewBox="0 0 1000 500" className="w-full h-full">
              {/* World continents as simplified paths */}
              <g fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary) / 0.3)" strokeWidth="1">
                {/* North America */}
                <path d="M50,120 Q80,100 120,110 L180,100 Q220,110 250,140 L280,160 Q290,200 280,240 L250,280 Q200,290 150,280 L100,270 Q60,250 50,200 Z" />
                
                {/* South America */}
                <path d="M200,300 Q230,290 250,320 L270,380 Q280,420 270,460 L250,480 Q220,485 200,470 L180,450 Q170,400 180,350 L190,320 Z" />
                
                {/* Europe */}
                <path d="M450,100 Q480,90 510,100 L540,110 Q550,130 545,150 L540,170 Q520,180 500,175 L470,170 Q450,160 445,140 L450,120 Z" />
                
                {/* Africa */}
                <path d="M450,200 Q480,190 510,200 L530,220 Q540,260 535,300 L530,340 Q520,380 500,400 L480,410 Q460,405 450,390 L440,350 Q435,310 440,270 L445,230 Z" />
                
                {/* Asia */}
                <path d="M550,80 Q600,70 650,80 L750,90 Q800,100 850,120 L880,140 Q890,180 885,220 L870,260 Q850,280 820,285 L780,290 Q740,285 700,280 L660,275 Q620,270 580,260 L550,240 Q540,200 545,160 L550,120 Z" />
                
                {/* Australia */}
                <path d="M750,350 Q780,340 810,350 L840,360 Q850,380 845,400 L830,420 Q810,425 790,420 L770,415 Q755,405 750,390 L750,370 Z" />
              </g>
            </svg>

            {/* Server markers */}
            {servers.map((server, index) => {
              const isSelected = server.id === selectedRegion;
              const shouldAnimate = animationStep > 0;
              
              return (
                <div
                  key={server.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: server.x, top: server.y }}
                >
                  {/* Connection ripples for selected server */}
                  {isSelected && shouldAnimate && (
                    <>
                      <div className="absolute inset-0 w-8 h-8 -ml-4 -mt-4 rounded-full border-2 border-success/40 animate-ping" />
                      <div className="absolute inset-0 w-12 h-12 -ml-6 -mt-6 rounded-full border border-success/20 animate-ping" style={{ animationDelay: "0.5s" }} />
                      <div className="absolute inset-0 w-16 h-16 -ml-8 -mt-8 rounded-full border border-success/10 animate-ping" style={{ animationDelay: "1s" }} />
                    </>
                  )}

                  {/* Server marker */}
                  <div
                    className={`
                      relative w-3 h-3 rounded-full transition-all duration-500 cursor-pointer
                      ${isSelected 
                        ? 'bg-success shadow-lg shadow-success/50 scale-150' 
                        : 'bg-primary hover:scale-125'
                      }
                    `}
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      transform: shouldAnimate ? 'scale(1)' : 'scale(0)',
                      transition: 'transform 0.3s ease-out'
                    }}
                  >
                    {/* Inner glow for selected server */}
                    {isSelected && (
                      <div className="absolute inset-0 rounded-full bg-success animate-ping opacity-60" />
                    )}
                  </div>

                  {/* Server info tooltip */}
                  <div
                    className={`
                      absolute top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap
                      px-3 py-2 rounded-lg backdrop-blur-md transition-all duration-500 z-10
                      ${isSelected 
                        ? 'bg-success/90 text-white border border-success/50 shadow-lg' 
                        : 'bg-card/90 text-foreground border border-border/50 opacity-0 group-hover:opacity-100'
                      }
                    `}
                    style={{
                      opacity: isSelected ? (shouldAnimate ? 1 : 0) : undefined,
                      transform: shouldAnimate && isSelected
                        ? 'translateX(-50%) translateY(0)' 
                        : 'translateX(-50%) translateY(10px)',
                      transitionDelay: `${index * 0.1 + 0.3}s`
                    }}
                  >
                    <div className="text-sm font-medium">{server.city}</div>
                    <div className="text-xs opacity-80">{server.country}</div>
                    
                    {/* Tooltip arrow */}
                    <div className={`
                      absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1
                      w-2 h-2 rotate-45
                      ${isSelected ? 'bg-success/90' : 'bg-card/90'}
                    `} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Network stats */}
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  {servers.length} Server Locations
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-vpn-pulse" />
                  99.9% Uptime
                </span>
              </div>
              
              {isConnected && selectedServer && (
                <div className="text-success font-medium">
                  🔒 Secure Connection Active
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Connection details */}
        {isConnected && selectedServer && (
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-muted/20 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-success">256-bit</div>
              <div className="text-xs text-muted-foreground">Encryption</div>
            </div>
            <div className="bg-muted/20 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-primary">45ms</div>
              <div className="text-xs text-muted-foreground">Ping</div>
            </div>
            <div className="bg-muted/20 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-primary">98.5</div>
              <div className="text-xs text-muted-foreground">Mbps</div>
            </div>
            <div className="bg-muted/20 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-success">Zero</div>
              <div className="text-xs text-muted-foreground">Logs</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}