import React from "react";
import { NavLink, Link } from "react-router-dom";
import { AiFillShop } from "react-icons/ai";
import { useAuth } from "../../context/Auth";
import toast from "react-hot-toast";
import SearchProduct from "../form/SearchProduct";
import useCategory from "../../hooks/useCategory";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const categories = useCategory();

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    alert("Logout Successfully");
    toast.success("Logout Successfull", { autoClose: 5000 });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
              E-Commerce App <AiFillShop />
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <div style={{ marginRight: "90px", width: "700px" }}>
                <SearchProduct />
              </div>
              <li className="nav-item">
                <NavLink to="/" className="nav-link " aria-current="page">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/catrgories"                 
                  data-bs-toggle="dropdown"
                >
                  Category
                </Link>
                <ul className="dropdown-menu">
                <li>
                     <Link className="dropdown-item" to={`/categories`}>
                       All Catetgory
                     </Link>
                   </li>
                  {categories.map((c)=>(
                     <li>
                     <Link className="dropdown-item" to={`/category/${c.slug}`}>
                       {c.name}
                     </Link>
                   </li>
                  ))}
                </ul>
              </li>
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/Register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/Login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === "user" ? "user" : "admin"
                          }`}
                          className="dropdown-item"
                          href="#"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          to="/login"
                          onClick={handleLogout}
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}{" "}
              <li className="nav-item">
                <NavLink to="/Cart" className="nav-link">
                  Cart(0)
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
