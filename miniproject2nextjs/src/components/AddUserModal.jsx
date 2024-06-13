import { Box, Button, Container, Modal, Paper } from "@mui/material";
import { useState } from "react";
import AddUserForm from "./AddUserForm";
import { theme } from "../../themes/makingStyles";

// Default styling for the modal box
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

export default function AddUserModal() {
  // State for managing the modal open/close state
  const [open, setOpen] = useState(false);

  // Function to open the modal
  const handleOpen = () => setOpen(true);

  // Function to close the modal
  const handleClose = () => setOpen(false);

  return (
    <Container>
      {/* Button to open modal */}
      <Button variant="contained" onClick={handleOpen}>
        Add User
      </Button>

      {/* Modal Component*/}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={style}
          style={{ backgroundColor: theme.colors.background.lightGray }}
        >
          {/* AddUserForm component */}
          <AddUserForm closeModal={handleClose}></AddUserForm>
        </Box>
      </Modal>
    </Container>
  );
}
