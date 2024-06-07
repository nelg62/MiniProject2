import { Button, Card, CardMedia, TextField } from "@mui/material";
import { useUserContext } from "@/context/UserContext";
import { AddUserFormStyle, formEditStyle } from "../../themes/makingStyles";

const { useState } = require("react");

export default function AddUserForm({ closeModal }) {
  const { addUser, defaultImg, handleClose } = useUserContext();
  const initialUserData = {
    firstName: "",
    lastName: "",
    email: "",
    image: "",
    phone: "",
  };
  const [user, setUser] = useState(initialUserData);

  // handel submitting form
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(user);
    await addUser(user);
    setUser(initialUserData);
    closeModal();
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
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={user.image || defaultImg}
          title={user.firstName}
        />

        {/* Image Choice */}
        <div style={formEditStyle}>
          <label htmlFor="file">
            <h3>Add Image:</h3>{" "}
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
            style={formEditStyle.textMargin}
          />

          {/* Last Name */}
          <TextField
            id="lname"
            name="lastName"
            label="Last Name:"
            value={user.lastName}
            onChange={handleChange}
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
          </div>
        </div>
      </Card>
    </form>
  );
}
