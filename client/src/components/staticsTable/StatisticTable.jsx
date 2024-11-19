import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StatisticsTable = () => {
  const [month, setMonth] = useState(1); // default to January (month 1)
  const [statistics, setStatistics] = useState({
    totalSale: 0,
    soldItems: 0,
    unsoldItems: 0,
  });


  const optionsArray = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  useEffect(() => {
    // Fetch statistics data from the API whenever the month changes
    const fetchStatistics = async () => {
      try {
        const response = await axios.get(`http://localhost:2000/api/transactions/statistics?month=${month}`);
        
        if (response.data) {
          setStatistics({
            totalSale: response.data.totalSale || 0,
            soldItems: response.data.soldItems || 0,
            unsoldItems: response.data.unsoldItems || 0,
          });
        }
        console.log(response.data, "response.data");
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStatistics();
  }, [month]); // re-fetch when the month changes

  return (
    <div className="h-screen bg-gray-100 py-12 px-6 flex justify-center items-center">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h3 className="text-3xl font-semibold text-gray-800 mb-6">Transaction Statistics</h3>
        
        {/* Dropdown for month selection */}
        <div className="mb-8">
          <label className="block text-gray-700 text-lg font-medium mb-2">Select Month</label>
          <select
            onChange={(e) => setMonth(e.target.value)}
            value={month}
            className="block w-full px-6 py-3 bg-gray-100 text-gray-800 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            {optionsArray.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
                ))}
          </select>
        </div>

        {/* Display the statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-200 p-6 rounded-xl text-center shadow-lg">
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Total Sales</h4>
            <p className="text-3xl text-gray-900 font-bold">{statistics.totalSale.toFixed(3)}</p>
          </div>
          <div className="bg-gray-200 p-6 rounded-xl text-center shadow-lg">
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Sold Items</h4>
            <p className="text-3xl text-gray-900 font-bold">{statistics.soldItems}</p>
          </div>
          <div className="bg-gray-200 p-6 rounded-xl text-center shadow-lg">
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Unsold Items</h4>
            <p className="text-3xl text-gray-900 font-bold">{statistics.unsoldItems}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsTable;
