import "./CreateUser.css";
import { useState } from "react";
import { useNavigate } from "react-router";

export const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const clearState = () => {
    setName("");
    setEmail("");
    setBirthDate("");
    setUsername("");
    setPass("");
  };

  const addUser = async () => {
    const endpoint = "http://localhost:3000/api/users";
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          dob: birthDate,
          username,
          password: pass,
        }),
      });

      if (!response.ok) throw new Error("Create user action went wrong: ");
      console.log("User Created: ", response.body);
      clearState();
      navigate("/users");
    } catch (error: any) {
      console.log("Error creating user: ", error);
      setError(error);
    }
  };

  return (
    <>
      <section className="create-user-section">
        <h1>Create User</h1>
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
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Password"
            value={pass}
            onChange={(e) => {
              setPass(e.target.value);
            }}
          />
          <button onClick={addUser}>Add User</button>
          {error && <span>Error creating user, try again</span>}
        </div>
      </section>
    </>
  );
};
