const express = require('express');
const axios = require('axios');
const app = express();

// CORS configuration
const whitelist = [
  'http://localhost:63947',
  'https://wingwin211.web.app'
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (whitelist.indexOf(origin) !== -1 || !origin) {
    res.setHeader('Access-Control-Allow-Origin', origin); // Allow specific origin
  } else {
    res.setHeader('Access-Control-Allow-Origin', 'null'); // Or deny it
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET'); // Allowed methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allowed headers
  next();
});

app.get('/proxy', async (req, res) => {
  try {
    const response = await axios.get('https://opentdb.com/api.php?amount=5&category=22&difficulty=easy&type=multiple');
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
