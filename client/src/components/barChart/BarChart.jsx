import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const [month, setMonth] = useState(1);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Count of Transactions',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  });
  const [loading, setLoading] = useState(true); // Loading state
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
    const fetchChartData = async () => {
      setLoading(true); // Start loading
      try {
        const monthString = String(month); // Ensure month is passed as string
        const response = await axios.get(`http://localhost:2000/api/transactions/barchart?month=${monthString}`);

        // Check if the response data is valid
        if (response.data && response.data.response) {
          const labels = response.data.response?.map((item) => item.range) || [];
          const data = response.data.response?.map((item) => item.count) || [];

          setChartData({
            labels: labels,
            datasets: [
              {
                label: 'Count of Transactions',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
              },
            ],
          });
        }
      } catch (error) {
        console.error('Error fetching chart data:', error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchChartData();
  }, [month]); // Re-fetch when the month changes

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px', fontSize: '18px' }}>Loading...</div>; // Show loading message
  }

  return (
    <div style={{  margin: '0 auto', padding: '50px', backgroundColor: '#f4f4f9', borderRadius: '10px' }}>
      <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '24px', fontWeight: '600', color: '#333' }}>
          Transactions Count for {new Date(2024, month - 1).toLocaleString('default', { month: 'long' })}
        </h3>
        <select
          onChange={(e) => setMonth(Number(e.target.value))}
          value={month}
          style={{
            padding: '12px 20px',
            fontSize: '16px',
            borderRadius: '8px',
            border: '2px solid #ccc',
            outline: 'none',
            backgroundColor: '#fff',
            transition: 'all 0.3s ease-in-out',
            cursor: 'pointer',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            fontWeight: '500',
          }}
        >
            {optionsArray.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
                ))}
        </select>
      </div>

      {/* Bar Chart */}
      <div style={{ width: '100%' }}>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Transaction Count per Range',
                font: {
                  size: 24,
                  weight: '700',
                },
                color: '#333',
                padding: {
                  top: 20,
                  bottom: 20,
                },
              },
              tooltip: {
                callbacks: {
                  label: function (tooltipItem) {
                    return `Count: ${tooltipItem.raw}`;
                  },
                },
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                titleFont: { weight: 'bold' },
                bodyFont: { size: 14 },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Transaction Range',
                  font: {
                    size: 18,
                    weight: '600',
                  },
                  color: '#333',
                  padding: {
                    top: 20,
                  },
                },
                grid: {
                  borderColor: '#ddd',
                  borderWidth: 1,
                  lineWidth: 0.5,
                },
                ticks: {
                  padding: 12,
                  font: {
                    size: 14,
                  },
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Number of Transactions',
                  font: {
                    size: 18,
                    weight: '600',
                  },
                  color: '#333',
                  padding: {
                    top: 20,
                  },
                },
                grid: {
                  borderColor: '#ddd',
                  lineWidth: 1,
                  tickLength: 5,
                },
                ticks: {
                  padding: 10,
                },
                beginAtZero: true,
              },
            },
            layout: {
              padding: {
                left: 20,
                right: 20,
                top: 30,
                bottom: 30,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default BarChart;
