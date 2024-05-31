"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { UserStyles } from "../../themes/makingStyles";

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

export default function BasicModal({ open, onClose, userId }) {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

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
          setUser(userData.result); // Update to userData.result
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

  const handleClose = () => {
    onClose();
    setUser(null);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={UserStyles.textColor}>
            {user ? (
              <img
                src={user.image}
                alt={`picture of ${user.firstName}`}
                style={{ height: "128px", width: "128px" }}
              ></img>
            ) : (
              ""
            )}
          </Typography>

          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={UserStyles.textColor}
          >
            {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
          </Typography>
          <Typography id="modal-modal-description" sx={UserStyles.textColor}>
            {user ? `Email: ${user.email}` : ""}
          </Typography>
          <Typography sx={UserStyles.textColor}>
            {user ? `Phone: ${user.phone}` : ""}
          </Typography>

          {/* <Typography sx={UserStyles.textColor}>
            {user ? `Works at: ${user.company.name}` : ""}
          </Typography>
          <Typography sx={UserStyles.textColor}>
            {user ? `Job Title: ${user.company.title}` : ""}
          </Typography> */}
        </Box>
      </Modal>
    </div>
  );
}
