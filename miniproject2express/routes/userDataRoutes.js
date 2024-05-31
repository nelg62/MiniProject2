const express = require("express");
const { getUsers, getUserById, addUser } = require("./userDataController");
const router = express.Router();

router.get("/api/data", getUsers);

router.get("/api/data/:userId", getUserById);

router.post("/api/data", addUser);

module.exports = router;
