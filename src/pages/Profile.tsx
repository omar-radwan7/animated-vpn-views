import { useState } from "react";
import { ArrowLeft, Edit2, Save, X, User, Mail, Phone, Calendar, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { VPNHeader } from "@/components/VPNHeader";

export default function Profile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    joinDate: "January 2024",
    plan: "Free Forever",
    avatar: ""
  });

  const [editProfile, setEditProfile] = useState(profile);

  const handleSave = () => {
    setProfile(editProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditProfile(profile);
    setIsEditing(false);
  };

  const stats = [
    { label: "Data Used", value: "2.5 GB", icon: Shield },
    { label: "Sessions", value: "47", icon: Clock },
    { label: "Countries", value: "12", icon: User },
  ];

  return (
    <div className="min-h-screen bg-vpn-gradient-cyber relative">
      <div className="absolute inset-0 bg-background/50" />
      <div className="relative z-10">
      <VPNHeader />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="hover:bg-accent/50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold">Profile Settings</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Profile Card */}
          <Card className="md:col-span-2 border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              {!isEditing ? (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsEditing(true)}
                  className="hover:bg-accent/50"
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleCancel}
                    className="hover:bg-destructive/10 hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="vpn" 
                    size="sm" 
                    onClick={handleSave}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={profile.avatar} />
                  <AvatarFallback className="bg-vpn-gradient-primary text-primary-foreground text-xl">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{profile.name}</h3>
                  <Badge className="bg-success text-success-foreground">
                    {profile.plan}
                  </Badge>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Full Name
                  </Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={editProfile.name}
                      onChange={(e) => setEditProfile(prev => ({ ...prev, name: e.target.value }))}
                      className="bg-background/50"
                    />
                  ) : (
                    <div className="p-3 bg-muted/50 rounded-md">{profile.name}</div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Address
                  </Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={editProfile.email}
                      onChange={(e) => setEditProfile(prev => ({ ...prev, email: e.target.value }))}
                      className="bg-background/50"
                    />
                  ) : (
                    <div className="p-3 bg-muted/50 rounded-md">{profile.email}</div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Number
                  </Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={editProfile.phone}
                      onChange={(e) => setEditProfile(prev => ({ ...prev, phone: e.target.value }))}
                      className="bg-background/50"
                    />
                  ) : (
                    <div className="p-3 bg-muted/50 rounded-md">{profile.phone}</div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Member Since
                  </Label>
                  <div className="p-3 bg-muted/50 rounded-md">{profile.joinDate}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card className="border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Usage Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {stats.map((stat, index) => (
                <div 
                  key={stat.label}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-3">
                    <stat.icon className="h-5 w-5 text-primary" />
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                  </div>
                  <span className="font-semibold">{stat.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="mt-6 border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { action: "Connected to", location: "New York, US", time: "2 hours ago" },
                { action: "Disconnected from", location: "London, UK", time: "5 hours ago" },
                { action: "Connected to", location: "Tokyo, JP", time: "1 day ago" },
                { action: "Plan upgraded to", location: "Free Forever", time: "3 days ago" },
              ].map((activity, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div>
                    <span className="text-sm">{activity.action} </span>
                    <span className="text-sm font-medium">{activity.location}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </div>
  );
}