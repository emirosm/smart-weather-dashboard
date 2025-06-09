import { Link } from "react-router-dom";
import { useWeatherStore } from "../stores/useWeatherStore";
import { Moon, Sun } from "lucide-react";

export default function Header() {
  const toggleTheme = useWeatherStore((s) => s.toggleTheme);
  const theme = useWeatherStore((s) => s.theme);
  const unit = useWeatherStore((s) => s.unit);
  const setUnit = useWeatherStore((s) => s.setUnit);

  return (
    <header className="bg-white dark:bg-gray-800 shadow px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <nav className="flex gap-4 text-sm font-medium">
          <Link
            to="/"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Home
          </Link>
          <Link
            to="/favourites"
            className="text-gray-600 dark:text-gray-300 hover:underline"
          >
            Favourites
          </Link>
          <Link
            to="/about"
            className="text-gray-600 dark:text-gray-300 hover:underline"
          >
            About
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setUnit(unit === "metric" ? "imperial" : "metric")}
            className="text-sm border border-gray-300 dark:border-gray-600 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
          >
            {unit === "metric" ? "°C" : "°F"}
          </button>
          <button
            onClick={toggleTheme}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
