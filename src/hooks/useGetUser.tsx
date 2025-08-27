import { useState, useEffect } from "react";

export const useGetUser = (id: string) => {
  const [user, setUser] = useState<any>({});
  const [error, setError] = useState("");

  async function getUser(id: string) {
    if (!id) return;
    try {
      const endpoint = `http://localhost:3000/api/users/${id}`;
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const user = await response.json();
      setUser(user);
    } catch (error: any) {
      setError(error);
    }
  }

  useEffect(() => {
    getUser(id);
  }, []);

  return { user, error, getUser };
};
