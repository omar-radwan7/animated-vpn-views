import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Shield, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false
  });

  const checkPasswordStrength = (password: string) => {
    setPasswordStrength({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      // Handle password mismatch error
      console.error("Passwords don't match");
      return;
    }

    if (!acceptTerms) {
      // Handle terms not accepted error
      console.error("Please accept the terms and conditions");
      return;
    }

    setIsLoading(true);

    try {
      // Here you would integrate with your auth system
      // Example: await yourAuthService.signup(formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // On successful signup, redirect to dashboard or login
      navigate('/');
    } catch (error) {
      console.error("Signup failed:", error);
      // Handle signup error (show toast, error message, etc.)
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === "password") {
      checkPasswordStrength(value);
    }
  };

  const isPasswordStrong = Object.values(passwordStrength).every(Boolean);

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
          <p className="text-foreground/70">Create your account and join millions of users</p>
        </div>

        {/* Signup Form */}
        <Card className="border-0 bg-vpn-gradient-glass backdrop-blur-sm shadow-vpn-premium animate-slide-in-up">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2 text-sm font-medium">
                  <User className="h-4 w-4" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="bg-background/50 border-border/50 focus:border-primary-glow focus:ring-primary-glow/20"
                />
              </div>

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
                    placeholder="Create a strong password"
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

                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="space-y-2 p-3 bg-muted/20 rounded-lg">
                    <div className="text-xs font-medium text-muted-foreground">Password strength:</div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className={`flex items-center gap-1 ${passwordStrength.length ? 'text-success' : 'text-muted-foreground'}`}>
                        <Check className="h-3 w-3" />
                        8+ characters
                      </div>
                      <div className={`flex items-center gap-1 ${passwordStrength.uppercase ? 'text-success' : 'text-muted-foreground'}`}>
                        <Check className="h-3 w-3" />
                        Uppercase
                      </div>
                      <div className={`flex items-center gap-1 ${passwordStrength.lowercase ? 'text-success' : 'text-muted-foreground'}`}>
                        <Check className="h-3 w-3" />
                        Lowercase
                      </div>
                      <div className={`flex items-center gap-1 ${passwordStrength.number ? 'text-success' : 'text-muted-foreground'}`}>
                        <Check className="h-3 w-3" />
                        Number
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="flex items-center gap-2 text-sm font-medium">
                  <Lock className="h-4 w-4" />
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="bg-background/50 border-border/50 focus:border-primary-glow focus:ring-primary-glow/20 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start gap-3">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                  className="mt-1"
                />
                <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                  I agree to the{" "}
                  <Link to="/terms" className="text-primary-glow hover:text-primary underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-primary-glow hover:text-primary underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="vpn"
                className="w-full py-6 text-lg font-semibold group"
                disabled={isLoading || !isPasswordStrong || !acceptTerms}
              >
                {isLoading ? (
                  "Creating Account..."
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>

            {/* Sign In Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link 
                  to="/login" 
                  className="text-primary-glow hover:text-primary font-medium transition-colors"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="mt-6 text-center text-xs text-foreground/60 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <p>🔒 Your data is protected with military-grade encryption</p>
        </div>
      </div>
    </div>
  );
}