const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

let allUsers = [];

// function to get users from external API
const fetchExternalUsers = async () => {
  try {
    // axious get data for users from dummyjson and store in variable response
    const response = await axios.get("http://dummyjson.com/users?limit=5");

    // store the user data in the empty array externalUsers
    allUsers = [...allUsers, ...response.data.users];

    // console any errors
  } catch (error) {
    console.error("error fetching external users", error);
  }
};

// on load of express server get get the users from the external api and store in externalUsers array
fetchExternalUsers();

const getUsers = async (req, res) => {
  try {
    res.json({ users: allUsers });
  } catch (error) {
    console.error(error);
    res.status(500).send(`An error occurred: ${error.message}`);
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.userId;
  console.log(`Received UserId ${userId}`);

  // Check in-memory users first
  const user = allUsers.find((user) => user.id === parseInt(userId, 10));

  if (!user) {
    return res.status(404).json({ result: `User ${userId} not found` });
  }

  res.status(200).json({ result: user });
};

const addUser = (req, res) => {
  const { firstName, lastName, image, phone } = req.body;

  if (!firstName || !lastName) {
    return res.status(400).json({ error: "These fields are required" });
  }

  const newUser = {
    id: parseInt(uuidv4().split("-")[0], 16),
    firstName,
    lastName,
    image,
    phone,
  };

  allUsers.push(newUser);
  res.status(200).json(newUser);
  console.log(users);
};

const deleteUser = (req, res) => {
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

module.exports = { getUsers, getUserById, addUser, deleteUser };
