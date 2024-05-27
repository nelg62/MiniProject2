const express = require("express");
const axios = require("axios");
const router = express.Router();

let users = [];

router.get("/api/data", async (req, res) => {
  try {
    const response = await axios.get("http://dummyjson.com/users?limit=5");
    console.log(response.data.users);

    users = response.data.users;
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send(`An error occured ${error}`);
  }
});

router.get("/api/data/:userId", (req, res) => {
  console.log(req.params);
  const userId = req.params.userId;
  console.log(`Received userId: ${userId}`);
  const user = users.find((user) => user.id == userId);
  user
    ? res.status(200).json({ result: user })
    : res.status(404).json({ result: `User ${userId} not found` });
});

module.exports = router;
