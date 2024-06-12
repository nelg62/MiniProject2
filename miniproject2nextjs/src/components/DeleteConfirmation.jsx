import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

// default styling for Box
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

// modal for confirming deletion of user object
export default function DeleteConfirmation({
  open,
  handleClose,
  handleConfirm,
}) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Confirm Deletion
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Are you sure you want to delete this user?
        </Typography>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" onClick={handleClose} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleConfirm} color="error">
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
