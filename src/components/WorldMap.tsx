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
              {/* World Map SVG with more realistic shapes */}
              <svg viewBox="0 0 1000 500" className="w-full h-full">
                {/* World continents - more detailed and realistic */}
                <g fill="rgba(100, 116, 139, 0.3)" stroke="rgba(100, 116, 139, 0.5)" strokeWidth="0.5">
                  {/* North America */}
                  <path d="M50,150 C70,130 90,125 120,130 L160,135 C200,140 230,150 260,170 L290,190 C310,210 315,240 310,270 L300,300 C285,320 260,330 230,325 L200,320 C170,315 140,305 110,290 L80,270 C60,245 50,210 50,180 Z" />
                  <path d="M270,120 C290,115 310,120 325,135 L340,150 C350,170 345,190 335,200 L320,210 C305,215 290,210 280,195 L275,175 C270,155 270,135 270,120 Z" />
                  
                  {/* South America */}
                  <path d="M220,330 C240,325 255,335 265,350 L275,380 C280,420 275,460 270,485 L265,500 C245,505 225,500 215,485 L205,460 C200,420 205,380 210,350 L215,335 Z" />
                  
                  {/* Europe */}
                  <path d="M450,120 C470,115 490,120 510,125 L530,130 C545,140 550,155 545,170 L540,185 C525,195 505,200 485,195 L465,190 C450,180 445,165 445,150 L450,135 Z" />
                  
                  {/* Africa */}
                  <path d="M450,200 C470,195 490,200 510,210 L530,225 C540,250 545,280 540,310 L535,340 C530,370 520,395 505,410 L485,420 C465,415 450,395 445,375 L440,345 C435,315 440,285 445,255 L450,225 Z" />
                  
                  {/* Asia */}
                  <path d="M550,110 C580,105 620,110 660,115 L700,120 C740,125 780,135 820,150 L860,170 C880,190 885,220 880,250 L875,280 C865,305 845,320 820,325 L780,330 C740,325 700,320 660,315 L620,310 C580,305 550,295 540,275 L535,245 C535,205 540,165 545,135 Z" />
                  
                  {/* Australia */}
                  <path d="M780,360 C800,355 820,360 835,370 L850,380 C855,395 850,410 840,420 L825,430 C810,435 795,430 785,420 L775,410 C770,395 775,380 780,370 Z" />
                  
                  {/* Greenland */}
                  <path d="M320,80 C335,75 350,80 360,95 L365,110 C360,125 350,135 335,140 L320,135 C305,130 300,115 305,100 L310,85 Z" />
                </g>
                
                {/* Grid lines for professional look */}
                <defs>
                  <pattern id="grid" width="50" height="25" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 25" fill="none" stroke="rgba(100, 116, 139, 0.1)" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
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