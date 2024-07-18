import React from "react";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-4">SEARCH PORKEMONS</h1>
          <Link 
            to="/pokelist" 
            className="bg-yellow-400 hover:bg-yellow-300 text-gray-800 font-bold py-3 px-6 rounded-full text-lg transition duration-300"
          >
            Search Porkemons
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;