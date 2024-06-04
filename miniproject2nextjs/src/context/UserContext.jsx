"use client";
import * as React from "react";
import { useContext, useState } from "react";

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const defaultImg = "user.png";

  const handleUpdateUser = (user) => {
    setCurrentUser(user);
  };

  // fetch users from backend
  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3083/users/api/data");
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };
    fetchUsers();
  }, []);

  // adding user
  const addUser = async (user) => {
    try {
      const response = await fetch("http://localhost:3083/users/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const newUser = await response.json();
        setUsers((prevUsers) => [...prevUsers, newUser]);
      } else {
        console.error("Error adding user:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding user", error);
    }
  };

  // delete user
  const deleteUser = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:3083/users/api/data/${userId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      } else {
        console.error("Error deleting user:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const updateUser = async (userId, updatedUser) => {
    try {
      const response = await fetch(
        `http://localhost:3083/users/api/data/${userId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedUser),
        }
      );
      if (response.ok) {
        const newUser = await response.json();
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.id === userId ? newUser.user : user))
        );
      } else {
        console.error("Error updateing user:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
        addUser,
        deleteUser,
        updateUser,
        defaultImg,
        currentUser,
        handleUpdateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
