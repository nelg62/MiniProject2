const express = require("express");
const axios = require("axios");
const router = express.Router();

const users = [];

router.get("api/data", async (req, res) => {
  try {
    const response = await axios.get("http://dummyjson.com/users?limit=5");
    console.log(response);
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send(`An error occured ${error}`);
  }
});

module.exports = router;
