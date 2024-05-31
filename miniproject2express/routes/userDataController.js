const axios = require("axios");
// for getting random ids
const { v4: uuidv4 } = require("uuid");

// array for storing all users external from api and created users
let allUsers = [];

// fetch external users from api
const fetchExternalUsers = async () => {
  try {
    // axios store users in response variable
    const response = await axios.get("http://dummyjson.com/users?limit=5");

    // create copy of allUsers and the users from api and add the all users
    allUsers = [...allUsers, ...response.data.users];

    // check for errors
  } catch (error) {
    console.error("error fetching external users", error);
  }
};

// gat users from api when express server starts
fetchExternalUsers();

// get user function
const getUsers = async (req, res) => {
  try {
    // send response so when calling get users it gets the users from the allUsers array names users:
    res.json({ users: allUsers });
  } catch (error) {
    console.error(error);
    res.status(500).send(`An error occurred: ${error.message}`);
  }
};

// get user by ID
const getUserById = async (req, res) => {
  // get id from frount end and store in variable userId
  const userId = req.params.userId;
  console.log(`Received UserId ${userId}`);

  //   find id if allUsers array matching userId
  const user = allUsers.find((user) => user.id === parseInt(userId, 10));

  if (!user) {
    return res.status(404).json({ result: `User ${userId} not found` });
  }

  res.status(200).json({ result: user });
};

// add a user
const addUser = (req, res) => {
  // deconstruct request body
  const { firstName, lastName, image, phone } = req.body;

  //   check if required feelds exist
  if (!firstName || !lastName) {
    return res.status(400).json({ error: "These fields are required" });
  }

  //   create new user with data from req body and add id
  const newUser = {
    id: parseInt(uuidv4().split("-")[0], 16),
    firstName,
    lastName,
    image,
    phone,
  };

  //   push to all users array
  allUsers.push(newUser);
  res.status(200).json(newUser);
  console.log(allUsers);
};

// delete users
const deleteUser = (req, res) => {
  // find id of requested user
  const userId = req.params.userId;
  console.log(`Received UserId ${userId}`);

  // Find the index of the user in the array
  const userIndex = allUsers.findIndex(
    (user) => user.id === parseInt(userId, 10)
  );

  if (userIndex !== -1) {
    // Remove the user from the array
    allUsers.splice(userIndex, 1);
    console.log(`User ${userId} deleted. Users array:`, allUsers);
    res.status(200).json({ message: `User ${userId} deleted` });
  } else {
    console.error(`User ${userId} not found`);
    res.status(404).json({ message: `User ${userId} not found` });
  }
};

const updateUser = async (req, res) => {
  // Extract userId, firstName, lastName, image, and phone from request body
  const userId = req.params.userId;
  const { firstName, lastName, image, phone } = req.body;

  console.log("Raw request body:", req.body);

  // Find the index of the user in the array of all users
  const userIndex = allUsers.findIndex(
    (user) => user.id === parseInt(userId, 10)
  );

  // If the user is found, update their information
  if (userIndex !== -1) {
    allUsers[userIndex] = {
      ...allUsers[userIndex],
      firstName,
      lastName,
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
