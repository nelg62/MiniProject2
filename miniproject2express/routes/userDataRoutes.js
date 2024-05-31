const express = require("express");
const {
  getUsers,
  getUserById,
  addUser,
  deleteUser,
} = require("./userDataController");
const router = express.Router();

router.get("/api/data", getUsers);

router.get("/api/data/:userId", getUserById);

router.post("/api/data", addUser);

router.delete("/api/data/:userId", deleteUser);

module.exports = router;
