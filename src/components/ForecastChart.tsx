import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    Filler,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  import { useForecastQuery } from '../hooks/useForecastQuery';
  import { useWeatherStore } from '../stores/useWeatherStore';
  import dayjs from 'dayjs';
  import ChartFilter from './ChartFilter';
  
  ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler);
  
  export default function ForecastChart() {
    const { data, isLoading, isError, error } = useForecastQuery();
    const unit = useWeatherStore((s) => s.unit);
    const chartType = useWeatherStore((s) => s.chartType);
  
    if (isLoading) return <p>Loading forecast...</p>;
    if (isError) return <p>Error: {(error as Error).message}</p>;
    if (!data) return null;
  
    const labels = data.list.map((entry) => dayjs(entry.dt_txt).format('ddd HH:mm'));
  
    const metricData = data.list.map((entry) => {
      if (chartType === 'humidity') return entry.main.humidity;
      if (chartType === 'wind') return entry.wind.speed;
      return entry.main.temp;
    });
  
    const unitLabel = chartType === 'temp'
      ? unit === 'metric' ? '°C' : '°F'
      : chartType === 'humidity'
      ? '%'
      : 'm/s';
  
    const chartData = {
      labels,
      datasets: [
        {
          label: `${chartType.charAt(0).toUpperCase() + chartType.slice(1)} (${unitLabel})`,
          data: metricData,
          fill: true,
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.3,
        },
      ],
    };
  
    const options = {
      responsive: true,
      plugins: {
        legend: { display: true },
      },
      scales: {
        x: {
          ticks: { maxTicksLimit: 8, autoSkip: true },
          title: { display: true, text: 'Time' },
        },
        y: {
          title: {
            display: true,
            text: `${chartType} (${unitLabel})`,
          },
        },
      },
    };
  
    return (
      <div className="bg-white dark:bg-gray-800 p-4 mt-6 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">5-Day Forecast</h3>
        <ChartFilter />
        <Line data={chartData} options={options} />
      </div>
    );
  }
  