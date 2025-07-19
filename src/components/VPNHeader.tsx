import { Moon, Sun, User, Shield, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function VPNHeader() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  
  // This would be connected to your auth system
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({ name: "Alex Johnson" });

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    // Here you would call your auth system logout
    // await yourAuthService.logout();
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(isAuthenticated ? '/dashboard' : '/')}>
          <Shield className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold bg-vpn-gradient-primary bg-clip-text text-transparent">
            SecureVPN
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleTheme}
            className="transition-transform hover:scale-110"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost"
                onClick={() => navigate('/profile')}
                className="flex items-center gap-2 transition-transform hover:scale-105"
              >
                <User className="h-5 w-5" />
                <span className="hidden sm:inline">{user.name}</span>
              </Button>
              
              <Button 
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="transition-transform hover:scale-110"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost"
                onClick={handleLogin}
                className="flex items-center gap-2 transition-transform hover:scale-105"
              >
                <LogIn className="h-5 w-5" />
                <span>Sign In</span>
              </Button>
              
              <Button 
                variant="vpn"
                onClick={() => navigate('/signup')}
                className="transition-transform hover:scale-105"
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}