import "./App.css";
import { Outlet, NavLink } from "react-router";

function App() {
  return (
    <>
      <main>
        <nav>
          <NavLink to={"/users"}>List Users</NavLink>
          <NavLink to={"/users/create"}>Create User</NavLink>
          <NavLink to={"/users/:id"}>Update User</NavLink>
        </nav>
        <Outlet />
      </main>
    </>
  );
}

export default App;
