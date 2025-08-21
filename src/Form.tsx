import { useReducer, useState } from "react";
import "./Form.css";

interface UserItem {
  name: string;
  email: string;
  birthdate: string;
  username: string;
  password: string;
}

const INITIAL_STATE = {
  name: "",
  email: "",
  birthdate: "",
  username: "",
  password: "",
  users: [],
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BIRTHDATE_REGEX = /^\d{2}\/\d{2}\/\d{2}$/;

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_NAME":
      return {
        ...state,
        name: action.payload,
      };
    case "ADD_EMAIL":
      return {
        ...state,
        email: action.payload,
      };
    case "ADD_BIRTHDATE":
      return {
        ...state,
        birthdate: action.payload,
      };
    case "ADD_USERNAME":
      return {
        ...state,
        username: action.payload,
      };
    case "ADD_PASSWORD":
      return {
        ...state,
        password: action.payload,
      };
    case "ADD_USER":
      return {
        ...INITIAL_STATE,
        users: [...state.users, action.payload],
      };
    default:
      return state;
  }
};

export const Form = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [emailError, setEmailError] = useState("");
  const [birthdateError, setBirthdateError] = useState("");

  const checkEmail = (email: string) => {
    return EMAIL_REGEX.test(email);
  };

  const checkBirthDate = (birthdate: string) => {
    return BIRTHDATE_REGEX.test(birthdate);
  };

  const handlerAddUser = () => {
    let hasErrors = false;

    // Validate email
    if (!checkEmail(state.email.trim())) {
      setEmailError("Invalid email format");
      hasErrors = true;
    } else {
      setEmailError("");
    }

    // Validate simple regex for birthdate
    if (!checkBirthDate(state.birthdate.trim())) {
      setBirthdateError("Birthdate format: '00/00/00'");
      hasErrors = true;
    } else {
      setBirthdateError("");
    }

    // Validate the rest of inputs
    if (!state.name.trim() || !state.username.trim() || !state.password.trim())
      hasErrors = true;

    if (hasErrors) return;

    dispatch({
      type: "ADD_USER",
      payload: {
        name: state.name,
        email: state.email,
        birthdate: state.birthdate,
        username: state.username,
        password: state.password,
      },
    });
  };
  return (
    <section className="form-container">
      <div className="inputs-container">
        <h1>User Form</h1>
        <input
          type="text"
          placeholder="Name"
          value={state.name}
          onChange={(e) => {
            dispatch({
              type: "ADD_NAME",
              payload: e.target.value,
            });
          }}
        />
        <div className="inputs-errors-container">
          <input
            type="text"
            placeholder="Email"
            value={state.email}
            onChange={(e) => {
              dispatch({
                type: "ADD_EMAIL",
                payload: e.target.value,
              });
            }}
          />
          {emailError && <span className="error-msg">{emailError}</span>}
        </div>
        <div className="inputs-errors-container">
          <input
            type="text"
            placeholder="BirthDate"
            value={state.birthdate}
            onChange={(e) => {
              dispatch({
                type: "ADD_BIRTHDATE",
                payload: e.target.value,
              });
            }}
          />
          {birthdateError && (
            <span className="error-msg">{birthdateError}</span>
          )}
        </div>
        <input
          type="text"
          placeholder="Username"
          value={state.username}
          onChange={(e) => {
            dispatch({
              type: "ADD_USERNAME",
              payload: e.target.value,
            });
          }}
        />
        <input
          type="text"
          placeholder="Password"
          value={state.password}
          onChange={(e) => {
            dispatch({
              type: "ADD_PASSWORD",
              payload: e.target.value,
            });
          }}
        />
        <button onClick={handlerAddUser}>Add User</button>
      </div>
      <div className="users-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Birth Date</th>
              <th>Username</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {state.users?.map((user: UserItem, i: number) => {
              return (
                <tr key={i}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.birthdate}</td>
                  <td>{user.username}</td>
                  <td>{user.password}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};
