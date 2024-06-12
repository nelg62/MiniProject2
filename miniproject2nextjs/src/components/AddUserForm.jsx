import { Button, Card, CardMedia, Container, TextField } from "@mui/material";
import { useUserContext } from "@/context/UserContext";
import { AddUserFormStyle, formEditStyle } from "../../themes/makingStyles";

const { useState } = require("react");

// form for adding new user
export default function AddUserForm({ closeModal }) {
  const { addUser, defaultImg } = useUserContext();

  // create variable object with values to fill for the form data
  const initialUserData = {
    firstName: "",
    lastName: "",
    email: "",
    image: "",
    phone: "",
  };

  // create a user and setUser state and set it to the valuse of the initialUserData
  const [user, setUser] = useState(initialUserData);

  // handel submitting form
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(user);
    // call addUser function from context passing in the user as prop
    await addUser(user);
    // if response is successful setUser state to initialUserData
    setUser(initialUserData);
    // then close modal
    closeModal();
  };

  // handel cahange when selecting / typing in form items
  const handleChange = (event) => {
    // setUser to name:value of the changed item
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  // handle change when changing images in form item
  const handleImageChange = (event) => {
    // get first file if multipe selected and store in file variable
    const file = event.target.files[0];
    // file path reader
    const reader = new FileReader();

    // when the reader has changed the file to a readable url
    reader.onloadend = () => {
      // setUser  to copy of user and the values image: reader.result
      setUser({ ...user, image: reader.result });
    };

    // if the file exists
    if (file) {
      // read the file path and change to a readable url
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container>
      {/* form on submit handleSubmit */}
      <form onSubmit={handleSubmit}>
        <Card sx={{ maxWidth: 345 }}>
          {/* display image  */}
          <CardMedia
            sx={{ height: 140 }}
            image={user.image || defaultImg}
            title={user.firstName}
          />

          {/* Image Choice */}
          <div style={formEditStyle}>
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

            {/* Phone */}
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
              {/* Submit Button */}
              <Button
                style={{ height: "30px" }}
                type="submit"
                variant="contained"
              >
                Submit
              </Button>

              {/* Cancel Button */}
              <Button
                style={{ height: "30px" }}
                variant="contained"
                size="small"
                onClick={() => closeModal()}
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
