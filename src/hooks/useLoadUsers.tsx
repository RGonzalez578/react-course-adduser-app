import { useState, useEffect } from "react";

export const useLoadUsers = () => {
  const [users, setUsers] = useState<any>([]);
  const [error, setError] = useState("");

  async function loadUsers() {
    const endpoint = "http://localhost:3000/api/users";
    try {
      const response = await fetch(endpoint, {
        method: "GET",
      });
      const _data = await response.json();
      setUsers(_data);
    } catch (error: any) {
      setError(error);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return { users, error, loadUsers };
};
