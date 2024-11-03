const express = require('express');
const axios = require('axios');
const app = express();

app.get('/proxy', async (req, res) => {
  try {
    const response = await axios.get('https://opentdb.com/api.php?amount=10&category=22&difficulty=easy&type=multiple');
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
});

module.exports = app;
