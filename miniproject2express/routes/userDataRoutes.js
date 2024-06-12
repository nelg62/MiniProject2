const express = require("express");
const {
  getUsers,
  getUserById,
  addUser,
  deleteUser,
  updateUser,
} = require("./userDataController");
const router = express.Router();

// used for testing and chesking that there is a request coming through from the frount end to the backend next moves it to the next function
router.use((req, res, next) => {
  console.log("Request Body:", req.body);
  next();
});

// -----------------------Get Route getUsers-----------------------

// route get to get users data from the allUsers array
router.get("/api/data", getUsers);

// -----------------------Get Route getUserById-----------------------

// route get to get a user by there spesific id
router.get("/api/data/:userId", getUserById);

// -----------------------Post Route addUser-----------------------

// route post to add a user to the array
router.post("/api/data", addUser);

// -----------------------Put Route updateUser-----------------------

// router put to update/ edit a user in the array
router.put("/api/data/:userId", updateUser);

// -----------------------Delete Route deleteUser-----------------------

// route delete delete user in array by ID
router.delete("/api/data/:userId", deleteUser);

module.exports = router;
