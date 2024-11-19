import { useState } from 'react'
import './App.css'
import TransactionsTable from './components/transactionTable/TransactionTable'
import StatisticsTable from './components/staticsTable/StatisticTable'
import BarChart from './components/barChart/BarChart'
import PieChart from './components/pieChart/PieChart';
import { Routes , Route } from 'react-router-dom'
import HomePage from './components/Homepage/HomePage'
import { ToastContainer } from 'react-toastify'
import CombinedCharts from './components/combinedCharts/CombinedCharts'


function App() {


  return (
  <div className="max-w-[100vw]">
    <Routes>
      <Route path="/" element={ <HomePage/> } />
      <Route path="/transactions" element={<TransactionsTable />} />
      <Route path="/statistics" element={<StatisticsTable />} />
      <Route path="/barchart" element={<BarChart />} />
      <Route path="/piechart" element={<PieChart />} />
      <Route path="/combined" element={<CombinedCharts />} />
    </Routes>

    
  </div>


  )
}

export default App
