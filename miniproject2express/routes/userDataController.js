const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

let users = [];

const getUsers = async (req, res) => {
  try {
    const response = await axios.get("http://dummyjson.com/users?limit=5");
    const externalUsers = response.data.users;

    // Combine external users with in-memory users
    const combinedUsers = [...externalUsers, ...users];
    res.json({ users: combinedUsers });
  } catch (error) {
    console.error(error);
    res.status(500).send(`An error occurred: ${error.message}`);
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.userId;
  console.log(`Received UserId ${userId}`);

  // Check in-memory users first
  let user = users.find((user) => user.id === userId);

  if (!user) {
    try {
      // If not found in in-memory users, check external API
      const response = await axios.get(`http://dummyjson.com/users/${userId}`);
      user = response.data;
    } catch (error) {
      console.error(error);
      return res.status(404).json({ result: `User ${userId} not found` });
    }
  }

  res.status(200).json({ result: user });
};

const addUser = (req, res) => {
  const { firstName, lastName, image, phone } = req.body;

  if (!firstName || !lastName) {
    return res.status(400).json({ error: "These fields are required" });
  }

  const newUser = {
    id: uuidv4(),
    firstName,
    lastName,
    image,
    phone,
  };

  users.push(newUser);
  res.status(200).json(newUser);
  console.log(users);
};

module.exports = { getUsers, getUserById, addUser };
