import { useUserContext } from "@/context/UserContext";
import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";

export default function EditUserForm({ userId, setIsEditing }) {
  const { users, updateUser, defaultImg } = useUserContext();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    image: "",
    phone: "",
  });

  useEffect(() => {
    const userData = users.find((user) => user.id === userId);
    if (userData) {
      setUser(userData);
    }
  }, [users]);

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    await updateUser(user.id, user);
    setIsEditing(false);
  };

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

      {/* Email */}
      <TextField
        id="email"
        type="email"
        name="email"
        label="Email:"
        value={user.email}
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
