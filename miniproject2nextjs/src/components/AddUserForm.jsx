import { Button, Card, CardMedia, Container, TextField } from "@mui/material";
import { useUserContext } from "@/context/UserContext";
import { AddUserFormStyle, formEditStyle } from "../../themes/makingStyles";

const { useState } = require("react");

export default function AddUserForm({ closeModal }) {
  const { addUser, defaultImg, handleCloseModal } = useUserContext();
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
    <Container>
      <form onSubmit={handleSubmit}>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image={user.image || defaultImg}
            title={user.firstName}
          />

          {/* Image Choice */}
          <div style={formEditStyle}>
            {/* <label htmlFor="file">
              <h3>Add Image:</h3>
            </label> */}
            <Button
              variant="contained"
              component="label"
              style={{ marginBottom: "10px" }}
            >
              Upload Image
              <input
                type="file"
                accept="image/*"
                name="image"
                id="file"
                onChange={handleImageChange}
                style={
                  (formEditStyle.textMargin,
                  {
                    clip: "rect(0 0 0 0)",
                    clipPath: "inset(50%)",
                    height: 1,
                    overflow: "hidden",
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    whiteSpace: "nowrap",
                    width: 1,
                  })
                }
              />
            </Button>

            {/* First Name */}
            <TextField
              id="fname"
              name="firstName"
              label="First Name:"
              value={user.firstName}
              onChange={handleChange}
              style={formEditStyle.textMargin}
              required
            />

            {/* Last Name */}
            <TextField
              id="lname"
              name="lastName"
              label="Last Name:"
              value={user.lastName}
              onChange={handleChange}
              style={formEditStyle.textMargin}
              required
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
              required
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
            <div style={{ marginTop: "10px" }}>
              <Button
                style={{ height: "30px" }}
                type="submit"
                variant="contained"
              >
                Submit
              </Button>
              <Button
                style={{ height: "30px" }}
                variant="contained"
                size="small"
                onClick={() => handleCloseModal()}
                color="error"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      </form>
    </Container>
  );
}
