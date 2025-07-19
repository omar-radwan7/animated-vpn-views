import { useState } from "react";
import { Power, Wifi, WifiOff, Shield, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface VPNConnectProps {
  selectedRegion: string;
}

export function VPNConnect({ selectedRegion }: VPNConnectProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    if (isConnected) {
      setIsConnected(false);
      return;
    }

    setIsConnecting(true);
    // Simulate connection delay
    setTimeout(() => {
      setIsConnected(true);
      setIsConnecting(false);
    }, 2000);
  };

  const getConnectionIcon = () => {
    if (isConnecting) return <Power className="h-8 w-8 animate-spin" />;
    if (isConnected) return <ShieldCheck className="h-8 w-8" />;
    return <Shield className="h-8 w-8" />;
  };

  const getStatusIcon = () => {
    if (isConnected) return <Wifi className="h-5 w-5 text-success" />;
    return <WifiOff className="h-5 w-5 text-muted-foreground" />;
  };

  return (
    <div className="space-y-6">
      {/* Status Card */}
      <Card className="border-0 bg-card/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {getStatusIcon()}
              <span className="font-medium">
                {isConnected ? "Connected" : isConnecting ? "Connecting..." : "Disconnected"}
              </span>
            </div>
            <Badge 
              variant={isConnected ? "default" : "secondary"}
              className={isConnected ? "bg-success text-success-foreground" : ""}
            >
              {isConnected ? selectedRegion : "Not Connected"}
            </Badge>
          </div>
          
          {isConnected && (
            <div className="space-y-2 text-sm text-muted-foreground animate-fade-in-up">
              <div className="flex justify-between">
                <span>IP Address:</span>
                <span className="font-mono">192.168.1.100</span>
              </div>
              <div className="flex justify-between">
                <span>Upload:</span>
                <span className="font-mono">1.2 MB/s</span>
              </div>
              <div className="flex justify-between">
                <span>Download:</span>
                <span className="font-mono">5.8 MB/s</span>
              </div>
              <div className="flex justify-between">
                <span>Connected Since:</span>
                <span className="font-mono">2 min ago</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Main Connect Button */}
      <div className="flex justify-center">
        <Button
          variant={isConnected ? "vpnSuccess" : "vpnConnect"}
          onClick={handleConnect}
          disabled={isConnecting}
          className={`
            w-48 h-48 rounded-full text-2xl font-bold shadow-2xl
            ${isConnecting ? "animate-vpn-pulse" : ""}
            ${isConnected ? "animate-vpn-connect" : ""}
            transition-all duration-500 hover:scale-105
          `}
        >
          <div className="flex flex-col items-center gap-3">
            {getConnectionIcon()}
            <span>
              {isConnecting ? "Connecting..." : isConnected ? "Disconnect" : "Connect"}
            </span>
          </div>
        </Button>
      </div>

      {/* Security Info */}
      {isConnected && (
        <Card className="border-0 bg-success/10 animate-fade-in-up">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 text-success">
              <ShieldCheck className="h-5 w-5" />
              <div>
                <p className="font-medium">Your connection is secure</p>
                <p className="text-sm text-muted-foreground">
                  All traffic is encrypted with AES-256 encryption
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}