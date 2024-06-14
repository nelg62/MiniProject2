import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import EditUserForm from "./EditUserForm";
import { useUserContext } from "@/context/UserContext";
import { theme } from "../../themes/makingStyles";
import MediaCard from "./ViewUserInfoCard";

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

// Component for Basic Modal from MUI
export default function BasicModal() {
  // Destructuere context from UserContext.jsx
  const {
    modalOpen,
    setModalOpen,
    selectedUser,
    isEditing,
    setIsEditing,
    setLoading,
    setSelectedUser,
  } = useUserContext();

  // Function to handle modal close and reset state
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
    setIsEditing(false);
  };

  // Function to fetch user details from GET route getUserById
  const fetchUserDetails = async (userId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3083/users/api/data/${userId}`
      );

      const userData = await response.json();
      setSelectedUser(userData.result);
    } catch (error) {
      console.error("error getting user details", error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect to call Function fetchUserDetails and pass selectedUser.id as prop when modal is open and isEditing is false
  React.useEffect(() => {
    if (modalOpen && selectedUser && !isEditing) {
      fetchUserDetails(selectedUser.id);
    }
  }, [modalOpen, !isEditing]);

  return (
    <div>
      {/* Conditional render to render EditUserForm or MediaCard bassed on the isEditing state being true or false  */}
      {isEditing ? (
        <Modal
          open={modalOpen}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={style}
            style={{ backgroundColor: theme.colors.background.lightGray }}
          >
            <EditUserForm
              userId={selectedUser.id}
              setIsEditing={setIsEditing}
            />
          </Box>
        </Modal>
      ) : (
        <Modal
          open={modalOpen}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={style}
            style={{ backgroundColor: theme.colors.background.lightGray }}
          >
            <MediaCard user={selectedUser} />
          </Box>
        </Modal>
      )}
    </div>
  );
}
