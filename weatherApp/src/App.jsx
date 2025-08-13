import { useState, useEffect } from "react";
function App() {
  const [inputCity, setInputCity] = useState("");
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    if (city.trim() !== "") {
      setData(null);
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`
      )
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((err) => console.error(err));
    }
  }, [city]);

  const showWeather = () => {
    if (inputCity.trim() === "") {
      alert("Please enter a valid city name.");
      return;
    }
    setCity(inputCity.trim());
  };

  const handleKeydown=(event)=>{
    if(event.key=='Enter'){
      showWeather();
    }
  }

  return (
    <div
      className="w-full h-screen bg-center bg-cover flex justify-center items-center flex-col"
      style={{
        backgroundImage:
          "url(https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg)",
      }}
    >
      <div className="w-1/2 px-5 bg-white rounded-lg shadow-lg p-4 flex flex-col">
        <h2 className="text-xl text-center font-medium">Weather App</h2>
        <label
          htmlFor="City"
          className="block text-sm font-medium text-gray-700"
        >
          City:
        </label>
        <input
          type="text"
          className="mt-1 block w-full border border-gray rounded-b-sm"
          placeholder="Enter the city name"
          value={inputCity}
          onKeyDown={handleKeydown}
          onChange={(e) => setInputCity(e.target.value)}
        />
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md"
          type="submit"
          onClick={showWeather}
        >
          Get Weather
        </button>
      </div>

      {data && data.weather && (
        <ul className=" bg-white rounded-md mt-6 w-1/2 p-4">
        <h2 className="font-bold text-xl text-center">For {data.name}</h2>
          <li>Weather: {data.weather[0].description.toUpperCase()}</li>
          <li>Temperature: {data.main.temp}°C</li>
          <li>Humidity: {data.main.humidity}%</li>
          <li>Wind Speed: {data.wind.speed} m/s</li>
          <li>Pressure: {data.main.pressure} hPa</li>
        </ul>
      )}
    </div>
  );
}

export default App;
