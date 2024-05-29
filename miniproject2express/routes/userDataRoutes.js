const express = require("express");
const axios = require("axios");
const router = express.Router();

// empty array for temp storage of users from dummy Json and from NextJS formdata
let users = [];

// Route to get User data from external api
router.get("/api/data", async (req, res) => {
  try {
    //  use axios to get User data and store in variable response
    const response = await axios.get("http://dummyjson.com/users?limit=5");

    // get the Users from response data and store in the users array as objects
    users = response.data.users;

    //convert users array to json and send info to what is requesting it
    res.json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).send(`An error occured ${error}`);
  }
});

// Route to get data based on user in list clicked then compared the id of user clicked to one in list
router.get("/api/data/:userId", (req, res) => {
  // create userID variable and set it to the request user id
  const userId = req.params.userId;
  console.log(`Received userId: ${userId}`);
  // set a variable user by finding a user with the matching id in the users array
  const user = users.find((user) => user.id == userId);
  // check if user exists and then if they do return user info and if not then return not found
  user
    ? res.status(200).json({ result: user })
    : res.status(404).json({ result: `User ${userId} not found` });
});

// Route for handling post requests retreiving form data from the Users form
router.post("/api/data", (req, res) => {
  // Create a deconstricted objects using the request body for the variables passed through from the form
  const { firstName, lastName, image, phone } = req.body;
  // set they keys and values to match the objects already in the users array
  // also create an ID for the new user
  const newUser = {
    id: users.length + 1,
    firstName: firstName,
    lastName: lastName,
    image: image,
    phone: phone,
  };
  // add the user to the users array buy using push
  users.push(newUser);
  // convert response to json for the newUser for what is requesting it
  res.status(200).json(newUser);
  console.log(users);
});

module.exports = router;
