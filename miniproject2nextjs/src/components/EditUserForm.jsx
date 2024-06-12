import { useUserContext } from "@/context/UserContext";
import { Button, CardMedia, Container, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { formEditStyle } from "../../themes/makingStyles";

export default function EditUserForm({ userId, setIsEditing }) {
  // get context from context file
  const { users, updateUser, handleCloseModal } = useUserContext();

  // crete user and setUser state like the initialUserData
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    image: "",
    phone: "",
  });

  // if userId or users change
  useEffect(() => {
    // create variable userData find user with id matching current user.id in userId
    const userData = users.find((user) => user.id === userId);
    // if id is found
    if (userData) {
      // set the userData
      setUser(userData);
    }
  }, [userId, users]);

  // handle change when changing things in form
  const handleChange = (event) => {
    //  use setUser to update copy of user with name:value
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
    <Container>
      <form onSubmit={handleSubmit}>
        <Card sx={{ maxWidth: 345 }}>
          {/* Image Choice */}

          <CardMedia
            sx={{ height: 140 }}
            image={user.image}
            title={user.firstName}
          />
          <div style={formEditStyle}>
            {/* <label htmlFor="file">
              <h3>Change Image:</h3>{" "}
            </label> */}

            <Button
              variant="contained"
              component="label"
              style={{ marginBottom: "10px" }}
            >
              Change Image
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

            {/* <input
              type="file"
              accept="image/*"
              name="image"
              id="file"
              onChange={handleImageChange}
              style={formEditStyle.textMargin}
            /> */}

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
            <div style={{ marginTop: "10px" }}>
              <Button variant="contained" type="submit">
                Submit
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  handleCloseModal();
                }}
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
