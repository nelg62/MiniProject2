import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import { Button, Typography } from "@mui/material";
import { useUserContext } from "@/context/UserContext";

// recieve users prop and onDeleteUser from users/page
export default function CheckboxListSecondary() {
  const { users, deleteUser } = useUserContext();
  const [checked, setChecked] = React.useState([1]);

  const userList = users ?? [];

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
    await deleteUser(userId);
  };

  return (
    <List
      dense
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
    >
      {/* mapp users to show data on list */}
      {userList.map((user) => {
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
