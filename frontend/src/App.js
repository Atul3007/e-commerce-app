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
import CreateProduct from "./pages/admin/CreateProduct";
import CreateCategory from "./pages/admin/CreateCategory";
import User from './pages/admin/User';
import Profile from './pages/user/Profile';
import Order from "./pages/user/Order";
import Product from "./pages/admin/Product";

const App = () => {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/forgotpassword" element={<Forgotpass />} />
            <Route path="/dashboard" element={<Private />}>
              <Route path="user" element={<Dashboard />} />
              <Route path="user/profile" element={<Profile />} />
              <Route path="user/order" element={<Order/>} />
            </Route>
            <Route path="/dashboard" element={<Admin />}>
              <Route path="admin" element={<AdminDashboard />}></Route>
              <Route path="admin/create-product" element={<CreateProduct/>}></Route>
              <Route path="admin/create-category" element={<CreateCategory/>}></Route>
              <Route path="admin/user" element={<User/>}></Route>
              <Route path="admin/product" element={<Product/>}></Route>
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
