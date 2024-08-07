import { Button, Card, CardMedia, Container, TextField } from "@mui/material";
import { useUserContext } from "@/context/UserContext";
import { formEditStyle } from "../../themes/makingStyles";

const { useState } = require("react");

// Form component for adding a new user
export default function AddUserForm({ closeModal }) {
  const { defaultImg } = useUserContext();

  // initial state for form data
  const initialUserData = {
    firstName: "",
    lastName: "",
    email: "",
    image: "",
    phone: "",
  };

  // State to manage user input from form
  const [user, setUser] = useState(initialUserData);

  // Destructuring context from UserContext.jsx
  const { setAlert, setUsers } = useUserContext();

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(user);

    // addUser function
    const addUser = async (user) => {
      // Clear alert messages if any exist
      setAlert({ open: false, message: "", severity: "success" });

      try {
        // send POST request to backend addUser route to add user
        const response = await fetch(
          "https://miniproject2-ergv.onrender.com/users/api/data",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
          }
        );

        // Change response to JSON and assign to newUser
        const newUser = await response.json();

        // Update the users state in context with new user
        setUsers((prevUsers) => [...prevUsers, newUser]);

        // Display success message alert
        setAlert({
          open: true,
          message: "User added successfully!",
          severity: "success",
        });
      } catch (error) {
        // Log error and display error message alert
        console.error("Error adding user", error);
        setAlert({
          open: true,
          message: "Failed to add user.",
          severity: "error",
        });
      } finally {
        // Hide alert after 3 seconds
        setTimeout(() => {
          setAlert({ open: false, message: "", severity: "success" });
        }, 3000);
      }
    };

    //  Call addUser function and pass user data
    await addUser(user);

    // Reset form fields to initial state
    setUser(initialUserData);

    // Close modal after form submission
    closeModal();
  };

  // Handle input change in form fields
  const handleChange = (event) => {
    // Update user fields in state by name:value
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  // Handle image upload
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

  return (
    <Container>
      {/* addUser form  */}
      <form onSubmit={handleSubmit}>
        <Card sx={{ maxWidth: 345 }}>
          {/* display user image  */}
          <CardMedia
            sx={{ height: 140 }}
            image={user.image || defaultImg}
            title={user.firstName}
          />

          {/* Image upload Button */}
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
