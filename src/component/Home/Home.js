import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, API_KEY } from "../../Environment";
import "../Home/Home.css";
import { Link } from "react-router-dom";
import imgMcd from "../../img/mcd.jpg";

const Home = () => {
  const [AllFoods, setAllFoods] = useState([]);

  const getAllFoods = () => {
    const headers = localStorage.getItem("token")
      ? {
          apiKey: `${API_KEY}`,
          Authorization: `Bearer ${localStorage.getItem(`token`)}`,
        }
      : { apiKey: `${API_KEY}` };
    axios({
      method: "get",
      url: `${BASE_URL}/api/v1/foods`,
      headers: headers,
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

  const handleLikes = (id, isLike) => {
    if (!isLike) {
      axios({
        method: "post",
        url: `${BASE_URL}/api/v1/like`,
        data: {
          foodId: id,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem(`token`)}`,
          apiKey: `${API_KEY}`,
        },
      })
        .then((response) => {
          console.log(response);
          getAllFoods();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      axios({
        method: "post",
        url: `${BASE_URL}/api/v1/unlike`,
        data: {
          foodId: id,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem(`token`)}`,
          apiKey: `${API_KEY}`,
        },
      })
        .then((response) => {
          console.log(response);
          getAllFoods();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <>
      <div className="home-section">
        <div className="content">
          <h3 style={{ color: "#0d6efd" }}>Welcome To Our Food</h3>
          <p style={{ fontWeight: "bold" }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
          <button className="btn-home">Order Now</button>
        </div>

        <div className="img-home">
          <img src={imgMcd} alt="mcd" />
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
                        <div className="content">
                          <h2 style={{ marginBottom: "30px" }}>{foods.name}</h2>
                          <div className="d-flex justify-content-center gap-2">
                            <i
                              className="fa-solid fa-heart"
                              onClick={() =>
                                handleLikes(foods.id, foods.isLike)
                              }
                              on
                              style={{
                                color: `${foods.isLike ? "red" : ""}`,
                                cursor: "pointer",
                                fontSize: "25px",
                              }}
                            ></i>
                            <p
                              style={{
                                position: "relative",
                                bottom: "2px",
                                fontSize: "20px",
                              }}
                            >
                              {foods.totalLikes}
                            </p>
                            <Link
                              className="d-flex gap-2 set-rating"
                              to={`/rating/${foods.id}`}
                            >
                              <i
                                class="fa-solid fa-star"
                                style={{ color: "#FFD700", fontSize: "25px" }}
                              ></i>
                              <p
                                style={{
                                  position: "relative",
                                  bottom: "2px",
                                  fontSize: "20px",
                                }}
                              >
                                {foods.rating}
                              </p>
                            </Link>
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
