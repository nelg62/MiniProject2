import { Button, TextField } from "@mui/material";

const { useState, useEffect } = require("react");

export default function AddUserForm({ onUserAdded }) {
  const initialUserData = {
    firstName: "",
    lastName: "",
  };
  const [user, setUser] = useState(initialUserData);

  // //{firstName: "firstname"}

  // const updateUser = (newUser) => {
  //   const tempUser = { ...user, ...newUser };
  //   setUser(tempUser);
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(user);

    const response = await fetch("http://localhost:3083/users/api/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      const result = await response.json();
      console.log("user added:", result);
      onUserAdded(result);
    } else {
      console.error("error adding user:", response.statusText);
    }

    setUser(initialUserData);
  };

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  // useEffect(() => {});

  return (
    <form onSubmit={handleSubmit}>
      {/* First Name */}
      <TextField
        id="fname"
        name="firstName"
        label="First Name:"
        value={user.firstName}
        onChange={handleChange}
      />

      {/* Last Name */}
      <TextField
        id="lname"
        name="lastName"
        label="Last Name:"
        value={user.lastName}
        onChange={handleChange}
      />

      <Button type="submit">Submit</Button>
    </form>
  );
}
