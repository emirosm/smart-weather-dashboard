import { useWeatherStore } from "../stores/useWeatherStore";

export default function ChartFilter() {
  const chartType = useWeatherStore((s) => s.chartType);
  const setChartType = useWeatherStore((s) => s.setChartType);

  const options: { label: string; value: "temp" | "humidity" | "wind" }[] = [
    { label: "🌡 Temp", value: "temp" },
    { label: "💧 Humidity", value: "humidity" },
    { label: "💨 Wind", value: "wind" },
  ];

  return (
    <div className="flex gap-2 mb-4">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => setChartType(option.value)}
          className={`px-3 py-1 rounded border ${
            chartType === option.value
              ? "bg-blue-600 text-white"
              : "bg-white dark:bg-gray-700 text-black dark:text-white"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
