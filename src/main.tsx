import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import App from "./App.tsx";
import { CreateUser } from "./components/CreateUserForm/CreateUser.tsx";
import { ListUsers } from "./components/ListUsers/ListUsers.tsx";
import { UpdateUser } from "./components/UpdateUser/UpdateUser.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/users" element={<ListUsers />} />
          <Route path="/users/create" element={<CreateUser />} />
          <Route path="/users/:id" element={<UpdateUser />} />
        </Route>
      </Routes>
    </StrictMode>
  </BrowserRouter>
);
