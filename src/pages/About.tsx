export default function About() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 text-sm leading-relaxed">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        🌦 About This App
      </h1>

      <p className="text-gray-700 dark:text-gray-300">
        This app helps you understand current and upcoming weather conditions
        using data from the OpenWeatherMap API. Here's what you need to know to
        interpret the charts and weather terms.
      </p>

      <h2 className="text-xl font-semibold mt-4 text-gray-900 dark:text-white">
        📖 Key Weather Terminology
      </h2>

      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
        <li>
          <strong>Temperature</strong> — Measured in{" "}
          <code className="text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 px-1 rounded">
            °C
          </code>{" "}
          (Celsius) or{" "}
          <code className="text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 px-1 rounded">
            °F
          </code>{" "}
          (Fahrenheit). Indicates how hot or cold the air is.
        </li>
        <li>
          <strong>Humidity</strong> — Percentage of water vapor in the air.
          Above 60% feels muggy.
        </li>
        <li>
          <strong>Wind Speed</strong> — Measured in{" "}
          <code className="text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 px-1 rounded">
            m/s
          </code>{" "}
          or{" "}
          <code className="text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 px-1 rounded">
            km/h
          </code>
          . Higher values indicate stronger winds.
        </li>
        <li>
          <strong>Forecast</strong> — The app shows 5-day forecasts in 3-hour
          intervals for accuracy.
        </li>
        <li>
          <strong>Feels Like</strong> — Temperature adjusted for wind/humidity.
          Can feel warmer or colder than actual.
        </li>
        <li>
          <strong>Weather Icon</strong> — Visual summary (e.g., ☀️ clear, ☁️
          cloudy, 🌧 rain).
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-4 text-gray-900 dark:text-white">
        🌡 Units Explained
      </h2>

      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
        <li>
          <code className="text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 px-1 rounded">
            °C
          </code>{" "}
          — Celsius (used globally). 0°C = freezing point of water.
        </li>
        <li>
          <code className="text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 px-1 rounded">
            °F
          </code>{" "}
          — Fahrenheit (used in the U.S.). 32°F = freezing point.
        </li>
        <li>
          <code className="text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 px-1 rounded">
            %
          </code>{" "}
          — Humidity as a percentage (0% = dry air, 100% = fully saturated).
        </li>
        <li>
          <code className="text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 px-1 rounded">
            m/s
          </code>{" "}
          — Meters per second. Used for wind speed (1 m/s ≈ 3.6 km/h).
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-4 text-gray-900 dark:text-white">
        🧠 How to Use This App
      </h2>
      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
        <li>
          Search for any city to view its current weather and 5-day forecast.
        </li>
        <li>
          Use the "📍 Use My Location" button to get weather for your current
          coordinates.
        </li>
        <li>Switch between °C and °F using the unit toggle in the header.</li>
        <li>
          Use the chart filters to view temperature, humidity, or wind over
          time.
        </li>
        <li>Your last 5 searches are stored and can be quickly reused.</li>
      </ul>

      <p className="text-gray-500 dark:text-gray-400 text-xs pt-4">
        Weather data provided by{" "}
        <a
          href="https://openweathermap.org"
          className="underline hover:text-gray-700 dark:hover:text-gray-300"
          target="_blank"
        >
          OpenWeatherMap
        </a>
        .
      </p>
    </div>
  );
}
