import { usePreferencesStore } from "../../stores/usePreferencesStore";
import type { ChartType } from "../../types/weather";

const options: ChartType[] = ["temp", "humidity", "wind"];

export default function ChartFilter() {
  const { chartType, setChartType } = usePreferencesStore();

  return (
    <div className="flex gap-2 mb-4">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => setChartType(option)}
          className={`px-4 py-2 rounded ${
            chartType === option
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          }`}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </button>
      ))}
    </div>
  );
}
