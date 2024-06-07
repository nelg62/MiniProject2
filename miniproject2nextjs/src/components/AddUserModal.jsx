import { Box, Button, Modal } from "@mui/material";
import { useState } from "react";
import AddUserForm from "./AddUserForm";
import { BoxStyle } from "../../themes/makingStyles";

export default function AddUserModal({ onUserAdded }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {/* button to open Modal for AddUserForm */}
      <Button onClick={handleOpen}>Add User</Button>
      {/* modal to display the AddUserForm */}
      <Modal open={open} onClose={handleClose}>
        <Box style={BoxStyle}>
          {/* addUserForm passing onUserAdded prop */}
          <AddUserForm closeModal={handleClose}></AddUserForm>
        </Box>
      </Modal>
    </div>
  );
}
