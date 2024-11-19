import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';


ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChart = () => {
  const [month, setMonth] = useState(1); 
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverOffset: 4,
      },
    ],
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
    const fetchChartData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_TRANSACTIONS_BASE_URL}/piechart?month=${month}`);
        
     
        if (response.data.response.length === 0) {
          setChartData({
            labels: ['No Data Available'],
            datasets: [
              {
                data: [1], 
                backgroundColor: ['#D3D3D3'], 
                hoverOffset: 4,
              },
            ],
          });
          return;
        }

       
        const labels = response.data.response.map((item) => item._id);
        const data = response.data.response.map((item) => item.count);

        
        setChartData({
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
              hoverOffset: 4,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching pie chart data:', error);
        // Handle any error, set empty data as fallback
        setChartData({
          labels: ['Error loading data'],
          datasets: [
            {
              data: [1], 
              backgroundColor: ['#FF6347'], 
              hoverOffset: 4,
            },
          ],
        });
      }
    };

    fetchChartData();
  }, [month]); 

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f4f6f9',
    }}>
      <h3 style={{
        marginBottom: '20px',
        textAlign: 'center',
        fontSize: '36px',
        fontWeight: '700',
        color: '#333',
        marginTop: '10px',
        padding: '10px',
      }}>
        Transaction Distribution 
      </h3>

      
      <div style={{
        marginBottom: '30px',
        width: '300px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          style={{
            padding: '12px',
            fontSize: '18px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            width: '100%',
          }}
        >
            {optionsArray.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
                ))}
        </select>
      </div>

      {/* Pie Chart */}
      <div style={{
        width: '90%',
        maxWidth: '900px',
        height: '70%',
        maxHeight: '600px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Pie
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: `Transaction Distribution by Category (Month: ${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][month - 1]})`,
                font: {
                  size: 26,
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
                    return `${tooltipItem.label}: ${tooltipItem.raw} transactions`;
                  },
                },
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                titleFont: { weight: 'bold' },
                bodyFont: { size: 14 },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default PieChart;
