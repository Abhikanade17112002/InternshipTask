const axios = require("axios");
const transactionsModel = require("../models/transactions.model");

const initializeDatabase = async (request, response) => {
  try {
    const { data } = await axios.get(process.env.DATA_URL);
    await transactionsModel.deleteMany();
    await transactionsModel.insertMany(data);
    response.status(200).json({
      status: "success",
      message: "Database initialized successfully",
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getTransactions = async (request, response) => {
  const { month, page = 1, perPage = 10, searchText = "" } = request.query;
  console.log(request.query ,"request.query");
  
  const startOfMonth = new Date(`2022-${month}-01`);
  const endOfMonth = new Date(`2022-${month}-31`);

  // const filters = {
  //   dateOfSale: { $gte: startOfMonth, $lte: endOfMonth },
  //   ...(searchText && {
  //     $or: [
  //       { title: { $regex: searchText, $options: "i" } },
  //       { description: { $regex: searchText, $options: "i" } },
  //       { price: { $regex: searchText, $options: "i" } },
  //     ],
  //   }),
  // };
  const filters = {
    dateOfSale: { $gte: startOfMonth, $lte: endOfMonth },
    ...(searchText && {
      $or: [
        { title: { $regex: searchText, $options: "i" } },
        { description: { $regex: searchText, $options: "i" } },
        // Remove regex for price and check if searchText is a valid number
        ...(isNaN(Number(searchText))
          ? []
          : [{ price: Number(searchText) }]),
      ],
    }),
  };
  
  

  const transactions = await transactionsModel
    .find(filters)
    .skip((page - 1) * perPage)
    .limit(Number(perPage));

  const totalCount = await transactionsModel.countDocuments(filters);
  response
    .status(200)
    .json({ transactions: transactions, totalCount: totalCount });
};

const getStatistics = async (request, response) => {
  const { month } = request.query;
  const startOfMonth = new Date(`2022-${month}-01`);
  const endOfMonth = new Date(`2022-${month}-31`);

  const totalSale = await transactionsModel.aggregate([
    {
      $match: {
        dateOfSale: { $gte: startOfMonth, $lte: endOfMonth },
        sold: true,
      },
    },
    { $group: { _id: null, totalSale: { $sum: "$price" } } },
  ]);

  const soldItems = await transactionsModel.countDocuments({
    dateOfSale: { $gte: startOfMonth, $lte: endOfMonth },
    sold: true,
  });

  const unsoldItems = await transactionsModel.countDocuments({
    dateOfSale: { $gte: startOfMonth, $lte: endOfMonth },
    sold: false,
  });

  response
    .status(200)
    .json({
      totalSale: totalSale[0]?.totalSale || 0,
      soldItems: soldItems,
      unsoldItems: unsoldItems,
    });
};

const getBarChart = async (request, response) => {
  const { month } = request.query;
  const startOfMonth = new Date(`2022-${month}-01`);
  const endOfMonth = new Date(`2022-${month}-31`);

  const priceRanges = [
    { range: "0-100", min: 0, max: 100 },
    { range: "101-200", min: 101, max: 200 },
    { range: "201-300", min: 201, max: 300 },
    { range: "301-400", min: 301, max: 400 },
    { range: "901+", min: 901, max: Infinity },
  ];

  const mappedResponse = await Promise.all(
    priceRanges.map(async ({ range, min, max }) => {
      const count = await transactionsModel.countDocuments({
        dateOfSale: { $gte: startOfMonth, $lte: endOfMonth },
        price: { $gte: min, $lte: max },
      });
      return { range, count };
    })
  );

  response.status(200).json({ response: mappedResponse });
};

const getPieChart = async (request,response) => {
  const { month } = request.query;
  const startOfMonth = new Date(`2022-${month}-01`);
  const endOfMonth = new Date(`2022-${month}-31`);

  const categories = await transactionsModel.aggregate([
    { $match: { dateOfSale: { $gte: startOfMonth, $lte: endOfMonth } } },
    { $group: { _id: "$category", count: { $sum: 1 } } },
  ]);

    response.status(200).json({ response: categories });
};


const getCombinedData = async (request,response) => {
    const { month } = request.query;
    const [transactions, statistics, barChart, pieChart] = await Promise.all([
      axios.get(`${process.env.BASE_URL}/transactions/transactions?month=${month}`),
      axios.get(`${process.env.BASE_URL}/transactions/statistics?month=${month}`),
      axios.get(`${process.env.BASE_URL}/transactions/barchart?month=${month}`),
      axios.get(`${process.env.BASE_URL}/transactions/piechart?month=${month}`),
    ]);
    
    response.status(200).json({
      transactions: transactions.data,
      statistics: statistics.data,
      barChart: barChart.data,
      pieChart: pieChart.data,
    });
  };
  

module.exports = {
  initializeDatabase,
  getTransactions,
  getStatistics,
  getBarChart,
  getPieChart,
  getCombinedData
};
