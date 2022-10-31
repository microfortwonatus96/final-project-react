import React from "react";
import {Link} from "react-router-dom"

const Navbar = () => {
  return (
    <>
      <nav class="navbar navbar-expand-lg bg-dark" >
        <div class="container-fluid">
          <a class="navbar-brand" href="#" style={{color: '#fff' }}>
            Navbar
          </a>
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
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0" >
              <li class="nav-item">
                <Link to="/"><a class="nav-link active"  href="#" style={{color: '#fff' }}>
                  Home
                </a></Link>
              </li>
              <li class="nav-item">
                <Link to="/Form"><a class="nav-link" href="#" style={{color: '#fff' }}>
                  Login
                </a></Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
