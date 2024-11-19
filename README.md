# MERN Stack Coding Challenge

This repository contains a **MERN stack application** that implements backend APIs and a frontend interface to manage and display transaction data. The project includes functionalities such as listing transactions, displaying statistics, generating charts, and searching/filtering data based on various criteria.

---

## Table of Contents

1. [Project Overview](#project-overview)  
2. [Features](#features)  
3. [Technologies Used](#technologies-used)  
4. [Setup and Installation](#setup-and-installation)  
5. [API Endpoints](#api-endpoints)  
6. [Frontend Features](#frontend-features)  
7. [Project Structure](#project-structure)  
8. [Usage](#usage)  
9. [License](#license)  

---

## Project Overview

This project focuses on managing and displaying product transactions fetched from a third-party API. The backend processes the data and provides APIs for statistics, charts, and transaction listing. The frontend consumes these APIs to render data tables, bar charts, and pie charts on a single page.  

**Third-Party API Used**:  
- URL: [https://s3.amazonaws.com/roxiler.com/product_transaction.json](https://s3.amazonaws.com/roxiler.com/product_transaction.json)  
- Request Method: `GET`  
- Response Format: `JSON`

---

## Features

### Backend:
- Fetches data from a third-party API and seeds the database.
- Provides APIs for:
  - Listing transactions with search and pagination.
  - Generating sales statistics.
  - Generating bar and pie charts based on product data.

### Frontend:
- Interactive data table with:
  - Month filter (dropdown).
  - Search box for filtering transactions by title, description, or price.
  - Pagination for navigating transaction records.
- Visualizations:
  - Bar chart (price ranges vs. item counts).
  - Pie chart (categories vs. item counts).
- Responsive design with customizable UI.

---
---

## 📸 App Screenshots

|                     |                     |                     |
|---------------------|---------------------|---------------------|
| ![Screenshot 1](https://github.com/Abhikanade17112002/Synchronous/blob/main/client/src/assets/SynchronousHome.png) | ![Screenshot 2](https://github.com/Abhikanade17112002/Synchronous/blob/main/client/src/assets/SynchronousProfile.png) | ![Screenshot 3](https://github.com/Abhikanade17112002/Synchronous/blob/main/client/src/assets/SynchronousChat.png) |
| ![Screenshot 4](https://github.com/Abhikanade17112002/Synchronous/blob/main/client/src/assets/SignUp.png) | ![Screenshot 5](https://github.com/Abhikanade17112002/Synchronous/blob/main/client/src/assets/SynchronousChat.png) | |



---
## Technologies Used

### **Backend:**
- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for API development.
- **MongoDB**: NoSQL database for storing transaction data.
- **Mongoose**: ODM for MongoDB.
- **Axios**: HTTP client for fetching data.
- **dotenv**: For managing environment variables.
- **Nodemon**: Development tool for live server reloads.

### **Frontend:**
- **React.js**: Frontend framework.
- **Vite**: Development tool for fast builds and hot reloading.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React Router DOM**: Routing library.
- **Chart.js** and **React-Chartjs-2**: Libraries for rendering charts.
- **Axios**: HTTP client for API calls.
- **React Toastify**: Notification library.
- **Lodash.debounce**: Utility for handling search debounce.

---

## Setup and Installation

### Prerequisites
- Node.js and npm installed.
- MongoDB running locally or accessible via URI.

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo.git
   cd your-repo
   ```

2. Setup Backend:
   ```bash
   cd server
   npm install
   npm run dev
   ```

3. Setup Frontend:
   ```bash
   cd client
   npm install
   npm run dev
   ```

4. Access the application:
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:5000`

---

## API Endpoints

### 1. **Initialize Database**
   **URL**: `/api/initialize`  
   **Method**: `GET`  
   **Description**: Fetches data from the third-party API and seeds the database.  

### 2. **List Transactions**
   **URL**: `/api/transactions`  
   **Method**: `GET`  
   **Query Parameters**:
   - `month`: (e.g., `January`, `February`).
   - `search`: Filter transactions by title/description/price.
   - `page`: Pagination page number.
   - `perPage`: Number of transactions per page.  
   **Description**: Lists transactions with optional search and pagination.

### 3. **Transaction Statistics**
   **URL**: `/api/statistics`  
   **Method**: `GET`  
   **Query Parameter**: `month`  
   **Description**: Returns total sale amount, sold items, and unsold items for the selected month.

### 4. **Bar Chart Data**
   **URL**: `/api/bar-chart`  
   **Method**: `GET`  
   **Query Parameter**: `month`  
   **Description**: Returns item counts in specified price ranges for the selected month.

### 5. **Pie Chart Data**
   **URL**: `/api/pie-chart`  
   **Method**: `GET`  
   **Query Parameter**: `month`  
   **Description**: Returns unique categories and item counts for the selected month.

### 6. **Combined Data**
   **URL**: `/api/combined`  
   **Method**: `GET`  
   **Query Parameter**: `month`  
   **Description**: Combines data from statistics, bar chart, and pie chart APIs.

---

## Frontend Features

- **Transactions Table**:
  - Lists transactions for the selected month.
  - Supports search and pagination.
  - Default month: `March`.
- **Statistics Section**:
  - Displays total sale amount, sold items, and unsold items for the selected month.
- **Charts**:
  - Bar Chart: Price ranges vs. item counts.
  - Pie Chart: Categories vs. item counts.

---

## Project Structure

```
project/
│
├── server/
│   ├── server.js          # Main server file
│   ├── routes/            # API routes
│   ├── models/            # Database models
│   ├── controllers/       # API logic
│   ├── utils/             # Helper functions
│   ├── .env               # Environment variables
│
├── client/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── utils/         # Helper functions
│   │   ├── App.js         # Main app entry
│   │
│   ├── public/            # Static assets
│   ├── tailwind.config.js # Tailwind CSS config
│
└── README.md              # Project documentation
```

---

## Usage

1. Launch the server and frontend as described in the [Setup](#setup-and-installation) section.
2. Navigate to the frontend URL (`http://localhost:5173`) to view the dashboard.
3. Use the dropdown, search bar, and pagination controls to interact with the data.

---

## License

This project is licensed under the MIT License. Feel free to use and modify it as per your requirements.

