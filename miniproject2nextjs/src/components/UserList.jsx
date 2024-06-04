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
import BasicModal from "./Modal";
import { UserStyles } from "../../themes/makingStyles";

// recieve users prop and onDeleteUser from users/page
export default function CheckboxListSecondary() {
  const { users, deleteUser } = useUserContext();

  // State to manage modal open/close status
  const [openModal, setOpenModal] = React.useState(false);
  // State to manage the ID of the selected user
  const [selectedUserId, setSelectedUserId] = React.useState(null);
  // State to manage the data of the selected user
  const [selectedUser, setSelectedUser] = React.useState(null);

  const userList = users ?? [];

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

  // handle delete user function
  const handleDelete = async (userId) => {
    await deleteUser(userId);
  };

  return (
    <>
      <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
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
              <ListItemButton onClick={() => handleListItemClick(user.id)}>
                <ListItemAvatar>
                  <Avatar alt={user.firstName} src={user.image} />
                </ListItemAvatar>
                <ListItemText
                  id={labelId}
                  primary={
                    <Typography style={UserStyles.textColor}>
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
