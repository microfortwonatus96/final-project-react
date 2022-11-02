import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL, API_KEY} from "../../Environment";


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

        // window.location.reload()
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // const handleDelete = (id) => {
  //   if (window.confirm("are you sure you want to delete?")) {
  //     axios({
  //       method: "post",
  //       //   url: `${URL_TMDB}/list/${id}/remove_item?api_key=${API_KEY}&session_id=${localStorage.getItem(
  //       //   "sessionID"
  //       // )}`,
  //       url: `${URL_TMDB}/list/${id}/remove_item?api_key=${API_KEY}&session_id=${SESSION_ID}`,
  //       data: {
  //         media_id: id,
  //       },
  //     })
  //       .then((response) => {
  //         console.log("test:", response);
  //         window.location.reload();
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }
  // };

  return (
    <>
    <div className="container">
    <div className="img-center">
      <div className="grid-img">
        <div>
          <img
            className="img-all-foods"
            src={AllFoods.imageUrl}
            alt="All Foods"
          />
          <p>id: {AllFoods.id}</p>
          <p>Name: {AllFoods.name}</p>
          <p>Description: {AllFoods.description}</p>
          <p>Ingredients: {AllFoods.ingredients}</p>
          <p>rating: {AllFoods.rating}</p>
          <p>totalLikes: {AllFoods.totalLikes}</p>
          <p>isLike: {AllFoods.isLike}</p> 
        </div>
      </div>
      </div>
    </div>
    </>
  )
};

export default DetailFoods;
