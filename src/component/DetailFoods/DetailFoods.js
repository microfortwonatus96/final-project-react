import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL, API_KEY} from "../../Environment";
import "../DetailFoods/Detail.css";



const DetailFoods = () => {
  const [AllFoods, setAllFoods] = useState('');
  const { id } = useParams();

  useEffect(() => {
    axios({
      method: "get",
      url: `${BASE_URL}/api/v1/foods/${id}`,
      headers: {
        apiKey: `${API_KEY}`,
        Authorization: `Bearer ${localStorage.getItem(`token`)}`,
      },
    })
      .then((response) => {
        console.log("cek:", response);
        console.log("cek1:", response.data.data);
        setAllFoods(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  },);

  return (
    <>
    <div className="box-container">
      <div className="box-detail "> 
        <div>
          <img
            className="img-all-foods"
            src={AllFoods.imageUrl}
            alt="All Foods"
          />
        </div>
        <div className="">
          <p>id: {AllFoods.id}</p>
          <h1>{AllFoods.name}</h1>        
          <p>Ingredients: {AllFoods.ingredients}</p>
          <p>rating: {AllFoods.rating}</p>
          <p>totalLikes: {AllFoods.totalLikes}</p>
          <p>isLike: {AllFoods.isLike}</p>
          <h1>Description</h1>
          <p>{AllFoods.description}</p>
        </div> 
      </div>
    </div>
    </>
  )
};

export default DetailFoods;
