import { useEffect, useState } from "react";
import { MapPin, Wifi, TrendingUp, Download, Upload, Activity } from "lucide-react";

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
    { id: "us-east", city: "New York", country: "United States", x: "20%", y: "38%", userLocation: false },
    { id: "us-west", city: "Los Angeles", country: "United States", x: "10%", y: "42%", userLocation: false },
    { id: "uk", city: "London", country: "United Kingdom", x: "48%", y: "32%", userLocation: true },
    { id: "germany", city: "Frankfurt", country: "Germany", x: "52%", y: "34%", userLocation: false },
    { id: "japan", city: "Tokyo", country: "Japan", x: "85%", y: "42%", userLocation: false },
    { id: "australia", city: "Sydney", country: "Australia", x: "85%", y: "75%", userLocation: false },
    { id: "singapore", city: "Singapore", country: "Singapore", x: "78%", y: "58%", userLocation: false },
    { id: "canada", city: "Toronto", country: "Canada", x: "18%", y: "35%", userLocation: false },
    { id: "france", city: "Paris", country: "France", x: "50%", y: "35%", userLocation: false },
    { id: "netherlands", city: "Amsterdam", country: "Netherlands", x: "51%", y: "32%", userLocation: false },
    { id: "sweden", city: "Stockholm", country: "Sweden", x: "54%", y: "25%", userLocation: false },
    { id: "brazil", city: "São Paulo", country: "Brazil", x: "30%", y: "70%", userLocation: false },
  ];

  const selectedServer = servers.find(server => server.id === selectedRegion);
  const userLocation = servers.find(server => server.userLocation);

  if (!isVisible) return null;

  // Inline version for dashboard
  if (inline) {
    return (
      <div className={`
        bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-sm border border-border/30 rounded-2xl overflow-hidden
        transform transition-all duration-700 ease-out
        ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/20">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-4 h-4 bg-primary rounded-full" />
              {isConnected && (
                <div className="absolute inset-0 w-4 h-4 bg-primary rounded-full animate-ping opacity-60" />
              )}
            </div>
            <h3 className="text-xl font-bold text-white">
              {isConnected ? 'CONNECTED' : 'NETWORK MAP'}
            </h3>
          </div>
          {isConnected && selectedServer && (
            <div className="flex items-center gap-2 text-primary text-sm font-medium">
              <Wifi className="h-4 w-4" />
              {selectedServer.city} • {selectedServer.country}
            </div>
          )}
        </div>

        <div className="flex">
          {/* World Map */}
          <div className="flex-1 relative bg-gradient-to-br from-slate-900/30 to-slate-800/30 p-6">
            <div className="relative h-80 w-full">
              {/* Dotted World Map */}
              <svg viewBox="0 0 1000 500" className="w-full h-full">
                {/* Grid background */}
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="10" cy="10" r="0.5" fill="rgba(100, 116, 139, 0.2)" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Dotted continents */}
                <g>
                  {/* North America dots */}
                  {Array.from({ length: 80 }).map((_, i) => {
                    const x = 50 + (i % 12) * 15 + Math.random() * 10;
                    const y = 140 + Math.floor(i / 12) * 12 + Math.random() * 8;
                    const size = Math.random() * 1.5 + 0.5;
                    return (
                      <circle
                        key={`na-${i}`}
                        cx={x}
                        cy={y}
                        r={size}
                        fill="rgba(59, 130, 246, 0.6)"
                        className="animate-pulse"
                        style={{ animationDelay: `${i * 50}ms` }}
                      />
                    );
                  })}

                  {/* Europe dots */}
                  {Array.from({ length: 50 }).map((_, i) => {
                    const x = 450 + (i % 8) * 12 + Math.random() * 8;
                    const y = 120 + Math.floor(i / 8) * 10 + Math.random() * 6;
                    const size = Math.random() * 1.5 + 0.5;
                    return (
                      <circle
                        key={`eu-${i}`}
                        cx={x}
                        cy={y}
                        r={size}
                        fill="rgba(59, 130, 246, 0.6)"
                        className="animate-pulse"
                        style={{ animationDelay: `${i * 60}ms` }}
                      />
                    );
                  })}

                  {/* Asia dots */}
                  {Array.from({ length: 120 }).map((_, i) => {
                    const x = 550 + (i % 20) * 15 + Math.random() * 12;
                    const y = 110 + Math.floor(i / 20) * 15 + Math.random() * 10;
                    const size = Math.random() * 1.5 + 0.5;
                    return (
                      <circle
                        key={`as-${i}`}
                        cx={x}
                        cy={y}
                        r={size}
                        fill="rgba(59, 130, 246, 0.6)"
                        className="animate-pulse"
                        style={{ animationDelay: `${i * 40}ms` }}
                      />
                    );
                  })}

                  {/* Africa dots */}
                  {Array.from({ length: 90 }).map((_, i) => {
                    const x = 450 + (i % 10) * 12 + Math.random() * 8;
                    const y = 200 + Math.floor(i / 10) * 18 + Math.random() * 12;
                    const size = Math.random() * 1.5 + 0.5;
                    return (
                      <circle
                        key={`af-${i}`}
                        cx={x}
                        cy={y}
                        r={size}
                        fill="rgba(59, 130, 246, 0.6)"
                        className="animate-pulse"
                        style={{ animationDelay: `${i * 45}ms` }}
                      />
                    );
                  })}

                  {/* South America dots */}
                  {Array.from({ length: 60 }).map((_, i) => {
                    const x = 220 + (i % 6) * 10 + Math.random() * 6;
                    const y = 330 + Math.floor(i / 6) * 15 + Math.random() * 10;
                    const size = Math.random() * 1.5 + 0.5;
                    return (
                      <circle
                        key={`sa-${i}`}
                        cx={x}
                        cy={y}
                        r={size}
                        fill="rgba(59, 130, 246, 0.6)"
                        className="animate-pulse"
                        style={{ animationDelay: `${i * 55}ms` }}
                      />
                    );
                  })}

                  {/* Australia dots */}
                  {Array.from({ length: 30 }).map((_, i) => {
                    const x = 780 + (i % 8) * 10 + Math.random() * 6;
                    const y = 360 + Math.floor(i / 8) * 12 + Math.random() * 8;
                    const size = Math.random() * 1.5 + 0.5;
                    return (
                      <circle
                        key={`au-${i}`}
                        cx={x}
                        cy={y}
                        r={size}
                        fill="rgba(59, 130, 246, 0.6)"
                        className="animate-pulse"
                        style={{ animationDelay: `${i * 70}ms` }}
                      />
                    );
                  })}
                </g>
              </svg>

              {/* Connection line from user to selected server */}
              {isConnected && selectedServer && userLocation && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                  <defs>
                    <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="hsl(var(--success))" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>
                  <line
                    x1={userLocation.x.replace('%', '') + '%'}
                    y1={userLocation.y.replace('%', '') + '%'}
                    x2={selectedServer.x.replace('%', '') + '%'}
                    y2={selectedServer.y.replace('%', '') + '%'}
                    stroke="url(#connectionGradient)"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    className="animate-pulse"
                  />
                </svg>
              )}

              {/* Server markers */}
              {servers.map((server, index) => {
                const isSelected = server.id === selectedRegion && isConnected;
                const isUserLocation = server.userLocation;
                const shouldAnimate = animationStep > 0;
                
                return (
                  <div
                    key={server.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                    style={{ left: server.x, top: server.y, zIndex: 2 }}
                  >
                    {/* Server marker - triangle shape like ProtonVPN */}
                    <div
                      className={`
                        relative transition-all duration-500
                        ${isSelected ? 'scale-125' : isUserLocation ? 'scale-110' : 'scale-100'}
                      `}
                      style={{
                        animationDelay: `${index * 0.05}s`,
                        transform: shouldAnimate ? 'scale(1)' : 'scale(0)',
                        transition: 'transform 0.3s ease-out'
                      }}
                    >
                      {/* Triangle marker */}
                      <div className={`
                        w-0 h-0 transition-all duration-300
                        ${isSelected 
                          ? 'border-l-[6px] border-r-[6px] border-b-[10px] border-l-transparent border-r-transparent border-b-success drop-shadow-lg' 
                          : isUserLocation
                          ? 'border-l-[5px] border-r-[5px] border-b-[8px] border-l-transparent border-r-transparent border-b-primary'
                          : 'border-l-[4px] border-r-[4px] border-b-[7px] border-l-transparent border-r-transparent border-b-slate-400 hover:border-b-primary'
                        }
                      `} />
                      
                      {/* Pulse effect for selected server */}
                      {isSelected && (
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1">
                          <div className="w-4 h-4 border border-success rounded-full animate-ping opacity-40" />
                        </div>
                      )}
                    </div>

                    {/* Tooltip */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="bg-slate-800/90 backdrop-blur-sm border border-slate-600/50 rounded-md px-2 py-1 text-xs text-white">
                        <div className="font-medium">{server.city}</div>
                        <div className="text-slate-300 text-xs">{server.country}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Traffic Statistics Panel */}
          {isConnected && (
            <div className="w-80 bg-slate-900/50 border-l border-border/20 p-6">
              <h4 className="text-sm font-medium text-slate-300 mb-4">Session Traffic</h4>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Download className="h-4 w-4 text-success" />
                      <span className="text-xs text-slate-400">Down Volume</span>
                    </div>
                    <div className="text-lg font-bold text-white">1.2 GB</div>
                  </div>
                  
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Upload className="h-4 w-4 text-primary" />
                      <span className="text-xs text-slate-400">Up Volume</span>
                    </div>
                    <div className="text-lg font-bold text-white">435 MB</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="h-4 w-4 text-success" />
                      <span className="text-xs text-slate-400">Down Speed</span>
                    </div>
                    <div className="text-lg font-bold text-white">45.8 KB/s</div>
                  </div>
                  
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Activity className="h-4 w-4 text-primary" />
                      <span className="text-xs text-slate-400">Up Speed</span>
                    </div>
                    <div className="text-lg font-bold text-white">12.3 KB/s</div>
                  </div>
                </div>

                {/* Simple traffic graph */}
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <div className="text-xs text-slate-400 mb-2">Session Activity</div>
                  <div className="h-16 flex items-end justify-between gap-1">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-gradient-to-t from-success/50 to-success/20 rounded-sm flex-1"
                        style={{
                          height: `${Math.random() * 80 + 20}%`,
                          animationDelay: `${i * 50}ms`
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div className="text-xs text-slate-400 text-center pt-2">
                  Session Duration: 1h 23m
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null; // Modal version removed for simplicity
}