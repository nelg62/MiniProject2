import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EditUserForm from "./EditUserForm";
import { Button } from "@mui/material";
import { useUserContext } from "@/context/UserContext";
import { UserStyles, theme } from "../../themes/makingStyles";
import MediaCard from "./ViewUserInfoCard";

// default box styling
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

// basic modal function
export default function BasicModal() {
  // get context from UserContext.jsx
  const {
    modalOpen,
    handleCloseModal,
    selectedUser,
    isEditing,
    setIsEditing,
    loading,
    fetchUserDetails,
  } = useUserContext();

  // if modalOpen and isEditing is false
  React.useEffect(() => {
    if (modalOpen && selectedUser && !isEditing) {
      fetchUserDetails(selectedUser.id);
    }
  }, [modalOpen, !isEditing]);

  return (
    <div>
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
