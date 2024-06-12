"use client";
import { useUserContext } from "@/context/UserContext";
import { Button } from "@mui/material";
import Link from "next/link";

// dashboard page
export default function Dashboard() {
  // get context variables and functions
  const { currentUser, handleUpdateUser } = useUserContext();
  return (
    <>
      {/* check if currentUser has an email or not */}
      {!currentUser.email ? (
        // if currentUser has no email show this
        <div className="Dashboard">
          <h1>Dashboard</h1>
          {/* link to login page  */}
          <p>
            Please Login To See More <Link href="/login">Login</Link>.
          </p>
        </div>
      ) : (
        // if currentUser has an email show this
        <div className="Dashboard">
          <h1>Dashboard</h1>
          <h1>Welcome</h1>
          {currentUser.email && <p>Welcome, {currentUser.email}!</p>}
          <Button variant="contained">
            <Link href={"/users"}>Users</Link>
          </Button>
          <Button variant="contained">
            <Link href={"/userstable"}>UsersTable</Link>
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleUpdateUser({})} //function to clear email and logout
          >
            Log Out
          </Button>
        </div>
      )}
    </>
  );
}
