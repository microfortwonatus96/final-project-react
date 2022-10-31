import React from 'react'
import { useEffect, useState} from 'react'
import axios from "axios";
import { BASE_URL, API_KEY} from "../../Environment";
import "../Home/Home.css"

const Home = () => {
  const [AllFoods, setAllFoods] = useState();

  useEffect(() => {
    axios({
      method: "get",
      url: `${BASE_URL}/api/v1/foods`,
      headers: {
        apiKey: `${API_KEY}`,
        Authorization: `Bearer ${localStorage.getItem(`token`)}`,
      },
    })
      .then((resp) => {
        console.log('cek:', resp);
        setAllFoods(resp.data.data);
      })
      .catch((error) => {
        console.error(error);
        alert('Error, try reloading the page')
      });
  }, []);

  return (
    <>
    <div className="container">
    <div className="img-center">
      <div className="grid-img">
      {AllFoods && AllFoods.map((foods) => {
        return (
          <>
          <div>
            <img
              className="img-all-foods"
              src={foods.imageUrl}
              alt="All Foods"
            />
            <p>id: {foods.id}</p>
            <p>Name: {foods.name}</p>
            <p>Description: {foods.description}</p>
            <p>Ingredients: {foods.ingredients}</p>
            <p>rating: {foods.rating}</p>
            <p>totalLikes: {foods.totalLikes}</p>
            <p>isLike: {foods.isLike}</p>
          </div>
          </>
            );
          })}
      </div>
      </div>
    </div>
    </>
  )
}

export default Home