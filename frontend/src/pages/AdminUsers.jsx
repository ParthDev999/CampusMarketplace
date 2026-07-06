import { useEffect, useState } from "react";
import api from "../api/axios";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("Loading users...");

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(response.data.users);
      setMessage("");
    } catch (error) {
      console.log(error);
      setMessage("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleBlock = async (userId) => {
    try {
      const token = localStorage.getItem("token");

      await api.patch(
        `/admin/users/${userId}/block`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchUsers();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to block user");
    }
  };

  const handleUnblock = async (userId) => {
    try {
      const token = localStorage.getItem("token");

      await api.patch(
        `/admin/users/${userId}/unblock`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchUsers();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to unblock user");
    }
  };

  return (
    <div className="page">
      <h1>Manage Users</h1>

      {message && <p>{message}</p>}

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>College ID</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.collegeId}</td>
                <td>{user.role}</td>
                <td>{user.isBlocked ? "Blocked" : "Active"}</td>
                <td>
                  {user.role === "admin" ? (
                    <span>Admin</span>
                  ) : user.isBlocked ? (
                    <button
                      className="unblock-btn"
                      onClick={() => handleUnblock(user._id)}
                    >
                      Unblock
                    </button>
                  ) : (
                    <button
                      className="block-btn"
                      onClick={() => handleBlock(user._id)}
                    >
                      Block
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUsers;