import { create } from "zustand";

type Unit = "metric" | "imperial";

interface WeatherStore {
  city: string;
  coordinates: { lat: number; lon: number } | null;
  unit: Unit;
  theme: "light" | "dark";
  chartType: "temp" | "humidity" | "wind";
  recentSearches: string[];
  favourites: string[];
  addFavourite: (city: string) => void;
  removeFavourite: (city: string) => void;
  isFavourite: (city: string) => boolean;
  setCity: (city: string) => void;
  setCoordinates: (coords: { lat: number; lon: number }) => void;
  resetCoordinates: () => void;
  resetCity: () => void;
  setUnit: (unit: Unit) => void;
  toggleTheme: () => void;
  setChartType: (type: "temp" | "humidity" | "wind") => void;
  addRecentSearch: (city: string) => void;
}

export const useWeatherStore = create<WeatherStore>((set, get) => ({
  city: "",
  coordinates: null,
  unit: "metric",
  theme: "light",
  chartType: "temp",
  recentSearches: JSON.parse(localStorage.getItem("recentSearches") || "[]"),
  favourites: JSON.parse(
    localStorage.getItem("favourites") || "[]"
  ) as string[],
  addFavourite: (city) =>
    set((state) => {
      const updated = [...new Set([city, ...state.favourites])].slice(0, 10);
      localStorage.setItem("favourites", JSON.stringify(updated));
      return { favourites: updated };
    }),

  removeFavourite: (city) =>
    set((state) => {
      const updated = state.favourites.filter(
        (c) => c.toLowerCase() !== city.toLowerCase()
      );
      localStorage.setItem("favourites", JSON.stringify(updated));
      return { favourites: updated };
    }),

  isFavourite: (city) =>
    get().favourites.some((c) => c.toLowerCase() === city.toLowerCase()),

  setUnit: (unit) => set({ unit }),
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),
  setChartType: (type) => set({ chartType: type }),

  addRecentSearch: (city) =>
    set((state) => {
      const updated = [
        city,
        ...state.recentSearches.filter(
          (c) => c.toLowerCase() !== city.toLowerCase()
        ),
      ];
      const sliced = updated.slice(0, 5);
      localStorage.setItem("recentSearches", JSON.stringify(sliced));
      return { recentSearches: sliced };
    }),
  setCity: (city) => set({ city, coordinates: null }),
  setCoordinates: (coords) => set({ coordinates: coords, city: "" }),
  resetCoordinates: () => set({ coordinates: null }),
  resetCity: () => set({ city: "" }),
}));
