import { useState, useEffect } from "react";

export const useLoadUsers = (userId?: string) => {
  const [users, setUsers] = useState<any>([]);
  const [error, setError] = useState("");

  async function loadUsers() {
    const base = "http://localhost:3000/api/users";
    const endpoint = `${userId ? base + "/" + userId : base}`;
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
