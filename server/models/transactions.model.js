const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      required: true,
    },
    image: { type: String , 
      required: false,
      default: "https://via.placeholder.com/150"
    },
    dateOfSale: { type: Date, default: Date.now }, // Defaults to the current date
    sold: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Adding an index for optimized queries on `category` and `dateOfSale`
transactionSchema.index({ category: 1, dateOfSale: -1 });

const transactionModel = mongoose.model("transaction", transactionSchema);

module.exports = transactionModel;
