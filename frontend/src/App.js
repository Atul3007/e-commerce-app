import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import { AuthProvider } from "./context/Auth";
import Dashboard from "./pages/user/Dashboard";
import Private from "./components/routes/Private";
import Forgotpass from "./pages/Auth/Forgotpass";
import Admin from "./components/routes/Admin";
import AdminDashboard from "./pages/admin/AdminDashboard";

const App = () => {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/forgotpassword" element={<Forgotpass />} />
            <Route path="/dashboard" element={<Private />}>
              <Route path="user" element={<Dashboard />} />
            </Route>
            <Route path="/dashboard" element={<Admin />}>
              <Route path="admin" element={<AdminDashboard />}></Route>
            </Route>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<Pagenotfound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
};

export default App;
