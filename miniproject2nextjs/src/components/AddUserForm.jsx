import { Button, TextField } from "@mui/material";

const { useState, useEffect } = require("react");

export default function AddUserForm({ onUserAdded }) {
  const initialUserData = {
    firstName: "",
    lastName: "",
    image: "",
    phone: "",
  };
  const defaultImg = "user.png";
  const [user, setUser] = useState(initialUserData);

  // //{firstName: "firstname"}

  // const updateUser = (newUser) => {
  //   const tempUser = { ...user, ...newUser };
  //   setUser(tempUser);
  // };

  // handel submitting form
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

  // handel cahange when selecting / typing in form items
  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  // handle change when changing images in form item
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setUser({ ...user, image: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
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

      {/* Image Choice */}
      <label htmlFor="outputimg">Image:</label>
      <img
        src={user.image || defaultImg}
        alt="Your image here"
        id="outputimg"
        style={{ height: "100px", width: "100px" }}
      />
      <div>
        <input
          type="file"
          accept="image/*"
          name="image"
          id="file"
          onChange={handleImageChange}
          required
        />
      </div>

      <TextField
        type="number"
        id="phone"
        name="phone"
        label="Phone:"
        value={user.phone}
        onChange={handleChange}
      />

      <Button type="submit">Submit</Button>
    </form>
  );
}
