// users/page.jsx

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
        // fetch data from express side and store as variable response
        const response = await fetch("http://localhost:3083/users/api/data");
        // set response to json and store in variable data
        const data = await response.json();

        setUsers(data.users);
      } catch (error) {
        console.error("Error finding users", error);
      }
    };
    fetchUsers();
  }, []);

  // handle adding users from AddUserModal
  const handleUserAdded = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  // handle deleting users sent to UserList
  const handleDeleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  return (
    <div className="Users">
      <h1>Users</h1>
      <p>
        This Page shows Users <Link href="/">home</Link>.
      </p>
      <ThemeProvider theme={UserStyles}>
        <AddUserModal onUserAdded={handleUserAdded} />
        <CheckboxListSecondary users={users} onDeleteUser={handleDeleteUser} />
      </ThemeProvider>
    </div>
  );
}
