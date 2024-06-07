import { Button, TextField } from "@mui/material";
import { useUserContext } from "@/context/UserContext";
import { AddUserFormStyle } from "../../themes/makingStyles";

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
    <div style={AddUserFormStyle}>
      <form onSubmit={handleSubmit}>
        <div>
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
        </div>

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

        <img
          src={user.image || defaultImg}
          alt="Your image here"
          id="outputimg"
          style={AddUserFormStyle.image}
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
        <div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
}
