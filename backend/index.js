const express = require('express');
const connectDB = require('./mongodb/connect');
// const dotenv = require('dotenv');
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8000;
const urlRoutes = require('./routes/urlRoute');

// dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());        // for JSON body
app.use(express.urlencoded({ extended: true })); // for form data

app.use('/', urlRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




