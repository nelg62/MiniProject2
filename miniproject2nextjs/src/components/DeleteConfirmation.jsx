import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useUserContext } from "@/context/UserContext";

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

// Modal component for confirming deletion of a user object
export default function DeleteConfirmation({ open }) {
  const {
    setUserToDelete,
    setDeleteModalOpen,
    userToDelete,
    setUsers,
    setAlert,
  } = useUserContext();

  // Function to handle cancellation of user deletion
  const handleCancelDelete = () => {
    setUserToDelete(null); // Clear user to delete
    setDeleteModalOpen(false); // Close delete comfirmation modal
  };

  // Function to handle confirmation of user deletion
  const handleConfirmDelete = async () => {
    if (userToDelete) {
      await deleteUser(userToDelete); // Call delete function if userToDelete is true to delete
      setUserToDelete(null); // Clear user to delete
      setDeleteModalOpen(false); // Close delete confirmation modal
    }
  };

  // Function to delete user from backend using DELETE route deleteUser
  const deleteUser = async (userId) => {
    try {
      const response = await fetch(
        `https://miniproject2-ergv.onrender.com/users/api/data/${userId}`,
        {
          method: "DELETE",
        }
      );

      // Update local users state after succesful deletion
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));

      // Display success alert after delete
      setAlert({
        open: true,
        message: "user deleted successfully",
        severity: "success",
      });
    } catch (error) {
      console.error("Error deleting user:", error);

      // Display error alert if delete fails
      setAlert({
        open: true,
        message: "failed to delete user",
        severity: "error",
      });
    } finally {
      // Hide alert after 3 seconds
      setTimeout(() => {
        setAlert({ open: false, message: "", severity: "success" });
      }, 3000);
    }
  };

  return (
    <Modal
      open={open} //Modal open state from AddUserModal.jsx
      onClose={handleCancelDelete} // Handle modal close
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {/* Modal title */}
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Confirm Deletion
        </Typography>
        {/* Modal content */}
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Are you sure you want to delete this user?
        </Typography>
        {/* Buttons for canceling or confirming delete */}
        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          {/* Cancel Button */}
          <Button
            variant="contained"
            onClick={handleCancelDelete}
            sx={{ mr: 1 }}
          >
            Cancel
          </Button>
          {/* Delete Button */}
          <Button
            variant="contained"
            onClick={handleConfirmDelete}
            color="error"
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
