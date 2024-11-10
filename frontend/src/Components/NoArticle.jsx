import React from "react";
import { useNavigate } from "react-router-dom";


const NoArticlesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
      <div className="flex flex-col items-center bg-white p-10 rounded-lg shadow-lg text-center max-w-lg">
        <i className="fas fa-exclamation-triangle text-red-500 text-6xl mb-4"></i>
        <h1 className="text-2xl font-semibold mb-2">No Articles Found</h1>
        <p className="text-gray-600 mb-6">
          It seems there are no articles available at the moment. Please check back later or explore other sections.
        </p>
        <button
          onClick={() => navigate("/")} // Change this to your main page route if needed
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default NoArticlesPage;
