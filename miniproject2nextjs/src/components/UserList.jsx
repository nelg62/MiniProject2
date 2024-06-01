import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import { Button, Typography } from "@mui/material";

// recieve users prop and onDeleteUser from users/page
export default function CheckboxListSecondary({ users, onDeleteUser }) {
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  // handle delete user function
  const handleDelete = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:3083/users/api/data/${userId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("failed to delete");
      }
      console.log(`user ${userId} deleted successfully`);
      onDeleteUser(userId);
    } catch (error) {
      console.error("error deleting user", error);
    }
  };

  return (
    <List
      dense
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
    >
      {/* mapp users to show data on list */}
      {users.map((user) => {
        const labelId = `checkbox-list-secondary-label-${user.id}`;
        return (
          <ListItem
            key={user.id}
            secondaryAction={
              <>
                <Button onClick={() => handleDelete(user.id)}>Delete</Button>
              </>
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar alt={user.firstName} src={user.image} />
              </ListItemAvatar>
              <ListItemText
                id={labelId}
                primary={
                  <Typography>
                    {user.firstName} {user.lastName}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
