import "./App.css";
import { Outlet, NavLink } from "react-router";

function App() {
  return (
    <>
      <main className="box-border">
        <nav className="flex flex-row gap-6">
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
