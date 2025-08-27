import "./UpdateUser.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";

export const UpdateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const clearState = () => {
    setName("");
    setEmail("");
    setBirthDate("");
  };

  const getUser = async (id: string) => {
    const endpoint = `http://localhost:3000/api/users/${id}`;
    try {
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const _data = await response.json();
      console.log(_data);
      setName(_data.name);
      setEmail(_data.email);
      setBirthDate(_data.dob.split("T")[0]);
    } catch (error: any) {
      setError(error);
    }
  };

  useEffect(() => {
    if (id) getUser(id);
  }, []);

  const updateUser = async () => {
    const endpoint = "http://localhost:3000/api/users";
    try {
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          dob: birthDate,
        }),
      });

      if (!response.ok) throw new Error("Update user action went wrong");
      console.log("User Updated: ", response.body);
      clearState();
      navigate("/users");
    } catch (error: any) {
      console.log("Error updating user: ", error);
      setError(error);
    }
  };

  return (
    <>
      <section className="">
        <h1>Update User</h1>
        <div className="create-user-inputs-container">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="date"
            placeholder="Birth Date"
            value={birthDate}
            onChange={(e) => {
              setBirthDate(e.target.value);
            }}
          />
          <button onClick={updateUser}>Add User</button>
          {error && <span>Error loading user, try again</span>}
        </div>
      </section>
    </>
  );
};
