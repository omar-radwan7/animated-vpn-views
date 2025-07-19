import { useState } from "react";
import { ChevronDown, MapPin, Zap, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface Region {
  id: string;
  name: string;
  country: string;
  flag: string;
  ping: number;
  load: number;
}

const regions: Region[] = [
  { id: "us-east", name: "New York", country: "United States", flag: "🇺🇸", ping: 25, load: 45 },
  { id: "us-west", name: "Los Angeles", country: "United States", flag: "🇺🇸", ping: 32, load: 38 },
  { id: "uk", name: "London", country: "United Kingdom", flag: "🇬🇧", ping: 48, load: 52 },
  { id: "de", name: "Frankfurt", country: "Germany", flag: "🇩🇪", ping: 41, load: 35 },
  { id: "jp", name: "Tokyo", country: "Japan", flag: "🇯🇵", ping: 68, load: 28 },
  { id: "au", name: "Sydney", country: "Australia", flag: "🇦🇺", ping: 85, load: 41 },
  { id: "ca", name: "Toronto", country: "Canada", flag: "🇨🇦", ping: 29, load: 33 },
  { id: "sg", name: "Singapore", country: "Singapore", flag: "🇸🇬", ping: 72, load: 44 },
  { id: "nl", name: "Amsterdam", country: "Netherlands", flag: "🇳🇱", ping: 43, load: 39 },
  { id: "fr", name: "Paris", country: "France", flag: "🇫🇷", ping: 46, load: 47 },
];

interface RegionSelectorProps {
  selectedRegion: string;
  onRegionChange: (region: string) => void;
}

export function RegionSelector({ selectedRegion, onRegionChange }: RegionSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const selected = regions.find(r => r.id === selectedRegion) || regions[0];

  const getLoadColor = (load: number) => {
    if (load < 40) return "text-success";
    if (load < 70) return "text-yellow-500";
    return "text-destructive";
  };

  const getPingColor = (ping: number) => {
    if (ping < 50) return "text-success";
    if (ping < 100) return "text-yellow-500";
    return "text-destructive";
  };

  return (
    <Card className="border-0 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Globe className="h-5 w-5" />
          Server Location
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full justify-between bg-background/50 hover:bg-background/80 transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{selected.flag}</span>
                <div className="text-left">
                  <div className="font-medium">{selected.name}</div>
                  <div className="text-xs text-muted-foreground">{selected.country}</div>
                </div>
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
            </Button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent className="w-[320px] max-h-80 overflow-y-auto bg-background/95 backdrop-blur-sm border-border/50">
            {regions.map((region) => (
              <DropdownMenuItem
                key={region.id}
                onClick={() => {
                  onRegionChange(region.id);
                  setIsOpen(false);
                }}
                className="p-3 cursor-pointer hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{region.flag}</span>
                    <div>
                      <div className="font-medium">
                        {region.name}
                      </div>
                      <div className="text-xs text-muted-foreground">{region.country}</div>
                    </div>
                  </div>
                  <div className="text-right text-xs space-y-1">
                    <div className={`flex items-center gap-1 ${getPingColor(region.ping)}`}>
                      <Zap className="h-3 w-3" />
                      {region.ping}ms
                    </div>
                    <div className={`${getLoadColor(region.load)}`}>
                      {region.load}% load
                    </div>
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Selected Region Details */}
        <div className="grid grid-cols-2 gap-4 p-3 bg-muted/50 rounded-lg">
          <div className="text-center">
            <div className={`text-lg font-bold ${getPingColor(selected.ping)}`}>
              {selected.ping}ms
            </div>
            <div className="text-xs text-muted-foreground">Ping</div>
          </div>
          <div className="text-center">
            <div className={`text-lg font-bold ${getLoadColor(selected.load)}`}>
              {selected.load}%
            </div>
            <div className="text-xs text-muted-foreground">Load</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}