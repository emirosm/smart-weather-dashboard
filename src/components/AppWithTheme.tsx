import { useEffect } from "react";
import { useWeatherStore } from "../stores/useWeatherStore";
import App from "../App";

export function AppWithTheme() {
  const theme = useWeatherStore((s) => s.theme);

  useEffect(() => {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  useEffect(() => {
    // Update theme class when theme state changes
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return <App />;
} 