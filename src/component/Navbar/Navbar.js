import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL, API_KEY } from "../../Environment";
import "../Navbar/Navbar.css";

const Navbar = () => {
  const name = localStorage.getItem("name");
  const renderLoginLogout = () => {
    if (localStorage.getItem("token") || localStorage.getItem("Email")) {
      const handleLogout = () => {
        axios({
          method: "get",
          url: `${BASE_URL}/api/v1/logout`,
          headers: {
            apiKey: `${API_KEY}`,
            Authorization: `Bearer ${localStorage.getItem(`token`)}`,
          },
        })
          .then((response) => {
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            localStorage.removeItem("role");
            window.location.href = "/";
          })
          .catch((error) => {
            console.error(error);
          });
      };
      return (
        <>
          <div className="box-nav d-flex justify-content-end">
            <div className="d-flex">
              <li class="nav-item ">
                <Link
                  to="/my-favorite"
                  class="nav-link "
                  style={{ color: "#fff" }}
                >
                  My Favorite
                </Link>
              </li>
              {localStorage.getItem("role") === "admin" ? (
                <li class="nav-item ">
                  <Link to="/foods" class="nav-link" style={{ color: "#fff" }}>
                    Foods
                  </Link>
                </li>
              ) : null}
            </div>

            <div
              class="btn-group"
              style={{ position: "relative", left: "65vw" }}
            >
              <button
                type="button"
                class="btn btn-primary dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {name}
              </button>
              <ul class="dropdown-menu ">
                <li>
                  <Link
                    to="/profile-user"
                    className="nav-link btn-profile"
                    style={{ color: "#000", paddingLeft: "10px" }}
                  >
                    My Profile
                  </Link>
                </li>
                {localStorage.getItem("role") === "admin" ? (
                  <li>
                    <Link
                      to="/all-users"
                      class="nav-link btn-profile"
                      style={{ color: "#000", paddingLeft: "10px" }}
                    >
                      All Users
                    </Link>
                  </li>
                ) : null}
                <li className="nav-item">
                  <Link
                    className="nav-link btn-profile"
                    href="#"
                    onClick={handleLogout}
                    style={{ color: "#000", paddingLeft: "10px" }}
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </>
      );
    }
    return (
      <li className="nav-item">
        <a className="nav-link" href="/Form" style={{ color: "#fff" }}>
          Login
        </a>
      </li>
    );
  };

  return (
    <>
      <nav class="navbar navbar-expand-lg bg-primary navbar-container">
        <div class="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse " id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item ">
                <Link to="/" class="nav-link" style={{ color: "#fff" }}>
                  Home
                </Link>
              </li>
              <li class="nav-item">{renderLoginLogout()}</li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
