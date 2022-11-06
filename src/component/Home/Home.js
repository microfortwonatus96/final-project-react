import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, API_KEY } from "../../Environment";
import "../Home/Home.css";
import { Link } from "react-router-dom";
import imgMcd from '../../img/mcd.jpg'


const Home = () => {
  const [AllFoods, setAllFoods] = useState([]);

  const getAllFoods = () => {
    const headers = localStorage.getItem('token') ? {
      apiKey: `${API_KEY}`,
      Authorization: `Bearer ${localStorage.getItem(`token`)}`,
    } : {apiKey: `${API_KEY}`}
    axios({
      method: "get",
      url: `${BASE_URL}/api/v1/foods`,
      headers: headers
    })
      .then((resp) => {
        console.log("cek:", resp);
        setAllFoods(resp.data.data);
      })
      .catch((error) => {
        console.error(error);
        alert("Error, try reloading the page");
      });
  };

  useEffect(() => {
    getAllFoods();
  }, []);

  return (
    <>
      <div className="home-section">
        <div className="content">
          <h3>Welcome To Our Food</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
          </p>
          <button className="btn-home">Order Now</button>
        </div>

        <div className="img-home">
          <img src={imgMcd} alt='mcd'/>
        </div>
      </div>

      <div className=" bg-food">
      <h3 className="title-h3">All Foods</h3>
        <div className="img-center">
          <div className="grid-img">
            {AllFoods &&
              AllFoods.map((foods) => {
                return (
                  <>
                    {/* Data-All-Foods */}
                    <div className="box-foods">
                      <div className="box">
                        <img
                          className="img-all-foods"
                          src={foods.imageUrl}
                          alt="All Foods"
                        />
                        <div className="content" >
                          <h2 style={{marginBottom: '30px'}}>{foods.name}</h2>
                          <div className="d-flex justify-content-center gap-2">
                            <i class="bi bi-star"></i>
                            <p>{foods.rating}</p>                   
                          </div>  
                          <div className="d-flex justify-content-center gap-2 mt-2">                
                            <div key={foods.id}>
                              <Link
                                className="btn-detail"
                                to={`/detail-foods/${foods.id}`}
                              >
                                Detail
                              </Link>
                            </div>           
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* End-Data-All-Foods */}
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
