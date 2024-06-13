import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useUserContext } from "@/context/UserContext";
import { Container } from "@mui/material";
import { theme } from "../../themes/makingStyles";

// MediaCard component to display user information
export default function MediaCard({ user }) {
  const { setIsEditing, setModalOpen, setSelectedUser } = useUserContext();

  // Function to handle closing modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
    setIsEditing(false);
  };

  console.log("user info card", user);

  // Return null if no user is provided
  if (!user) {
    return null;
  }

  console.log("user info card", user);

  // Render the card with user information
  return (
    <Container style={{ backgroundColor: theme.colors.background.lightGray }}>
      <Card sx={{ maxWidth: 345 }}>
        {/* User Image */}
        <CardMedia
          sx={{ height: 140 }}
          image={user.image}
          title={user.firstName}
        />
        <CardContent>
          {/* FullName */}
          <Typography gutterBottom variant="h5" component="div">
            {user.firstName} {user.lastName}
          </Typography>
          {/* Email */}
          <Typography variant="body2" color="text.secondary">
            Email: {user.email}
          </Typography>
          {/* Phone */}
          <Typography variant="body2" color="text.secondary">
            Phone: {user.phone}
          </Typography>
        </CardContent>
        <CardActions
          style={{ marginBottom: "10px" }}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {/* Edit Button */}
          <Button
            style={{ height: "30px" }}
            variant="contained"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
          {/* Cancel Button */}
          <Button
            style={{ height: "30px" }}
            variant="contained"
            size="small"
            onClick={() => handleCloseModal()}
            color="error"
          >
            Cancel
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
}
