"use client";
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import { Typography } from "@mui/material";
import { UserStyles } from "../../themes/makingStyles";
import BasicModal from "./Modal";
import AddUserForm from "./AddUserForm";

export default function CheckboxListSecondary({ users }) {
  const [checked, setChecked] = React.useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedUserId, setSelectedUserId] = React.useState(null);

  // React.useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await fetch("http://localhost:3083/users/api/data");
  //       const data = await response.json();
  //       setUsers(data.users);
  //     } catch (error) {
  //       console.error("error findinf users", error);
  //     }
  //   };
  //   fetchUsers();
  // }, []);

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

  const handleListItemClick = (userid) => {
    setSelectedUserId(userid);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUserId(null);
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
                <Checkbox
                  edge="end"
                  onChange={handleToggle(user.id)}
                  checked={checked.indexOf(user.id) !== -1}
                  inputProps={{ "aria-labelledby": labelId }}
                />
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
      {/* <BasicModal
        open={openModal}
        onClose={handleCloseModal}
        userId={selectedUserId}
      /> */}
    </>
  );
}
