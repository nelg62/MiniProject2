"use client";
import { useUserContext } from "@/context/UserContext";
import { Button } from "@mui/material";
import Link from "next/link";

// Dashboard page component
export default function Dashboard() {
  // Deconstruct context from UserContext.jsx
  const { currentUser, setCurrentUser } = useUserContext();

  // Function to update currentUser
  const handleUpdateUser = (user) => {
    setCurrentUser(user);
  };
  return (
    <>
      {/* Conditional rendering based on weather currentUser has an email  */}
      {!currentUser.email ? (
        // If currentUser has no email show this
        <div className="Dashboard">
          <h1>Dashboard</h1>
          {/* link With Button to login page  */}
          <p>
            Please Login To See More
            <Button variant="contained" style={{ marginLeft: "5px" }}>
              <Link href="/login">Login</Link>
            </Button>
            .
          </p>
        </div>
      ) : (
        // If currentUser has an email show this
        <div className="Dashboard">
          <h1>Dashboard</h1>
          <h1>Welcome</h1>
          {/* Display welcome message with current users email  */}
          {currentUser.email && <p>Welcome, {currentUser.email}!</p>}
          {/* Navigate Button to UsersList */}
          <Button variant="contained">
            <Link href={"/users"}>Users</Link>
          </Button>
          {/* Navigate Button to UsersTable */}
          <Button variant="contained">
            <Link href={"/userstable"}>UsersTable</Link>
          </Button>
          {/* Buttopn to logout */}
          <Button
            variant="contained"
            color="error"
            onClick={() => handleUpdateUser({})} //function to clear email (currentUser state) and logout
          >
            Log Out
          </Button>
        </div>
      )}
    </>
  );
}
