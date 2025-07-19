import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Here you would integrate with your auth system
      // Example: await yourAuthService.login(formData.email, formData.password);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // On successful login, redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login error (show toast, error message, etc.)
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen relative bg-vpn-gradient-cyber flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/50" />
      
      <div className="relative z-10 w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="h-12 w-12 text-primary-glow" />
            <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-primary-glow to-success-glow">
              SecureVPN
            </span>
          </div>
          <p className="text-foreground/70">Welcome back! Sign in to your account</p>
        </div>

        {/* Login Form */}
        <Card className="border-0 bg-vpn-gradient-glass backdrop-blur-sm shadow-vpn-premium animate-slide-in-up">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
                  <Mail className="h-4 w-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="bg-background/50 border-border/50 focus:border-primary-glow focus:ring-primary-glow/20"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2 text-sm font-medium">
                  <Lock className="h-4 w-4" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="bg-background/50 border-border/50 focus:border-primary-glow focus:ring-primary-glow/20 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-primary-glow hover:text-primary transition-colors"
                >
                  Forgot your password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="vpn"
                className="w-full py-6 text-lg font-semibold group"
                disabled={isLoading}
              >
                {isLoading ? (
                  "Signing In..."
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link 
                  to="/signup" 
                  className="text-primary-glow hover:text-primary font-medium transition-colors"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="mt-6 text-center text-xs text-foreground/60 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <p>🔒 Your connection is secured with 256-bit encryption</p>
        </div>
      </div>
    </div>
  );
}