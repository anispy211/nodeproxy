const express = require("express");
const axios = require("axios");
const app = express();

app.get("/proxy", async (req, res) => {
  try {
    const response = await axios.get("https://opentdb.com/api.php?amount=10&category=22&difficulty=easy&type=multiple");
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));