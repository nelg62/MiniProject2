const express = require("express");
const {
  getUsers,
  getUserById,
  addUser,
  deleteUser,
  updateUser,
} = require("./userDataController");
const router = express.Router();

// Middleware to log request body for testing and debugging
router.use((req, res, next) => {
  console.log("Request Body:", req.body);
  next();
});

// -----------------------Get Route getUsers-----------------------

// Route to get all users data from the allUsers array
router.get("/api/data", getUsers);

// -----------------------Get Route getUserById-----------------------

// Route to get a user by there spesific id
router.get("/api/data/:userId", getUserById);

// -----------------------Post Route addUser-----------------------

// Route to add a new user to the array
router.post("/api/data", addUser);

// -----------------------Put Route updateUser-----------------------

// Route to update/edit a user in the array
router.put("/api/data/:userId", updateUser);

// -----------------------Delete Route deleteUser-----------------------

// Route to delete a user in array by ID
router.delete("/api/data/:userId", deleteUser);

module.exports = router;
