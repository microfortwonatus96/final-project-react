import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, API_KEY } from "../../Environment";
import "../Home/Home.css";
import { Link } from "react-router-dom";
import imgMcd from '../../img/mcd.jpg'

export const Foods = () => {
    const [AllFoods, setAllFoods] = useState([]);
  const [nameEdit, setNameEdit] = useState("");
  const [descriptionEdit, setDescriptionEdit] = useState("");
  const [imageUrlEdit, setimageUrlEdit] = useState("");
  const [ingredientsEdit, setingredientsEdit] = useState([]);

  const handleNameEdit = (event) => {
    console.log(event.target.value);
    setNameEdit(event.target.value);
  };
  const handleDescriptionEdit = (event) => {
    console.log(event.target.value);
    setDescriptionEdit(event.target.value);
  };

  const handleImageUrlEdit = (event) => {
    console.log(event.target.value);
    setimageUrlEdit(event.target.value);
  };

  const handleChangeIngredients = (index, value) => {
    const values = [...ingredientsEdit];
    values[index] = value;
    setingredientsEdit(values);
  };

  const handleAddIngredients = () => {
    setingredientsEdit([...ingredientsEdit, ""]);
  };

  const handleDeleteIngredients = (index) => {
    const values = [...ingredientsEdit];
    values.splice(index, 1);
    setingredientsEdit(values);
  };

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

  const handleDelete = (id) => {
    if (window.confirm("are you sure you want to delete?")) {
      axios({
        method: "delete",
        url: `${BASE_URL}/api/v1/delete-food/${id}`,
        headers: {
          apiKey: `${API_KEY}`,
          Authorization: `Bearer ${localStorage.getItem(`token`)}`,
        },
      })
        .then((response) => {
          console.log("cek del:", response);
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleEdit = (id) => {
    if (window.confirm("are you sure you want to edit?")) {
      axios({
        method: "post",
        url: `${BASE_URL}/api/v1/update-food/${id}`,
        data: {
          name: nameEdit,
          description: descriptionEdit,
          imageUrl: imageUrlEdit,
          ingredients: ingredientsEdit,
        },
        headers: {
          apiKey: `${API_KEY}`,
          Authorization: `Bearer ${localStorage.getItem(`token`)}`,
        },
      })
        .then((response) => {
          console.log(response);
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  return (
    <>
    <div className=" bg-food" style={{paddingTop: '140px'}}>
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
                          <h3>{foods.name}</h3>
                          <h3>{foods.ingredients}</h3>
                          <div className="d-flex justify-content-center gap-2">
                            <i class="bi bi-star"></i>
                            <p>{foods.rating}</p>
                            <i
                              className="bi bi-heart"
                              onClick={() =>
                                handleLikes(foods.id, foods.isLike)
                              }
                              style={{
                                backgroundColor: `${foods.isLike ? "red" : ""}`,
                              }}
                            ></i>
                            {foods.totalLikes}
                          </div>
                          {/* <p>isLike: {foods.isLike}</p> */}
                          <div className="d-flex justify-content-center gap-2">
                            <div>
                              <Link
                                onClick={() => handleDelete(foods.id)}
                                className="btn btn-danger"
                                style={{ fontSize: "0.75rem" }}
                              >
                                Delete
                              </Link>
                            </div>
                            <div key={foods.id}>
                              <Link
                                className="btn-detail"
                                to={`/detail-foods/${foods.id}`}
                              >
                                Detail
                              </Link>
                            </div>
                            <div>
                              <Link
                                className="btn btn-success"
                                style={{ fontSize: "0.75rem" }}
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                              >
                                Edit
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* End-Data-All-Foods */}

                    {/* edit  */}
                    <div
                      className="modal fade"
                      id="exampleModal"
                      tabindex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                              Edit Product {AllFoods.id}
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <form
                              className="row g-3"
                              onSubmit={() => handleEdit(AllFoods.id)}
                            >
                              <div className="col-md-6">
                                <label for="inputName" className="form-label">
                                  Name
                                </label>
                                <input
                                  width={"100%"}
                                  value={nameEdit}
                                  onChange={handleNameEdit}
                                  type="text"
                                  className="form-control"
                                  id="inputName"
                                />
                              </div>
                              <div className="col-md-6">
                                <label
                                  for="inputDescription"
                                  className="form-label"
                                >
                                  Description
                                </label>
                                <input
                                  width={"100%"}
                                  value={descriptionEdit}
                                  onChange={handleDescriptionEdit}
                                  type="text"
                                  className="form-control"
                                  id="inputDescription"
                                />
                              </div>
                              <div className="col-md-6">
                                <label
                                  for="inputDescription"
                                  className="form-label"
                                >
                                  Image Url
                                </label>
                                <input
                                  width={"100%"}
                                  value={imageUrlEdit}
                                  onChange={handleImageUrlEdit}
                                  type="url"
                                  className="form-control"
                                  id="inputImgUrl"
                                />
                              </div>

                              {ingredientsEdit.map((ingredient, index) => {
                                return (
                                  <div class="d-flex" key={ingredient}>
                                    <input
                                      id="ingredients"
                                      name="ingredients"
                                      type="text"
                                      placeholder="ingredients"
                                      value={ingredient}
                                      onChange={(event) =>
                                        handleChangeIngredients(
                                          index,
                                          event.target.value
                                        )
                                      }
                                    />
                                    <button
                                      type="button"
                                      className="btn btn-primary"
                                      onClick={() => handleAddIngredients()}
                                    >
                                      Add
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-danger"
                                      onClick={() =>
                                        handleDeleteIngredients(index)
                                      }
                                    >
                                      Delete
                                    </button>
                                  </div>
                                );
                              })}

                              <div className="col-12">
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                >
                                  Submit
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* end-edit  */}
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </>
  )
}
