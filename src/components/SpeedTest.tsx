import { useState, useEffect } from "react";
import { Activity, Download, Upload, Timer, Signal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface SpeedTestProps {
  isConnected: boolean;
}

export function SpeedTest({ isConnected }: SpeedTestProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState(0);
  const [ping, setPing] = useState(0);
  const [progress, setProgress] = useState(0);

  const runSpeedTest = async () => {
    if (!isConnected) return;
    
    setIsRunning(true);
    setProgress(0);
    setDownloadSpeed(0);
    setUploadSpeed(0);
    setPing(0);

    // Simulate speed test with realistic progression
    const testDuration = 8000; // 8 seconds
    const interval = 100;
    const steps = testDuration / interval;

    for (let i = 0; i <= steps; i++) {
      await new Promise(resolve => setTimeout(resolve, interval));
      
      const progressPercent = (i / steps) * 100;
      setProgress(progressPercent);

      // Ping test (first 1.5 seconds)
      if (i <= steps * 0.2) {
        setPing(Math.floor(25 + Math.random() * 10));
      }
      
      // Download test (next 3 seconds)
      if (i > steps * 0.2 && i <= steps * 0.6) {
        const maxDownload = 85 + Math.random() * 30;
        setDownloadSpeed(Math.floor(maxDownload * ((i - steps * 0.2) / (steps * 0.4))));
      }
      
      // Upload test (final 3.5 seconds)
      if (i > steps * 0.6) {
        const maxUpload = 25 + Math.random() * 15;
        setUploadSpeed(Math.floor(maxUpload * ((i - steps * 0.6) / (steps * 0.4))));
      }
    }

    setIsRunning(false);
  };

  const getSpeedColor = (speed: number, type: 'download' | 'upload') => {
    const threshold = type === 'download' ? 50 : 20;
    if (speed > threshold) return "text-success";
    if (speed > threshold * 0.5) return "text-yellow-500";
    return "text-destructive";
  };

  const getPingColor = (ping: number) => {
    if (ping < 30) return "text-success";
    if (ping < 80) return "text-yellow-500";
    return "text-destructive";
  };

  return (
    <Card className="border-0 bg-card/60 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Activity className="h-5 w-5" />
          Speed Test
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Speed Test Button */}
        <Button
          variant={isConnected ? "vpn" : "secondary"}
          className="w-full"
          onClick={runSpeedTest}
          disabled={!isConnected || isRunning}
        >
          {isRunning ? "Testing..." : "Run Speed Test"}
        </Button>

        {/* Progress Bar */}
        {isRunning && (
          <div className="space-y-2 animate-fade-in-up">
            <Progress value={progress} className="h-2" />
            <div className="text-sm text-center text-muted-foreground">
              {progress < 20 ? "Testing ping..." : 
               progress < 60 ? "Testing download..." : 
               "Testing upload..."}
            </div>
          </div>
        )}

        {/* Results Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="flex justify-center mb-2">
              <Timer className={`h-5 w-5 ${getPingColor(ping)}`} />
            </div>
            <div className={`text-2xl font-bold ${getPingColor(ping)}`}>
              {ping || '--'}
            </div>
            <div className="text-xs text-muted-foreground">ms ping</div>
          </div>

          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="flex justify-center mb-2">
              <Download className={`h-5 w-5 ${getSpeedColor(downloadSpeed, 'download')}`} />
            </div>
            <div className={`text-2xl font-bold ${getSpeedColor(downloadSpeed, 'download')}`}>
              {downloadSpeed || '--'}
            </div>
            <div className="text-xs text-muted-foreground">Mbps down</div>
          </div>

          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="flex justify-center mb-2">
              <Upload className={`h-5 w-5 ${getSpeedColor(uploadSpeed, 'upload')}`} />
            </div>
            <div className={`text-2xl font-bold ${getSpeedColor(uploadSpeed, 'upload')}`}>
              {uploadSpeed || '--'}
            </div>
            <div className="text-xs text-muted-foreground">Mbps up</div>
          </div>
        </div>

        {/* Connection Quality Indicator */}
        {(downloadSpeed > 0 || uploadSpeed > 0) && (
          <div className="flex items-center justify-center gap-2 p-3 bg-success/10 rounded-lg animate-fade-in-up">
            <Signal className="h-4 w-4 text-success" />
            <span className="text-sm font-medium text-success">
              {downloadSpeed > 70 ? "Excellent" : 
               downloadSpeed > 40 ? "Good" : 
               downloadSpeed > 20 ? "Fair" : "Poor"} Connection Quality
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}