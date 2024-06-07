import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EditUserForm from "./EditUserForm";
import { Button } from "@mui/material";
import { useUserContext } from "@/context/UserContext";
import { UserStyles } from "../../themes/makingStyles";
import MediaCard from "./ViewUserInfoCard";

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

export default function BasicModal() {
  const {
    modalOpen,
    handleCloseModal,
    selectedUser,
    isEditing,
    setIsEditing,
    loading,
    fetchUserDetails,
  } = useUserContext();
  // const [userData, setUserData] = React.useState(user || {});
  // const [loading, setLoading] = React.useState(false);
  // const { isEditing, setIsEditing } = useUserContext();

  React.useEffect(() => {
    if (modalOpen && selectedUser && !isEditing) {
      fetchUserDetails(selectedUser.id);
    }
  }, [modalOpen, !isEditing]);

  // // Effect Hook to get user data when the modal is oppened
  // React.useEffect(() => {
  //   let isMounted = true;
  //   const fetchUserDetails = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await fetch(
  //         `http://localhost:3083/users/api/data/${userId}`
  //       );
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch user details");
  //       }
  //       const userData = await response.json();
  //       if (isMounted) {
  //         console.log(userData);
  //         setUserData(userData.result); // Update to userData.result
  //       }
  //     } catch (error) {
  //       console.error("Error getting user details", error);
  //     } finally {
  //       if (isMounted) {
  //         setLoading(false);
  //       }
  //     }
  //   };

  //   if (open && userId && !isEditing) {
  //     fetchUserDetails();
  //   }

  //   return () => {
  //     isMounted = false;
  //   };
  // }, [open, userId, !isEditing]);

  // // funcion for closing modal
  // const handleClose = () => {
  //   onClose();
  //   setUserData({});
  //   setIsEditing(false);
  // };

  return (
    <div>
      {isEditing ? (
        <Modal
          open={modalOpen}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
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
          <Box sx={style}>
            {/* <Typography style={UserStyles.textColor}>
              {userData ? (
                <img
                  src={userData.image}
                  alt={`picture of ${userData.firstName}`}
                  style={{ height: "128px", width: "128px" }}
                />
              ) : (
                ""
              )}
            </Typography>

            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              style={UserStyles.textColor}
            >
              {userData
                ? `Name: ${userData.firstName} ${userData.lastName}`
                : "Loading..."}
            </Typography>
            <Typography
              id="modal-modal-description"
              style={UserStyles.textColor}
            >
              {userData ? `Email: ${userData.email}` : ""}
            </Typography>
            <Typography style={UserStyles.textColor}>
              {userData ? `Phone: ${userData.phone}` : ""}
            </Typography>
            <Button onClick={() => setIsEditing(true)}>Edit</Button> */}
            <MediaCard user={selectedUser} />
          </Box>
        </Modal>
      )}
    </div>
  );
}
