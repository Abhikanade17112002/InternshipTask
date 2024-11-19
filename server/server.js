require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectToDatabase = require("./database/databaseConnection");
const transactionsRouter = require("./routes/transaction.routes");
const path = require("path");
//  App

connectToDatabase()
  .then(() => {
    const app = express();
    const _dirname = path.resolve();

    // Middleware
    app.use(cors({
      origin: "*",
      methods: ["GET", "POST", "PATCH", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Routes
    // app.get("/", (request, response) => {
    //   response.send("Hello World From Task");
    // });
    app.use("/api/transactions", transactionsRouter);

    app.use(express.static(path.join(_dirname, "/client/dist")));
    app.get("*", (request, response) => {
      response.sendFile(path.resolve(_dirname, "client", "dist", "index.html"));
    });

    // Server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server Running on Port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  });
