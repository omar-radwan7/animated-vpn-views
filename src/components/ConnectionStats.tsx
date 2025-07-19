import { useState, useEffect } from "react";
import { BarChart3, Clock, Shield, Zap, TrendingUp, Download, Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ConnectionStatsProps {
  isConnected: boolean;
  selectedRegion: string;
}

export function ConnectionStats({ isConnected, selectedRegion }: ConnectionStatsProps) {
  const [stats, setStats] = useState({
    dataUsed: 0,
    sessionTime: 0,
    downloadSpeed: 0,
    uploadSpeed: 0,
    totalSessions: 47,
    dataThisMonth: 12.5
  });

  const [realTimeData, setRealTimeData] = useState({
    download: Array(10).fill(0),
    upload: Array(10).fill(0),
    timestamps: Array(10).fill(0).map((_, i) => Date.now() - (9 - i) * 2000)
  });

  useEffect(() => {
    if (!isConnected) return;

    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        sessionTime: prev.sessionTime + 1,
        dataUsed: prev.dataUsed + (Math.random() * 0.1),
        downloadSpeed: 15 + Math.random() * 70,
        uploadSpeed: 5 + Math.random() * 25
      }));

      setRealTimeData(prev => ({
        download: [...prev.download.slice(1), 15 + Math.random() * 70],
        upload: [...prev.upload.slice(1), 5 + Math.random() * 25],
        timestamps: [...prev.timestamps.slice(1), Date.now()]
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [isConnected]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m ${secs}s`;
  };

  const formatDataUsage = (mb: number) => {
    if (mb > 1024) {
      return `${(mb / 1024).toFixed(1)} GB`;
    }
    return `${mb.toFixed(1)} MB`;
  };

  if (!isConnected) {
    return (
      <Card className="border-0 bg-card/60 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <BarChart3 className="h-5 w-5" />
            Connection Statistics
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <div className="text-muted-foreground">
            Connect to VPN to view real-time statistics
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 bg-card/60 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Live Statistics
          </div>
          <Badge className="bg-success text-success-foreground animate-glow-pulse">
            Live
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Session Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Session Time</span>
            </div>
            <div className="text-2xl font-bold text-primary">
              {formatTime(stats.sessionTime)}
            </div>
          </div>

          <div className="p-4 bg-gradient-to-br from-success/10 to-success/5 rounded-lg border border-success/20">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-success" />
              <span className="text-sm font-medium">Data Used</span>
            </div>
            <div className="text-2xl font-bold text-success">
              {formatDataUsage(stats.dataUsed)}
            </div>
          </div>
        </div>

        {/* Real-time Speed */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Real-time Speed
          </h4>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Download className="h-3 w-3 text-success" />
                <span className="text-xs text-muted-foreground">Download</span>
              </div>
              <div className="text-lg font-bold text-success">
                {stats.downloadSpeed.toFixed(1)} Mbps
              </div>
            </div>
            
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Upload className="h-3 w-3 text-blue-500" />
                <span className="text-xs text-muted-foreground">Upload</span>
              </div>
              <div className="text-lg font-bold text-blue-500">
                {stats.uploadSpeed.toFixed(1)} Mbps
              </div>
            </div>
          </div>
        </div>

        {/* Speed Chart Visualization */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Speed History</h4>
          <div className="h-20 bg-muted/20 rounded-lg p-2 flex items-end gap-1">
            {realTimeData.download.map((speed, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-1">
                <div 
                  className="w-full bg-gradient-to-t from-success to-success/60 rounded-sm animate-fade-in-up"
                  style={{ 
                    height: `${(speed / 100) * 60}px`,
                    animationDelay: `${index * 0.1}s`
                  }}
                />
                <div 
                  className="w-full bg-gradient-to-t from-blue-500 to-blue-500/60 rounded-sm animate-fade-in-up"
                  style={{ 
                    height: `${(realTimeData.upload[index] / 50) * 20}px`,
                    animationDelay: `${index * 0.1}s`
                  }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              Download
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Upload
            </span>
          </div>
        </div>

        {/* Monthly Summary */}
        <div className="pt-4 border-t border-border/50">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span>This Month</span>
            </div>
            <div className="text-right">
              <div className="font-semibold">{formatDataUsage(stats.dataThisMonth * 1024)}</div>
              <div className="text-muted-foreground">{stats.totalSessions} sessions</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}