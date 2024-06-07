"use client";
import * as React from "react";
import { useContext, useState } from "react";

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  // for logged in user
  const [currentUser, setCurrentUser] = useState({});
  const defaultImg = "user.png";
  const [isEditing, setIsEditing] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchUserDetails = async (userId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3083/users/api/data/${userId}`
      );
      if (!response.ok) {
        throw new Error("failed to fetch user details");
      }
      const userData = await response.json();
      setSelectedUser(userData.result);
    } catch (error) {
      console.error("error getting user details", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (userId) => {
    setModalOpen(true);
    fetchUserDetails(userId);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
    setIsEditing(false);
  };

  // for logged in user
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
        setUsers,
        selectedUser,
        setSelectedUser,
        modalOpen,
        handleOpenModal,
        handleCloseModal,
        loading,
        addUser,
        deleteUser,
        updateUser,
        defaultImg,
        currentUser,
        handleUpdateUser,
        isEditing,
        setIsEditing,
        fetchUserDetails,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
