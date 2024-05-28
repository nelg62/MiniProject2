"use client";
import CheckboxListSecondary from "@/components/UserList";
import Link from "next/link";
import { ThemeProvider } from "@mui/material/styles";
import { UserStyles } from "../../../themes/makingStyles";
import AddUserModal from "@/components/AddUserModal";
import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3083/users/api/data");
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error("Error finding users", error);
      }
    };
    fetchUsers();
  }, []);

  const handleUserAdded = (newUser) => {
    setUsers((user) => [...user], newUser);
  };

  return (
    <div className="Users">
      <h1>Users</h1>
      <p>
        This Page shows Users <Link href="/">home</Link>.
      </p>
      <ThemeProvider theme={UserStyles}>
        <AddUserModal onUserAdded={handleUserAdded}></AddUserModal>
        <CheckboxListSecondary users={users} />
      </ThemeProvider>
    </div>
  );
}
