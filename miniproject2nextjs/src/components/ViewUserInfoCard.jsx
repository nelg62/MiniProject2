import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useUserContext } from "@/context/UserContext";

export default function MediaCard({ user }) {
  const { setIsEditing, handleCloseModal } = useUserContext();

  console.log("user info card", user);
  if (!user) {
    return null;
  }

  console.log("user info card", user);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={user.image}
        title={user.firstName}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {user.firstName} {user.lastName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Email: {user.email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Phone: {user.phone}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => setIsEditing(true)}>Edit</Button>
        <Button size="small" onClick={() => handleCloseModal()}>
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
}
