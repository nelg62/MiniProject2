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
    // create variable updatedUsers then copy ...users and add newusers to the array
    const updatedUsers = [...users, newUser];
    // update state of users to updatedUsers
    setUsers(updatedUsers);
  };

  return (
    <div className="Users">
      <h1>Users</h1>
      <p>
        This Page shows Users <Link href="/">home</Link>.
      </p>
      <ThemeProvider theme={UserStyles}>
        <AddUserModal onUserAdded={handleUserAdded} />
        <CheckboxListSecondary users={users} />
      </ThemeProvider>
    </div>
  );
}
