import React, { useState, useEffect } from "react";
import NewsCard from "./Components/NewsCard";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [topic, setTopic] = useState("india");
  const pageSize = 12;

  let today = new Date();
  let yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  let year = yesterday.getFullYear();
  let month = String(yesterday.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  let day = String(yesterday.getDate()).padStart(2, "0");

  let formattedYesterday = `${year}-${month}-${day}`;

  //fetch article from the api
  const fetchArticles = async (query = topic) => {
    try {
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${query}&from=${formattedYesterday}&sortBy=publishedAt&apiKey=${
          import.meta.env.VITE_NEWS_API_KEY
        }`
      );
      const data = await res.json();
      setArticles(data.articles || []);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }

    setCurrentPage(1);
  };

  useEffect(() => {
    fetchArticles(topic);
  }, [topic]);

  const indexOfLast = currentPage * pageSize;
  const indexOfFirst = indexOfLast - pageSize;
  const currentArticles = articles.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(articles.length / pageSize);

  return (
    <div
      className="flex justify-center items-center h-screen w-full bg-cover bg-center flex-col"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/31376810/pexels-photo-31376810.jpeg')",
      }}
    >
      <div className="w-full text-center flex flex-row justify-center">
        <input
          type="text"
          className="lg:w-1/2 sm:w-full md:w-2/3 text-center bg-white rounded-sm"
          placeholder="Search the topic you want your news about...."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded "
          onClick={() => setTopic(searchTerm || "India")}
        >
          Search
        </button>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentArticles.length > 0 ? (
          currentArticles.map((article, idx) => (
            <NewsCard
              key={idx}
              image={article.urlToImage}
              title={article.title}
              description={article.description}
              url={article.url}
            />
          ))
        ) : (
          <p className="text-white text-lg">No Article Found</p>
        )}
      </div>

      {/* <NewsCard
        image="https://images.pexels.com/photos/31376810/pexels-photo-31376810.jpeg"
        title="Breaking News!"
        description="This is a short preview of the news content. Click below to read the full article."
        url="https://example.com/full-news"
      /> */}

      {/* pagination */}
      {articles.length > 0 && (
        <div className="flex justify-center items-center mt-6 space-x-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="text-white font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
