import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EditUserForm from "./EditUserForm";
import { Button } from "@mui/material";

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

export default function BasicModal({ open, onClose, userId, user }) {
  const [userData, setUserData] = React.useState(user || {});
  const [loading, setLoading] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);

  // Effect Hook to get user data when the modal is oppened
  React.useEffect(() => {
    let isMounted = true;
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3083/users/api/data/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }
        const userData = await response.json();
        if (isMounted) {
          console.log(userData);
          setUserData(userData.result); // Update to userData.result
        }
      } catch (error) {
        console.error("Error getting user details", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (open && userId) {
      fetchUserDetails();
    }

    return () => {
      isMounted = false;
    };
  }, [open, userId]);

  // funcion for closing modal
  const handleClose = () => {
    onClose();
    setUserData({});
  };

  return (
    <div>
      {isEditing ? (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <EditUserForm userId={userId} />
          </Box>
        </Modal>
      ) : (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography>
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

            <Typography id="modal-modal-title" variant="h6" component="h2">
              {userData
                ? `${userData.firstName} ${userData.lastName}`
                : "Loading..."}
            </Typography>
            {/* <Typography id="modal-modal-description">
            {userData ? `Email: ${userData.email}` : ""}
          </Typography> */}
            <Typography>
              {userData ? `Phone: ${userData.phone}` : ""}
            </Typography>
            <Button onClick={setIsEditing(true)}>Edit</Button>
          </Box>
        </Modal>
      )}
    </div>
  );
}
