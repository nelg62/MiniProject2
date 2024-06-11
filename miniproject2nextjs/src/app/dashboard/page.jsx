"use client";
import { useUserContext } from "@/context/UserContext";
import { Button } from "@mui/material";
import Link from "next/link";

export default function Dashboard() {
  const { currentUser, handleUpdateUser } = useUserContext();
  return (
    <>
      {!currentUser.email ? (
        <div className="Dashboard">
          <h1>Dashboard</h1>
          <p>
            Please Login To See More <Link href="/login">Login</Link>.
          </p>
        </div>
      ) : (
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
            onClick={() => handleUpdateUser({})}
          >
            Log Out
          </Button>
        </div>
      )}
    </>
  );
}
