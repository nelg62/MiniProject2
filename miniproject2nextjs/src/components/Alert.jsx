import * as React from "react";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import { alertStyle } from "../../themes/makingStyles";

export default function SimpleAlert({ message, severity }) {
  return (
    <div style={alertStyle}>
      <Alert icon={<CheckIcon fontSize="inherit" />} severity={severity}>
        {message}
      </Alert>
    </div>
  );
}
