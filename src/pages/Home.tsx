import { useWeatherQuery } from "../hooks/useWeatherQuery";
import WeatherCard from "../components/weather/WeatherCard";
import ForecastChart from "../components/weather/ForecastChart";
import ChartFilter from "../components/weather/ChartFilter";
import SearchForm from "../components/ui/SearchForm";
import RecentSearches from "../components/ui/RecentSearches";
import UseMyLocation from "../components/ui/UseMyLocation";
import LoadingSpinner from "../components/ui/LoadingSpinner";

export default function Home() {
  const { data, isLoading } = useWeatherQuery();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-12">
          <SearchForm />
          <RecentSearches />
          <UseMyLocation />
        </div>
        {isLoading ? (
          <LoadingSpinner size="lg" className="my-8" />
        ) : data ? (
          <div className="space-y-8">
            <WeatherCard data={data} />
            <div>
              <ChartFilter />
              <ForecastChart />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
