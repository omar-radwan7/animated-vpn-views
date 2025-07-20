import { useEffect, useState } from "react";
import { MapPin, Wifi } from "lucide-react";

interface WorldMapProps {
  isVisible: boolean;
  selectedRegion: string;
  isConnected: boolean;
  inline?: boolean;
}

export function WorldMap({ isVisible, selectedRegion, isConnected, inline = false }: WorldMapProps) {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setAnimationStep(1), 300);
      return () => clearTimeout(timer);
    } else {
      setAnimationStep(0);
    }
  }, [isVisible]);

  const servers = [
    { id: "us-east", city: "New York", country: "United States", x: "22%", y: "40%" },
    { id: "us-west", city: "Los Angeles", country: "United States", x: "12%", y: "42%" },
    { id: "uk", city: "London", country: "United Kingdom", x: "48%", y: "32%" },
    { id: "germany", city: "Frankfurt", country: "Germany", x: "52%", y: "34%" },
    { id: "japan", city: "Tokyo", country: "Japan", x: "85%", y: "42%" },
    { id: "australia", city: "Sydney", country: "Australia", x: "85%", y: "75%" },
    { id: "singapore", city: "Singapore", country: "Singapore", x: "78%", y: "58%" },
    { id: "canada", city: "Toronto", country: "Canada", x: "20%", y: "35%" },
    { id: "france", city: "Paris", country: "France", x: "50%", y: "35%" },
    { id: "netherlands", city: "Amsterdam", country: "Netherlands", x: "51%", y: "32%" },
    { id: "sweden", city: "Stockholm", country: "Sweden", x: "54%", y: "25%" },
    { id: "brazil", city: "São Paulo", country: "Brazil", x: "30%", y: "70%" },
  ];

  const selectedServer = servers.find(server => server.id === selectedRegion);

  if (!isVisible) return null;

  // Inline version for dashboard
  if (inline) {
    return (
      <div className={`
        bg-card/50 backdrop-blur-sm border border-border/30 rounded-xl p-6
        transform transition-all duration-700 ease-out
        ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
      `}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-success rounded-full animate-vpn-pulse" />
            <h3 className="text-lg font-bold">Network Map</h3>
          </div>
          {isConnected && selectedServer && (
            <div className="flex items-center gap-2 text-success text-sm font-medium">
              <Wifi className="h-4 w-4" />
              {selectedServer.city}
            </div>
          )}
        </div>

        {/* Inline World Map */}
        <div className="relative bg-gradient-to-br from-muted/10 to-muted/20 rounded-lg p-4 h-48">
          <svg viewBox="0 0 1000 500" className="w-full h-full">
            {/* Realistic World Map Continents */}
            <g fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--border))" strokeWidth="1">
              {/* North America */}
              <path d="M50,150 C80,120 120,130 150,140 L200,135 C250,140 280,160 300,180 L320,200 C330,240 320,280 300,300 L280,320 C240,330 200,325 160,320 L120,315 C80,300 60,260 50,220 Z" />
              
              {/* Greenland */}
              <path d="M300,80 C320,75 340,80 350,100 L355,120 C350,140 340,150 320,155 L300,150 C285,145 280,125 285,105 Z" />
              
              {/* South America */}
              <path d="M220,320 C240,315 260,325 270,340 L280,380 C285,420 280,460 270,480 L260,495 C240,500 220,495 210,480 L200,460 C195,420 200,380 210,340 Z" />
              
              {/* Europe */}
              <path d="M450,120 C480,110 510,115 530,125 L550,135 C560,155 555,175 545,185 L535,195 C515,200 495,195 475,190 L455,185 C445,165 450,145 455,125 Z" />
              
              {/* Africa */}
              <path d="M450,200 C480,195 510,200 530,215 L545,240 C550,280 545,320 540,360 L535,400 C530,430 520,450 500,460 L480,465 C460,460 450,440 445,420 L440,380 C435,340 440,300 445,260 L450,220 Z" />
              
              {/* Asia */}
              <path d="M550,100 C600,90 650,95 700,105 L750,115 C800,125 850,140 880,160 L900,180 C910,220 905,260 895,290 L885,320 C875,340 855,350 835,355 L815,360 C775,355 735,350 695,345 L655,340 C615,335 575,325 555,305 L545,285 C540,245 545,205 550,165 Z" />
              
              {/* Australia */}
              <path d="M750,360 C780,355 810,360 830,370 L845,380 C850,400 845,420 835,430 L825,440 C805,445 785,440 770,435 L755,430 C745,410 750,390 755,370 Z" />
              
              {/* Antarctica */}
              <path d="M200,470 C400,465 600,465 800,470 L850,480 C800,490 600,495 400,495 L200,490 Z" />
            </g>
          </svg>

          {/* Server markers */}
          {servers.map((server, index) => {
            const isSelected = server.id === selectedRegion && isConnected;
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
                    <div className="absolute inset-0 w-6 h-6 -ml-3 -mt-3 rounded-full border border-success/60 animate-ping" />
                    <div className="absolute inset-0 w-8 h-8 -ml-4 -mt-4 rounded-full border border-success/30 animate-ping" style={{ animationDelay: "0.5s" }} />
                  </>
                )}

                {/* Server marker */}
                <div
                  className={`
                    relative w-2.5 h-2.5 rounded-full transition-all duration-500
                    ${isSelected 
                      ? 'bg-success shadow-md shadow-success/50 scale-125' 
                      : 'bg-primary/70 hover:bg-primary'
                    }
                  `}
                  style={{
                    animationDelay: `${index * 0.05}s`,
                    transform: shouldAnimate ? 'scale(1)' : 'scale(0)',
                    transition: 'transform 0.3s ease-out'
                  }}
                >
                  {/* Inner glow for selected server */}
                  {isSelected && (
                    <div className="absolute inset-0 rounded-full bg-success animate-ping opacity-50" />
                  )}
                </div>

                {/* Server tooltip on hover */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="bg-card/90 backdrop-blur-sm border border-border/50 rounded-md px-2 py-1 text-xs">
                    <div className="font-medium">{server.city}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Connection status */}
        {isConnected && selectedServer && (
          <div className="mt-4 text-center">
            <p className="text-sm text-success font-medium">
              🔒 Connected to {selectedServer.city}, {selectedServer.country}
            </p>
          </div>
        )}
      </div>
    );
  }

  // Modal version (keeping for compatibility)
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
        {/* Modal content remains the same */}
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
      </div>
    </div>
  );
}