import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import { useUserContext } from "@/context/UserContext";
import BasicModal from "./Modal";
import DeleteIcon from "@mui/icons-material/Delete";

// Component to display a list of users
export default function CheckboxListSecondary() {
  const {
    users,
    setUserToDelete,
    setModalOpen,
    setDeleteModalOpen,
    setLoading,
    setSelectedUser,
  } = useUserContext();

  // Function to fetch user details from GET route getUserById
  const fetchUserDetails = async (userId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://miniproject2-ergv.onrender.com/users/api/data/${userId}`
      );

      const userData = await response.json();
      setSelectedUser(userData.result);
    } catch (error) {
      console.error("error getting user details", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to confirm delete of a user
  const confirmDeleteUser = (userId) => {
    setUserToDelete(userId);
    setDeleteModalOpen(true);
  };

  // Function to open modal and fetch user data on a clicked list item
  const handleOpenModal = (userId) => {
    setModalOpen(true);
    fetchUserDetails(userId);
  };

  // makes sure the users list is not null
  const userList = users ?? [];

  return (
    <>
      <Box>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <List dense sx={{ width: "100%" }}>
            {/* Map users array and render each user  */}
            {userList.map((user) => {
              const labelId = `checkbox-list-secondary-label-${user.id}`;
              return (
                <ListItem
                  key={user.id}
                  secondaryAction={
                    <>
                      <IconButton onClick={() => confirmDeleteUser(user.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  }
                  // Styling for ListItem
                  sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    borderBottom: "1px solid rgba(224, 224, 224, 1)",
                    borderTop: "1px solid rgba(224, 224, 224, 1)",
                  }}
                  disablePadding
                >
                  {/* ListItemButton to handle clicking on list item */}
                  <ListItemButton onClick={() => handleOpenModal(user.id)}>
                    {/* Displaying user picture */}
                    <ListItemAvatar>
                      <Avatar alt={user.firstName} src={user.image} />
                    </ListItemAvatar>
                    {/* Display user full name */}
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
          {/* Show BasicModal component for when editing */}
          <BasicModal />
        </Paper>
      </Box>
    </>
  );
}
