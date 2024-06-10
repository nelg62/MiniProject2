import { Box, Button, Container, Modal, Paper } from "@mui/material";
import { useState } from "react";
import AddUserForm from "./AddUserForm";
import { BoxStyle, theme } from "../../themes/makingStyles";
import { Style } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddUserModal({ onUserAdded }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container>
      {/* button to open Modal for AddUserForm */}

      <Button variant="contained" onClick={handleOpen}>
        Add User
      </Button>

      {/* modal to display the AddUserForm */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={style}
          style={{ backgroundColor: theme.colors.background.lightGray }}
        >
          {/* addUserForm passing onUserAdded prop */}
          <AddUserForm closeModal={handleClose}></AddUserForm>
        </Box>
      </Modal>
    </Container>
  );
}
