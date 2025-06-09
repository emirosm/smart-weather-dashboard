import { useForm } from "react-hook-form";
import { useWeatherStore } from "../stores/useWeatherStore";
import UseMyLocation from "./UseMyLocation";

interface FormData {
  city: string;
}

export default function SearchForm() {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const setCity = useWeatherStore((s) => s.setCity);
  const addRecentSearch = useWeatherStore((s) => s.addRecentSearch);
  const currentCity = useWeatherStore((s) => s.city);

  const onSubmit = ({ city }: FormData) => {
    const trimmed = city.trim();
    if (trimmed.toLowerCase() === currentCity.toLowerCase()) return;

    setCity(trimmed);
    addRecentSearch(trimmed);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 mb-6 w-full">
      <input
        {...register("city", { required: true })}
        className="px-3 py-2 border rounded shadow flex-grow text-black dark:text-white dark:bg-gray-700 dark:border-gray-600"
        placeholder="Enter city..."
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors flex-shrink-0"
      >
        Search
      </button>
      <UseMyLocation />
    </form>
  );
}
