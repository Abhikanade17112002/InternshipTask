
import React, { useState, useEffect } from "react";
import axios from "axios";
import debounce from "lodash.debounce";

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_TRANSACTIONS_BASE_URL}/transactions?month=${selectedMonth}&page=${page}&searchText=${searchText}`
      );
      setTransactions(response.data.transactions);
      setTotalPages(Math.ceil(response.data.totalCount / 10)); 
      setError(null); // Clear previous errors
    } catch (err) {
      setError("Failed to fetch transactions. Please try again later.");
      console.error("Error fetching transactions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [selectedMonth, page, searchText]);

  const handleSearchDebounced = debounce((value) => {
    setSearchText(value);
    setPage(1);
  }, 300);

  const handleSearch = (e) => {
    handleSearchDebounced(e.target.value);
  };

  return (
    <div className="min-h-screen px-16 py-20 bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
        Transactions Dashboard
      </h1>

      {/* Filters Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex items-center gap-2 w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search transactions..."
            onChange={handleSearch}
            className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-800 shadow-sm focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
        </div>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
          className="p-3 rounded-lg border border-gray-300 bg-white text-gray-800 shadow-sm focus:ring-2 focus:ring-gray-500 focus:outline-none"
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-red-600 bg-gray-200 p-4 rounded-md text-center mb-4">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && <p className="text-center text-gray-600">Loading...</p>}

      {/* Table Section */}
      {!loading && (
        <div className="overflow-x-auto rounded-lg shadow-md bg-white">
          <table className="min-w-full text-gray-900">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-4 px-6 text-left font-medium">ID</th>
                <th className="py-4 px-6 text-left font-medium">Title</th>
                <th className="py-4 px-6 text-left font-medium">Description</th>
                <th className="py-4 px-6 text-left font-medium">Price</th>
                <th className="py-4 px-6 text-left font-medium">Category</th>
                <th className="py-4 px-6 text-left font-medium">Sold</th>
                <th className="py-4 px-6 text-left font-medium">Image</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((transaction, index) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-gray-300 hover:bg-gray-50"
                  >
                    <td className="py-4 px-6">{index + 1}</td>
                    <td className="py-4 px-6">{transaction.title}</td>
                    <td className="py-4 px-6">{transaction.description}</td>
                    <td className="py-4 px-6 font-medium">
                      ${Number(transaction.price).toLocaleString()}
                    </td>
                    <td className="py-4 px-6">{transaction.category}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          transaction.sold
                            ? "bg-gray-300 text-gray-800"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {transaction.sold ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <img
                        src={transaction.image}
                        alt={`Image for ${transaction.title}`}
                        className="w-12 h-12 rounded-lg shadow-sm"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="py-4 px-6 text-center text-gray-500"
                  >
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Section */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`px-5 py-2 rounded-lg shadow-sm font-semibold ${
            page === 1
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-gray-700 text-white hover:bg-gray-600"
          }`}
        >
          Previous
        </button>
        <span className="text-gray-800">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className={`px-5 py-2 rounded-lg shadow-sm font-semibold ${
            page === totalPages
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-gray-700 text-white hover:bg-gray-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionsTable;
