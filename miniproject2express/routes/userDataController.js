const axios = require("axios");
// Import uuid for generating random IDs
const { v4: uuidv4 } = require("uuid");

// -----------------------allUsers array-----------------------

// Array for storing all users (both external from API and created users)
let allUsers = [];

// -----------------------fetchExternalUsers function-----------------------

// Fetch external users from API
const fetchExternalUsers = async () => {
  try {
    // Fetch users from external API using axios
    const response = await axios.get("http://dummyjson.com/users?limit=5");

    // Add fetched users to allUsers array
    allUsers = [...allUsers, ...response.data.users];

    // check for errors
  } catch (error) {
    console.error("error fetching external users", error);
  }
};

// -----------------------Call fetchExternalUsers-----------------------

// Fetch users from API when server starts
fetchExternalUsers();

// -----------------------getUsers function-----------------------

// Get all users
const getUsers = async (req, res) => {
  try {
    // Respond with the users from the allUsers array
    res.json({ users: allUsers });

    // check for errors
  } catch (error) {
    console.error(error);
    res.status(500).send(`An error occurred: ${error.message}`);
  }
};

// -----------------------getUserById function-----------------------

// Get user by ID
const getUserById = async (req, res) => {
  // Extract userId from request
  const userId = req.params.userId;
  console.log(`Received UserId ${userId}`);

  // Find the user with matching ID in the allUsers array
  const user = allUsers.find((user) => user.id === parseInt(userId, 10));

  // If user is not found respond with error
  if (!user) {
    return res.status(404).json({ result: `User ${userId} not found` });
  }

  // If user is found respond with the found user
  res.status(200).json({ result: user });
};

// -----------------------addUser function-----------------------

// Add a new user
const addUser = (req, res) => {
  // Deconstruct request body to get user details
  const { firstName, lastName, email, image, phone } = req.body;

  //  Check if required fields exist
  if (!firstName || !lastName || !email) {
    // If required fields are missing respond with error
    return res.status(400).json({ error: "These fields are required" });
  }

  //   Create a new user with a unique ID using uuid4
  const newUser = {
    id: parseInt(uuidv4().split("-")[0], 16), // Convert uuid from hex to decimal
    firstName,
    lastName,
    email,
    image,
    phone,
  };

  //  Add the new user to allUsers array
  allUsers.push(newUser);
  // Respond with newly created user
  res.status(200).json(newUser);
  console.log(allUsers);
};

// -----------------------deleteUser function-----------------------

// Delete a user
const deleteUser = (req, res) => {
  // Extract userId from request
  const userId = req.params.userId;
  console.log(`Received UserId ${userId}`);

  // Find the index of the user with matching ID in allUsers array
  const userIndex = allUsers.findIndex(
    (user) => user.id === parseInt(userId, 10) // the 10 part keeps the number as a decimal number
  );

  // If the user id found (userIndex) is not equl to -1
  if (userIndex !== -1) {
    // Remove the user from the allUsers array using splice
    allUsers.splice(userIndex, 1);
    console.log(`User ${userId} deleted. Users array:`, allUsers);
    // Send confirmation message of user deletion
    res.status(200).json({ message: `User ${userId} deleted` });

    // If user id (userIndex) is equal to -1
  } else {
    console.error(`User ${userId} not found`);
    // If the user is not found, return a 404 status code and an error message
    res.status(404).json({ message: `User ${userId} not found` });
  }
};

// -----------------------updateUser function-----------------------

// Update a user
const updateUser = async (req, res) => {
  // Extract userId from request
  const userId = req.params.userId;
  // Deconstruct request body to get updated user details
  const { firstName, lastName, email, image, phone } = req.body;

  console.log("Raw request body:", req.body);

  // Find the index of the user with matching ID in allUsers array
  const userIndex = allUsers.findIndex(
    (user) => user.id === parseInt(userId, 10)
  );

  // If the user is found update information in allUsers array
  if (userIndex !== -1) {
    allUsers[userIndex] = {
      ...allUsers[userIndex],
      firstName,
      lastName,
      email,
      image,
      phone,
    };
    // Send the updated user information in the response
    res
      .status(200)
      .json({ message: `User ${userId} updated`, user: allUsers[userIndex] });
  } else {
    // If the user is not found, return a 404 status code and an error message
    console.error(`User ${userId} not found`);
    res.status(404).json({ message: `User ${userId} not found` });
  }
};

module.exports = { getUsers, getUserById, addUser, deleteUser, updateUser };
