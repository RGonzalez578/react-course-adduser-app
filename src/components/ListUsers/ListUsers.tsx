import "./ListUsers.css";
import { useNavigate } from "react-router";
import { useLoadUsers } from "../../hooks/useLoadUsers";
import { useState } from "react";

export const ListUsers = () => {
  const { users, error: errorUsers, loadUsers } = useLoadUsers();
  const [error, setError] = useState<any>();
  const navigate = useNavigate();

  const deleteUser = async (id: string) => {
    const endpoint = `http://localhost:3000/api/users/${id}`;
    try {
      const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Error deleting user");
      console.log("User deleted successfully");
      loadUsers();
    } catch (error: any) {
      setError(error);
    }
  };

  return (
    <section className="flex flex-col gap-4 w-full">
      <h1>List of Users</h1>
      <button
        className="w-50"
        onClick={() => {
          navigate("/users/create");
        }}
      >
        Add User
      </button>
      {(users.length <= 0 || errorUsers) && (
        <div>
          <span>No users yet</span>
        </div>
      )}
      {users.length > 0 && (
        <div>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Birth Date</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: any, i: number) => {
                const formattedDate = new Intl.DateTimeFormat("en-US", {
                  dateStyle: "short",
                  timeStyle: "short",
                }).format(new Date(user.dob));
                return (
                  <tr
                    key={i}
                    onClick={() => {
                      navigate(`/users/${user._id}`);
                    }}
                  >
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{formattedDate}</td>
                    <td className="p-3">
                      <button
                        onClick={() => {
                          deleteUser(user._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {error && <span>Error deleting user</span>}
    </section>
  );
};
