import ForecastChart from "../components/ForecastChart";
import RecentSearches from "../components/RecentSearches";
import SearchForm from "../components/SearchForm";
import WeatherCard from "../components/WeatherCard";

export default function Home() {
  return (
    <div className="mx-auto p-6">
      <SearchForm />
      <RecentSearches />
      <WeatherCard />
      <ForecastChart />
    </div>
  );
}
