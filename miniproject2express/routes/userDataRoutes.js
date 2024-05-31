const express = require("express");
const {
  getUsers,
  getUserById,
  addUser,
  deleteUser,
  updateUser,
} = require("./userDataController");
const router = express.Router();

router.use((req, res, next) => {
  console.log("Request Body:", req.body);
  next();
});

// route get to get users from the allUsers array
router.get("/api/data", getUsers);

// foute get to get a user by there spesific id
router.get("/api/data/:userId", getUserById);

// rout post to add a user to the array
router.post("/api/data", addUser);

// router put to update/ edit a user in the array (not working properly at the moment removed from front end)
router.put("/api/data/:userId", updateUser);

// route delete delete user in array by ID
router.delete("/api/data/:userId", deleteUser);

module.exports = router;
