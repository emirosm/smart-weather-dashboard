import { useWeatherStore } from "../../stores/useWeatherStore";

export default function UseMyLocation() {
  const setCoordinates = useWeatherStore((s) => s.setCoordinates);

  const handleClick = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Error getting your location. Please try again.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
    >
      Use My Location
    </button>
  );
} 