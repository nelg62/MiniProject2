import { Button, TextField } from "@mui/material";
import { useUserContext } from "@/context/UserContext";

const { useState } = require("react");

export default function AddUserForm({ closeModal }) {
  const { addUser } = useUserContext();
  const initialUserData = {
    firstName: "",
    lastName: "",
    image: "",
    phone: "",
  };
  const defaultImg = "user.png";
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
