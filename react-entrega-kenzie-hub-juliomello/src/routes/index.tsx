import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../Pages/Cadastro/cadastro";
import { Dashboard } from "../Pages/Dashboard";
import { Login } from "../Pages/Login";

export const RoutesMain = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/cadastro" element={<Home />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="*" element={<Navigate to={"/"} />} />
  </Routes>
);
