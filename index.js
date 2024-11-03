const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import the cors package
const app = express();

// CORS configuration
const whitelist = [
  'http://localhost:3000', // Allow localhost (or adjust to your actual port)
  'https://wingwin211.web.app/', // Allow your production domain
];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Reject the request
    }
  },
  methods: ['GET'], // Allowed methods (you can add more if needed)
};

// Use CORS middleware with the defined options
app.use(cors(corsOptions));

app.get('/proxy', async (req, res) => {
  try {
    const response = await axios.get('https://opentdb.com/api.php?amount=10&category=22&difficulty=easy&type=multiple');
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
});

module.exports = app;
