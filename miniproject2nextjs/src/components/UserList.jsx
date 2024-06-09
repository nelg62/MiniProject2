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
  const { users, confirmDeleteUser, handleOpenModal } = useUserContext();

  const userList = users ?? [];

  return (
    <>
      <List dense sx={{ width: "100%" }}>
        {/* mapp users to show data on list */}
        {userList.map((user) => {
          const labelId = `checkbox-list-secondary-label-${user.id}`;
          return (
            <ListItem
              key={user.id}
              secondaryAction={
                <>
                  <Button onClick={() => confirmDeleteUser(user.id)}>
                    Delete
                  </Button>
                </>
              }
              disablePadding
            >
              <ListItemButton onClick={() => handleOpenModal(user.id)}>
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
      <BasicModal />
    </>
  );
}
