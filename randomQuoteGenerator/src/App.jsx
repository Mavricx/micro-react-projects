import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState(null);

  const fetchQuote = () => {
    fetch("https://api.api-ninjas.com/v1/quotes", {
      method: "GET",
      headers: {
        "X-Api-Key": import.meta.env.VITE_NINJA_API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => {
        console.error("error in fetching the Message", error.message);
      });
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div
      className="w-full h-screen bg-cover bg-center flex flex-col items-center justify-center"
      style={{
        backgroundImage:
          "url(https://images.pexels.com/photos/32849129/pexels-photo-32849129.jpeg)",
      }}
    >
      <h1 className="text-white mb-10 font-bold text-3xl">Random Quote</h1>
      {data && data.length > 0 && (
        <p className="bg-white text-black w-1/2 p-4 rounded">
          {data[0].quote} — <strong>{data[0].author}</strong>
        </p>
      )}
      <button
        onClick={fetchQuote}
        className="bg-white text-black p-2 rounded mt-5"
        type="submit"
      >
        Get New Quote
      </button>
    </div>
  );
}

export default App;
