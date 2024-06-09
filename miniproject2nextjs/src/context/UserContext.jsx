"use client";
import SimpleAlert from "@/components/Alert";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import * as React from "react";
import { useContext, useState } from "react";

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Alert state
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const defaultImg = "user.png";

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

  const handleUpdateUser = (user) => {
    setCurrentUser(user);
  };

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

  const addUser = async (user) => {
    setAlert({ open: false, message: "", severity: "success" }); // Initialize alert state
    try {
      const response = await fetch("http://localhost:3083/users/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const newUser = await response.json();
        setUsers((prevUsers) => [...prevUsers, newUser]);
        setAlert({
          open: true,
          message: "User added successfully!",
          severity: "success",
        });
      } else {
        console.error("Error adding user:", response.statusText);
        setAlert({
          open: true,
          message: "Failed to add user.",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Error adding user", error);
      setAlert({
        open: true,
        message: "Failed to add user.",
        severity: "error",
      });
    } finally {
      setTimeout(() => {
        setAlert({ open: false, message: "", severity: "success" });
      }, 3000); // Hide the alert after 3 seconds
    }
  };

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
        setAlert({
          open: true,
          message: "user deleted successfully",
          severity: "success",
        });
      } else {
        console.error("Error deleting user:", response.statusText);
        setAlert({
          open: true,
          message: "failed to delete user",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      setAlert({
        open: true,
        message: "failed to delete user",
        severity: "error",
      });
    } finally {
      setTimeout(() => {
        setAlert({ open: false, message: "", severity: "success" });
      }, 3000);
    }
  };

  const confirmDeleteUser = (userId) => {
    setUserToDelete(userId);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (userToDelete) {
      await deleteUser(userToDelete);
      setUserToDelete(null);
      setDeleteModalOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setUserToDelete(null);
    setDeleteModalOpen(false);
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
        setAlert({ open: true, message: "User Updated", severity: "success" });
      } else {
        console.error("Error updating user:", response.statusText);
        setAlert({
          open: true,
          message: "failed to update user",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setTimeout(() => {
        setAlert({ open: false, message: "", severity: "success" });
      }, 3000);
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
        confirmDeleteUser,
      }}
    >
      {children}
      {alert.open && (
        <SimpleAlert message={alert.message} severity={alert.severity} />
      )}
      <DeleteConfirmation
        open={deleteModalOpen}
        handleClose={handleCancelDelete}
        handleConfirm={handleConfirmDelete}
      />
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
