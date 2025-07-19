import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeProviderContext = createContext<ThemeProviderContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    // Return a default implementation when used outside of provider
    const [theme, setThemeState] = useState<Theme>(() => {
      if (typeof window !== "undefined") {
        return (localStorage.getItem("vpn-theme") as Theme) || "system";
      }
      return "system";
    });

    const setTheme = (newTheme: Theme) => {
      setThemeState(newTheme);
      if (typeof window !== "undefined") {
        localStorage.setItem("vpn-theme", newTheme);
        
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");

        if (newTheme === "system") {
          const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
          root.classList.add(systemTheme);
        } else {
          root.classList.add(newTheme);
        }
      }
    };

    const toggleTheme = () => {
      const newTheme = theme === "dark" ? "light" : "dark";
      setTheme(newTheme);
    };

    // Apply theme on mount
    useEffect(() => {
      setTheme(theme);
    }, []);

    return { theme, setTheme, toggleTheme };
  }

  return context;
}