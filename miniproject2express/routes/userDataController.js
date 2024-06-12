const axios = require("axios");
// for getting random ids
const { v4: uuidv4 } = require("uuid");

// -----------------------allUsers array-----------------------

// array for storing all users external from api and created users
let allUsers = [];

// -----------------------fetchExternalUsers function-----------------------

// fetch external users from api
const fetchExternalUsers = async () => {
  try {
    // axios store users in response variable
    const response = await axios.get("http://dummyjson.com/users?limit=5");

    // create copy of allUsers and the users from api and add to the all users
    allUsers = [...allUsers, ...response.data.users];

    // check for errors
  } catch (error) {
    console.error("error fetching external users", error);
  }
};

// -----------------------Call fetchExternalUsers-----------------------

// get users from api when express server starts
fetchExternalUsers();

// -----------------------getUsers function-----------------------

// get user function
const getUsers = async (req, res) => {
  try {
    // send response so when calling get users it gets the users from the allUsers array names users:
    res.json({ users: allUsers });

    // check for errors
  } catch (error) {
    console.error(error);
    res.status(500).send(`An error occurred: ${error.message}`);
  }
};

// -----------------------getUserById function-----------------------

// get user by ID
const getUserById = async (req, res) => {
  // get id from frount end and store in variable userId
  const userId = req.params.userId;
  console.log(`Received UserId ${userId}`);

  //   find id if allUsers array matching userId
  const user = allUsers.find((user) => user.id === parseInt(userId, 10));

  // send error if no user is found
  if (!user) {
    return res.status(404).json({ result: `User ${userId} not found` });
  }

  // send response with the user info that has the id found display result: user
  res.status(200).json({ result: user });
};

// -----------------------addUser function-----------------------

// add a user
const addUser = (req, res) => {
  // deconstruct request body to get values from the form
  const { firstName, lastName, email, image, phone } = req.body;

  //   check if required fields exist
  if (!firstName || !lastName || !email) {
    // if any field above do not exist then return 404 error with error message feilds requiled
    return res.status(400).json({ error: "These fields are required" });
  }

  //   create new user with data from req body and add id using uuidv4
  const newUser = {
    id: parseInt(uuidv4().split("-")[0], 16), // the 16 convert the sting from hex to decimal
    firstName,
    lastName,
    email,
    image,
    phone,
  };

  //   push the newely created user from newUser to allUsers array
  allUsers.push(newUser);
  // send response of the newUser
  res.status(200).json(newUser);
  console.log(allUsers);
};

// -----------------------deleteUser function-----------------------

// delete users
const deleteUser = (req, res) => {
  // find id of requested user and set to userId
  const userId = req.params.userId;
  console.log(`Received UserId ${userId}`);

  // Find the index of the user in the array
  const userIndex = allUsers.findIndex(
    (user) => user.id === parseInt(userId, 10) // the 10 part keeps the number as a decimal number
  );

  // if the user id found (userIndex) is not equl to -1
  if (userIndex !== -1) {
    // Remove the user from the allUsers array using splice
    allUsers.splice(userIndex, 1);
    console.log(`User ${userId} deleted. Users array:`, allUsers);
    // send confirmation message of user deletion
    res.status(200).json({ message: `User ${userId} deleted` });

    // if user id (userIndex) is equal to -1
  } else {
    console.error(`User ${userId} not found`);
    // If the user is not found, return a 404 status code and an error message
    res.status(404).json({ message: `User ${userId} not found` });
  }
};

// -----------------------updateUser function-----------------------

// update user
const updateUser = async (req, res) => {
  // Extract userId, firstName, lastName, image, and phone from request body
  const userId = req.params.userId;
  // desconstuct request body
  const { firstName, lastName, email, image, phone } = req.body;

  console.log("Raw request body:", req.body);

  // Find the index / id of the user in the allUsers array
  const userIndex = allUsers.findIndex(
    (user) => user.id === parseInt(userId, 10)
  );

  // If the user is found meaning not equal to -1, update their information in allUsers array
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
