"use client";
import { createTheme } from "@mui/material";

export const UserStyles = createTheme({
  textColor: {
    color: "black",
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
  color: "black",
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
