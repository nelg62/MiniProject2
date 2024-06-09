import { useUserContext } from "@/context/UserContext";
import { Button, CardMedia, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { formEditStyle } from "../../themes/makingStyles";

export default function EditUserForm({ userId, setIsEditing }) {
  const { users, updateUser, defaultImg, handleCloseModal } = useUserContext();
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
  }, [userId, users]);

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
      <Card sx={{ maxWidth: 345 }}>
        {/* Image Choice */}

        <CardMedia
          sx={{ height: 140 }}
          image={user.image}
          title={user.firstName}
        />
        <div style={formEditStyle}>
          <label htmlFor="file">
            <h3>Change Image:</h3>{" "}
          </label>

          <input
            type="file"
            accept="image/*"
            name="image"
            id="file"
            onChange={handleImageChange}
            style={formEditStyle.textMargin}
          />

          {/* First Name */}
          <TextField
            id="fname"
            name="firstName"
            label="First Name:"
            value={user.firstName}
            onChange={handleChange}
            required
            style={formEditStyle.textMargin}
          />

          {/* Last Name */}
          <TextField
            id="lname"
            name="lastName"
            label="Last Name:"
            value={user.lastName}
            onChange={handleChange}
            required
            style={formEditStyle.textMargin}
          />

          {/* Email */}
          <TextField
            id="email"
            type="email"
            name="email"
            label="Email:"
            value={user.email}
            onChange={handleChange}
            style={formEditStyle.textMargin}
          />

          <TextField
            type="number"
            id="phone"
            name="phone"
            label="Phone:"
            value={user.phone}
            onChange={handleChange}
            style={formEditStyle.textMargin}
          />
          <div>
            <Button type="submit">Submit</Button>
            <Button
              onClick={() => {
                handleCloseModal();
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Card>
    </form>
  );
}
