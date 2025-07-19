import { Crown, Star, Zap, Globe, Shield, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function PremiumFeatures() {
  const features = [
    {
      title: "Premium Servers",
      description: "Access to high-speed servers in exclusive locations",
      icon: Zap,
      premium: true
    },
    {
      title: "Multiple Devices",
      description: "Connect up to 10 devices simultaneously",
      icon: Users,
      premium: true
    },
    {
      title: "Advanced Security",
      description: "Double VPN and Onion over VPN protection",
      icon: Shield,
      premium: true
    },
    {
      title: "Global Access",
      description: "Unlimited bandwidth and streaming support",
      icon: Globe,
      premium: false
    }
  ];

  const plans = [
    {
      name: "Basic",
      price: "Free",
      features: ["5 server locations", "1 device", "Basic encryption"],
      current: true
    },
    {
      name: "Premium",
      price: "$9.99/month",
      features: ["60+ server locations", "10 devices", "Advanced features"],
      highlighted: true
    },
    {
      name: "Ultimate",
      price: "$19.99/month", 
      features: ["100+ servers", "Unlimited devices", "Priority support"]
    }
  ];

  return (
    <Card className="border-0 bg-vpn-gradient-glass backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Crown className="h-5 w-5 text-yellow-500" />
          Premium Features
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Feature Grid */}
        <div className="grid grid-cols-2 gap-3">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className={`
                p-4 rounded-lg border transition-all duration-300 hover:scale-105
                ${feature.premium 
                  ? 'bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/30 shadow-vpn-glow' 
                  : 'bg-muted/30 border-border/50'
                }
                animate-slide-in-left
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-2 mb-2">
                <feature.icon className={`h-4 w-4 ${feature.premium ? 'text-yellow-500' : 'text-muted-foreground'}`} />
                {feature.premium && (
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs px-1.5 py-0.5">
                    Pro
                  </Badge>
                )}
              </div>
              <h4 className="font-medium text-sm mb-1">{feature.title}</h4>
              <p className="text-xs text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Pricing Plans */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Choose Your Plan</h4>
          {plans.map((plan, index) => (
            <div 
              key={plan.name}
              className={`
                p-4 rounded-lg border transition-all duration-300 hover:shadow-vpn-glow
                ${plan.highlighted 
                  ? 'bg-vpn-gradient-primary border-primary shadow-vpn-premium animate-glow-pulse' 
                  : plan.current
                  ? 'bg-success/10 border-success/30'
                  : 'bg-muted/20 border-border/50'
                }
                animate-slide-in-right
              `}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className={`font-semibold ${plan.highlighted ? 'text-primary-foreground' : ''}`}>
                      {plan.name}
                    </h4>
                    {plan.current && (
                      <Badge className="bg-success text-success-foreground text-xs">
                        Current
                      </Badge>
                    )}
                    {plan.highlighted && (
                      <Badge className="bg-yellow-500 text-white text-xs">
                        <Star className="h-3 w-3 mr-1" />
                        Popular
                      </Badge>
                    )}
                  </div>
                  <div className={`text-lg font-bold ${plan.highlighted ? 'text-primary-foreground' : 'text-primary'}`}>
                    {plan.price}
                  </div>
                </div>
                {!plan.current && (
                  <Button 
                    variant={plan.highlighted ? "secondary" : "outline"}
                    size="sm"
                    className={plan.highlighted ? "text-primary" : ""}
                  >
                    {plan.name === "Premium" ? "Upgrade" : "Select"}
                  </Button>
                )}
              </div>
              
              <ul className="space-y-1">
                {plan.features.map((featureText, featureIndex) => (
                  <li 
                    key={featureIndex}
                    className={`text-xs flex items-center gap-2 ${plan.highlighted ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${plan.highlighted ? 'bg-primary-foreground' : 'bg-success'}`} />
                    {featureText}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}