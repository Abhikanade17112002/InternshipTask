import React from "react";
import { Link } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const HomePage = () => {
  const initializeDatabase = async () => {
    try {
      const URL = `${import.meta.env.VITE_TRANSACTIONS_BASE_URL}/initialize`;
      const response = await axios.get(URL);
      if (response.data.status === "success") {
        createToast("Database Initialized 😃");
      }
    } catch (error) {
      console.error(error);
      createToast("Error Initializing Database 😞");
    }
  };

  const createToast = (message) => {
    toast(message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  return (
    <div className="w-full h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center">
      <ToastContainer />
      <div className="text-center bg-white shadow-2xl rounded-lg p-8 max-w-lg mx-auto">
        <h1 className="text-4xl font-semibold text-gray-800 mb-6">
          Welcome to the Home Page
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          This is the home page of the project. You can navigate to other pages
          from here.
        </p>

        {/* Toast Button */}
        <button
          onClick={initializeDatabase}
          className="py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out mb-6"
        >
          Initialize Database
        </button>

        {/* Navigation Buttons */}
        <div className="space-y-4">
          <Link
            to="/transactions"
            className="block py-3 px-6 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200 ease-in-out"
          >
            Transactions Table
          </Link>
          <Link
            to="/statistics"
            className="block py-3 px-6 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-200 ease-in-out"
          >
            Statistics Table
          </Link>
           <Link
            to="/piechart"
            className="block py-3 px-6 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200 ease-in-out"

          >
            Piechart
          </Link>
          <Link
            to="/barchart"
            className="block py-3 px-6 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition duration-200 ease-in-out"
          >
            Barchart
          </Link>
          <Link
            to="/combined"
            className="block py-3 px-6 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition duration-200 ease-in-out"
          >
            Combined Charts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
