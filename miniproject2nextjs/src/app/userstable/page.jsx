"use client";
import AddUserModal from "@/components/AddUserModal";
import CheckboxListSecondary from "@/components/UserList";
import { useEffect, useState } from "react";
import { UserDiv, UserList } from "../../../themes/makingStyles";
import EnhancedTable from "@/components/UserTable";

export default function Users() {
  // set states for users from api
  const [users, setUsers] = useState([]);

  // use effect to fetch data from backend
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

  // handle adding users passed to AddUserModal
  const handleUserAdded = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  // handle delete users passed to UserList
  const handleDeleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  // users page
  return (
    <div style={UserDiv}>
      <h1>Users</h1>
      {/* display AddUserModal button and pass prop handleUserAdded  */}
      <AddUserModal onUserAdded={handleUserAdded} />

      <EnhancedTable users={users} onDeleteUser={handleDeleteUser} />
    </div>
  );
}
