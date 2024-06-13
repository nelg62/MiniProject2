import * as React from "react";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import { alertStyle } from "../../themes/makingStyles";

// Component for displaying confirmation/notification alerts
export default function SimpleAlert({ message, severity }) {
  return (
    <div style={alertStyle}>
      {/* Display an alert popup with a message and a severity level recieved from props */}
      <Alert icon={<CheckIcon fontSize="inherit" />} severity={severity}>
        {/* Display the message */}
        {message}
      </Alert>
    </div>
  );
}
