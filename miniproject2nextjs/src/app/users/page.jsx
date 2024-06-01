"use client";
import CheckboxListSecondary from "@/components/UserList";
import { useEffect, useState } from "react";

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

  // handle delete users passed to UserList
  const handleDeleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  // users page
  return (
    <div>
      <h1>Users</h1>
      {/* UserList show users pass users to display */}
      <CheckboxListSecondary users={users} onDeleteUser={handleDeleteUser} />
    </div>
  );
}
