import { useForecastQuery } from "../../hooks/useForecastQuery";
import { usePreferencesStore } from "../../stores/usePreferencesStore";
import LoadingSpinner from "../ui/LoadingSpinner";

export default function ForecastChart() {
  const { data, isLoading, isError, error } = useForecastQuery();
  const { unit, chartType } = usePreferencesStore();

  if (isLoading) return <LoadingSpinner size="lg" className="my-8" />;
  if (isError)
    return <p className="text-red-500">Error: {(error as Error).message}</p>;
  if (!data) return null;

  // Filter data to show every 6 hours (every 2nd item since data is every 3 hours)
  const chartData = data.list
    .filter((_, index) => index % 3 === 0)
    .map((item) => ({
      time: new Date(item.dt * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      value:
        chartType === "temp"
          ? item.main.temp
          : chartType === "humidity"
            ? item.main.humidity
            : item.wind.speed,
    }));

  const getChartTitle = () => {
    switch (chartType) {
      case "temp":
        return `Temperature (°${unit === "metric" ? "C" : "F"})`;
      case "humidity":
        return "Humidity (%)";
      case "wind":
        return "Wind Speed (m/s)";
      default:
        return "";
    }
  };

  // Calculate chart dimensions and margins
  const margin = { top: 20, right: 30, bottom: 40, left: 50 };
  const width = 500;
  const height = 300;
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  // Calculate scales
  const xScale = (index: number) =>
    margin.left + index * (chartWidth / (chartData.length - 1));
  const yScale = (value: number) => {
    const min = Math.min(...chartData.map((d) => d.value));
    const max = Math.max(...chartData.map((d) => d.value));
    const range = max - min;
    return margin.top + chartHeight - ((value - min) / range) * chartHeight;
  };

  // Generate Y-axis labels
  const min = Math.min(...chartData.map((d) => d.value));
  const max = Math.max(...chartData.map((d) => d.value));
  const range = max - min;
  const yTicks = 5;
  const yLabels = Array.from({ length: yTicks }, (_, i) => {
    const value = min + (range * i) / (yTicks - 1);
    return value.toFixed(1);
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded shadow p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        {getChartTitle()}
      </h3>
      <div className="relative" style={{ width, height }}>
        <svg
          width={width}
          height={height}
          className="text-gray-900 dark:text-white"
        >
          {/* Y-axis line */}
          <line
            x1={margin.left}
            y1={margin.top}
            x2={margin.left}
            y2={height - margin.bottom}
            stroke="currentColor"
            strokeWidth="2"
          />

          {/* Y-axis labels */}
          {yLabels.map((label, i) => {
            const y = margin.top + (chartHeight * i) / (yTicks - 1);
            return (
              <g key={i}>
                <line
                  x1={margin.left - 5}
                  y1={y}
                  x2={margin.left}
                  y2={y}
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <text
                  x={margin.left - 10}
                  y={y}
                  textAnchor="end"
                  className="text-xs fill-current"
                  dominantBaseline="middle"
                >
                  {label}
                </text>
              </g>
            );
          })}

          {/* X-axis line */}
          <line
            x1={margin.left}
            y1={height - margin.bottom}
            x2={width - margin.right}
            y2={height - margin.bottom}
            stroke="currentColor"
            strokeWidth="2"
          />

          {/* Data points and lines */}
          {chartData.map((point, index) => {
            const x = xScale(index);
            const y = yScale(point.value);

            return (
              <g key={index}>
                <circle cx={x} cy={y} r="4" fill="currentColor" />
                {index > 0 && (
                  <line
                    x1={xScale(index - 1)}
                    y1={yScale(chartData[index - 1].value)}
                    x2={x}
                    y2={y}
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                )}
                <text
                  x={x}
                  y={height - margin.bottom + 20}
                  textAnchor="middle"
                  className="text-xs fill-current"
                  transform={`rotate(45 ${x} ${height - margin.bottom + 20})`}
                >
                  {point.time}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
