import React from "react";

function NewsCard({ image, title, description, url }) {
  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white">
      {/* Image */}
      <img
        className="w-full h-48 object-cover"
        src={image}
        alt={title}
      />

      {/* Content */}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 text-sm mb-4">
          {description}
        </p>
      </div>

      {/* Button */}
      <div className="px-4 pb-4">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition"
        >
          Show Full News
        </a>
      </div>
    </div>
  );
}

export default NewsCard;
