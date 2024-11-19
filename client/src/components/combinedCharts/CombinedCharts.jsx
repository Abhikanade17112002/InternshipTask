import React from 'react'
import TransactionsTable from '../transactionTable/TransactionTable'
import StatisticsTable from '../staticsTable/StatisticTable'
import BarChart from '../barChart/BarChart'
import PieChart from '../pieChart/PieChart'
const CombinedCharts = () => {
  return (
    <div className=' min-h-screen'>
        <div className='grid  gap-4 '>
            <div className='bg-white shadow-lg rounded-lg p-4'>
            <h1 className='text-xl  text-center font-semibold text-gray-800 mb-4'>Transactions Table</h1>
            <TransactionsTable />
            </div>
            <div className='bg-white shadow-lg rounded-lg p-4'>
            <h1 className='text-xl text-center font-semibold text-gray-800 mb-4'>Statistics Table</h1>
            <StatisticsTable />
            </div>
            <div className='bg-white shadow-lg rounded-lg p-4'>
            <h1 className='text-xl  text-center font-semibold text-gray-800 mb-4'>Bar Chart</h1>
            <BarChart />
            </div>
            <div className='bg-white shadow-lg rounded-lg p-4'>
            <h1 className='text-xl  text-center font-semibold text-gray-800 mb-4'>Pie Chart</h1>
            <PieChart />
            </div>
            
            </div>
    </div>
  )
}

export default CombinedCharts
