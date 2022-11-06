import React from "react";
import {Link} from "react-router-dom"
import { useEffect, useState} from 'react'
import axios from "axios";
import { BASE_URL, API_KEY} from "../../Environment";
import "../Navbar/Navbar.css";

const Navbar = () => {

  // const [name, setname] = useState();
  const role = localStorage.getItem('role');

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     const getAccount = async () => {
  //       try {
  //         let response = await axios.get(
  //           `https://api-bootcamp.do.dibimbing.id/api/v1/user`
  //         );
  //         let name = setname(response.data.user.name);
  //         console.log("name:", response)
  //         console.log("namee",name)
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };
  //     getAccount();
  //   }
  // }, []);

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
          }).then((response) => {
              localStorage.removeItem("token");
              localStorage.removeItem("email");
              localStorage.removeItem("role");
              window.location.href = "/";
            }).catch((error) => {
              console.error(error)
          })
      };
      return (
        <>
        <div className="d-flex">
          <li class="nav-item ">
            <Link to="/my-favorite" class="nav-link " style={{color: '#fff'}}>My Favorite</Link>                      
          </li>
          <li class="nav-item ">
            <Link to="/foods" class="nav-link " style={{color: '#fff'}}>Foods</Link>                      
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/add-foods" style={{color: '#fff'}}>
            Add Foods
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#" onClick={handleLogout} style={{color: '#fff'}}>
             Logout 
            </a>
          </li>
          </div>
        </>
      );
    }
    return (
      <li className="nav-item">
        <a className="nav-link" href="/Form" style={{color: '#fff'}}>
          Login
        </a>
      </li>
    );
  };

  const renderName = () => {
  return(
    <>
      <li className="nav-item" style={{listStyle: 'none'}}>  
        <Link style={{color: '#fff', textDecoration: 'none'}}>{role}</Link>
      </li>
    </>
  )
  }

  return (
    <>
      <nav class="navbar navbar-expand-lg bg-primary navbar-container">
        <div class="container-fluid">
        <section class="left d-flex align-items-center">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse " id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item ">
                        <Link to="/" class="nav-link" style={{color: '#fff'}}>Home</Link>                      
                    </li>
                    <li class="nav-item ">
                        <Link class="nav-link " style={{color: '#fff'}}>About</Link>                      
                    </li>
                    
                    <li class="nav-item">
                      {renderLoginLogout()}
                    </li>
                </ul>
                    
            </div>
          </section>
                 {/* left-end */}
                
                {/* right */}
                <section class="right">
                  <li class="nav-item d-flex" style={{textDecoration: 'none'}}>
                    {renderName()}
                  </li>
                </section>
                {/* right-end */}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
