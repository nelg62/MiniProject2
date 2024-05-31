// UserList.jsx (CheckboxListSecondary)

"use client";
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import { Button, Typography } from "@mui/material";
import { UserStyles } from "../../themes/makingStyles";
import BasicModal from "./Modal";
import AddUserForm from "./AddUserForm";

export default function CheckboxListSecondary({ users, onDeleteUser }) {
  // State to manage checked users
  const [checked, setChecked] = React.useState([]);
  // State to manage modal open/close status
  const [openModal, setOpenModal] = React.useState(false);
  // State to manage the ID of the selected user
  const [selectedUserId, setSelectedUserId] = React.useState(null);
  // State to manage the data of the selected user
  const [selectedUser, setSelectedUser] = React.useState(null);

  // handle toggle of checkbox (not being used at the moment is part of the list component)
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

  //  handle click on list item to open modal
  const handleListItemClick = (userId) => {
    setSelectedUserId(userId);
    setOpenModal(true);
  };

  // handle close of modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUserId(null);
    setSelectedUser(null);
  };

  // handle deleting user
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
      console.log(`User ${userId} deleted successfully`);
      // Call the onDeleteUser function passed from the parent component to update the user list
      onDeleteUser(userId);
    } catch (error) {
      console.error("error deleting user", error);
    }
  };

  return (
    <>
      <List
        dense
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      >
        {users.map((user) => {
          const labelId = `checkbox-list-secondary-label-${user.id}`;
          return (
            <ListItem
              key={user.id}
              secondaryAction={
                <>
                  <Button onClick={() => handleDelete(user.id)}>Delete</Button>
                  <Checkbox
                    edge="end"
                    onChange={handleToggle(user.id)}
                    checked={checked.indexOf(user.id) !== -1}
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </>
              }
              disablePadding
            >
              <ListItemButton onClick={() => handleListItemClick(user.id)}>
                <ListItemAvatar>
                  <Avatar alt={user.firstName} src={user.image} />
                </ListItemAvatar>
                <ListItemText
                  id={labelId}
                  primary={
                    <Typography sx={UserStyles.textColor}>
                      {user.firstName} {user.lastName}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <BasicModal
        open={openModal}
        onClose={handleCloseModal}
        userId={selectedUserId}
        user={selectedUser}
      />
    </>
  );
}
