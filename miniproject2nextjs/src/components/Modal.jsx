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

  React.useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3083/users/api/data/${userId}`
        );
        const userData = await response.json();
        console.log(userData);
        setUser(userData);
      } catch (error) {
        console.error("error gettign user details", error);
      }
    };

    if (open && userId) {
      fetchUserDetails();
    }
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
                src={user.result.image}
                alt={`picture of ${user.result.firstName}`}
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
            {user
              ? `${user.result.firstName} ${user.result.lastName}`
              : "Loading..."}
          </Typography>
          <Typography id="modal-modal-description" sx={UserStyles.textColor}>
            {user ? `Email: ${user.result.email}` : ""}
          </Typography>
          <Typography sx={UserStyles.textColor}>
            {user ? `Phone: ${user.result.phone}` : ""}
          </Typography>

          <Typography sx={UserStyles.textColor}>
            {user ? `Works at: ${user.result.company.name}` : ""}
          </Typography>
          <Typography sx={UserStyles.textColor}>
            {user ? `Job Title: ${user.result.company.title}` : ""}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
