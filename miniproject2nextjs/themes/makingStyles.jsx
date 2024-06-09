"use client";
import { createTheme } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";

export const UserStyles = createTheme({
  textColor: {
    color: "#6c757d",
    fontSize: "1.2rem",
  },
});

export const UserDiv = createTheme({
  width: "100%",
});

export const BoxStyle = createTheme({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  background: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  color: "#6c757d",
});

export const AddUserFormStyle = createTheme({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "3rem",

  image: {
    marginLeft: "auto",
    marginRight: "auto",
    height: "100px",
    width: "100px",
  },
});

export const formEditStyle = createTheme({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "1rem",

  textMargin: {
    margin: "5px",
  },
});

export const theme = createTheme({
  colors: {
    primary: "#007bff",
    secondary: "#6cb2eb",
    accent: "#fd7e14",
    background: {
      lightGray: "#f8f9fa",
      white: "#ffffff",
    },
    error: "#dc3545",
    confirmation: "#28a745",
    text: {
      darkGray: "#6c757d",
      black: "#000000",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

export const alertStyle = {
  position: "fixed",
  bottom: "16px",
  left: "16px",
  zIndex: "9999",
};
