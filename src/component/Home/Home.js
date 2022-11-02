import React from 'react'
import { useEffect, useState} from 'react'
import axios from "axios";
import { BASE_URL, API_KEY} from "../../Environment";
import "../Home/Home.css"
import {Link} from 'react-router-dom'

const Home = () => {
  const [AllFoods, setAllFoods] = useState([]);

  const handleDelete = (id) => {
    if (window.confirm('are you sure you want to delete?')) {
        axios({
        method: 'delete',
        url: `${BASE_URL}/api/v1/delete-food/${id}`,
        headers: {
          apiKey: `${API_KEY}`,
          Authorization: `Bearer ${localStorage.getItem(`token`)}`,
        },
        }).then((response) => {
            console.log("cek del:", response)
            window.location.reload()
        }).catch((error) => {
            console.error(error)
        })
    }   
  }

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
          <div className='box-foods'>
            <div className='box'>
            <img
              className="img-all-foods"
              src={foods.imageUrl}
              alt="All Foods"
            />
            
              <div className='content'>
                <h3>{foods.name}</h3>
                <p>rating: {foods.rating}</p>
                <p>totalLikes: {foods.totalLikes}</p>
                <p>isLike: {foods.isLike}</p>
                <div className='d-flex justify-content-center gap-2'>
                <div>
                  <Link onClick={() => handleDelete(foods.id)} className='btn btn-danger' style={{fontSize: '0.75rem'}}>Delete</Link>
                </div>
                <div  key={foods.id}>      
                  <Link className='btn-detail' to={`/DetailFoods/${foods.id}`}>Detail</Link>
                </div>
                <div>
                  <Link className='btn btn-success' style={{fontSize: '0.75rem'}}>Edit</Link>
                </div>
                </div>
              </div>
            </div>
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