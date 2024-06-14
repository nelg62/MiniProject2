import { useUserContext } from "@/context/UserContext";
import { Button, CardMedia, Container, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { formEditStyle } from "../../themes/makingStyles";

export default function EditUserForm({ userId }) {
  // Destructure context from UserContext.jsx
  const {
    users,
    setModalOpen,
    setSelectedUser,
    setIsEditing,
    setUsers,
    setAlert,
  } = useUserContext();

  // Function to close modal and reset state
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
    setIsEditing(false);
  };

  // State for managing user data
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    image: "",
    phone: "",
  });

  // Fetch user data based on user id when userId or users change
  useEffect(() => {
    const userData = users.find((user) => user.id === userId);
    if (userData) {
      setUser(userData);
    }
  }, [userId, users]);

  // Handle changes in form fields
  const handleChange = (event) => {
    // Update user fields in state by name:value
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  // Handle image upload and preview
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    // When file reading i complete update user state with image URL
    reader.onloadend = () => {
      setUser({ ...user, image: reader.result });
    };

    // Read file as URL
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Handle form submit  PUT request to backend updateUser
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

        const newUser = await response.json();

        // Update local users state after succesful update
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.id === userId ? newUser.user : user))
        );

        // Show success alert
        setAlert({
          open: true,
          message: "User Updated",
          severity: "success",
        });
      } catch (error) {
        console.error("Error updating user:", error);
        // Show error alert
        setAlert({
          open: true,
          message: "Failed to update user",
          severity: "error",
        });
      } finally {
        // Hide alert after 3 sconds
        setTimeout(() => {
          setAlert({ open: false, message: "", severity: "success" });
        }, 3000);
      }
    };

    // Call updateUser Function and pass user.id and user and props
    await updateUser(user.id, user);
    // Set isEditing to false to exit edit mode
    setIsEditing(false);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Card sx={{ maxWidth: 345 }}>
          {/* Display user image  */}
          <CardMedia
            sx={{ height: 140 }}
            image={user.image}
            title={user.firstName}
          />

          {/* Image upload button */}
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
