import { useUserContext } from "@/context/UserContext";
import { Button, CardMedia, Container, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { formEditStyle } from "../../themes/makingStyles";

export default function EditUserForm({ userId, setIsEditing }) {
  // get context from context file
  const { users, updateUser, handleCloseModal, setUsers, setAlert } =
    useUserContext();

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

  // handle submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    const updateUser = async (userId, updatedUser) => {
      try {
        const response = await fetch(
          `http://localhost:3083/users/api/data/${userId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedUser),
          }
        );
        if (response.ok) {
          const newUser = await response.json();
          setUsers((prevUsers) =>
            prevUsers.map((user) => (user.id === userId ? newUser.user : user))
          );
          setAlert({
            open: true,
            message: "User Updated",
            severity: "success",
          });
        } else {
          console.error("Error updating user:", response.statusText);
          setAlert({
            open: true,
            message: "failed to update user",
            severity: "error",
          });
        }
      } catch (error) {
        console.error("Error updating user:", error);
      } finally {
        setTimeout(() => {
          setAlert({ open: false, message: "", severity: "success" });
        }, 3000);
      }
    };

    // ucall updateUser function in UserContext.jsx file and pass props user.id and user
    await updateUser(user.id, user);
    // set is editing to false to change modal view
    setIsEditing(false);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Card sx={{ maxWidth: 345 }}>
          {/* display image  */}
          <CardMedia
            sx={{ height: 140 }}
            image={user.image}
            title={user.firstName}
          />

          {/* Image Choice */}
          <div style={formEditStyle}>
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

            {/* Submit Button */}
            <div style={{ marginTop: "10px" }}>
              <Button variant="contained" type="submit">
                Submit
              </Button>

              {/* Cancel Button */}
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
