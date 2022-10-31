import React from "react";
import {Link} from "react-router-dom"
import { useEffect} from 'react'
import axios from "axios";
import { BASE_URL, API_KEY, JWT_TOKEN } from "../../Environment";
import "../Navbar/Navbar.css";

const Navbar = () => {
  // const renderLoginLogout = () => {
  //     const handleLogout = async () => {
  //       try {
  //         await axios({
  //           method: "get",
  //           url: `${BASE_URL}/api/v1/logout`,
  //           headers: {
  //             apiKey: `${API_KEY}`,
  //             Authorization: `Bearer ${JWT_TOKEN}`
  //           },
  //         });
  //       } catch (error) {
  //         console.log(error);
  //       }
  //       window.location.href = "/";
  //     };
  // };

  return (
    <>
      <nav class="navbar navbar-expand-lg bg-dark navbar-container">
        <div class="container-fluid">
        <section class="left d-flex align-items-center">
                    {/* <a class="navbar-brand" href="#">Navbar</a> */}
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse " id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item ">
                                <Link to="/" class="nav-link  text-style-nav" style={{color: '#fff'}}>Home</Link>                      
                            </li>
                            <li class="nav-item ">
                                <Link to="/AddFoods" class="nav-link  text-style-nav" style={{color: '#fff'}}>Add Foods</Link>                      
                            </li>
                            <li class="nav-item">
                              {/* {renderLoginLogout()} */}
                            </li>
                        </ul>
                    </div>
                </section>
                 {/* left-end */}
                
                {/* right */}
                {/* <section class="right">
                    <li class="nav-item d-flex align-items-center" style={{cursor: 'pointer'}}>
                        <a class="nav-link text-style-nav" style={{listStyle: 'none'}}>{renderLoginLogout()}</a>
                    </li>
                </section> */}
                {/* right-end */}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
