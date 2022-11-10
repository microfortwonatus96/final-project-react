import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, API_KEY } from "../../Environment";
import "../Home/Home.css";
import { Link } from "react-router-dom";
import UploadImage from "../UploadImage/UploadImage";
import * as Yup from "yup";
import { useFormik } from "formik";
import "../Foods/foods.css";

export const Foods = () => {
  const [AllFoods, setAllFoods] = useState([]);
  const [savePicture, setSavePicture] = useState("");
  const [ingredients, setEditIngredients] = useState([""]);

  const handleAddEditIngredients = () => {
    setEditIngredients([...ingredients, ""]);
  };

  const handleRemoveEditIngredients = (index) => {
    const values = [...ingredients];
    setEditIngredients(values);
    if (index >= 1) {
      values.splice(index, 1);
    }
  };

  const handleCHangeEditIngredients = (index, value) => {
    const values = [...ingredients];
    values[index] = value;
    setEditIngredients(values);
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

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      ingredients: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
    }),
  });

  const handleSubmit = (e, id) => {
    e.preventDefault();
    const values = formik.values;
    axios({
      method: "post",
      url: `${BASE_URL}/api/v1/update-food/${id}`,
      headers: {
        apiKey: `${API_KEY}`,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: {
          name: values.name,
          description: values.description,
          imageUrl: savePicture,
          ingredients: ingredients
        },
    })
      .then((response) => {
        alert("foods edit successful !!");
        console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
    <div className=" bg-food" style={{paddingTop: '140px'}}>
      <h3 className="title-h3">All Foods</h3>
      <div className="d-flex justify-content-center">
        <Link
          className="btn-create"
          to={`/add-foods`}
        >
          Create Foods
        </Link>
      </div>
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
                        <div className="content" style={{display:'flex', flexDirection: 'column', gap:'20px'}}>
                          <h5>{foods.name}</h5>
                          <h3>{foods.ingredients}</h3>
                          <div className="d-flex justify-content-center gap-2">
                            <Link className="d-flex gap-2 set-rating" to={`/rating/${foods.id}`}>
                              <i class="fa-solid fa-star" style={{color:'#FFD700', fontSize:'25px'}}></i>
                              <p style={{position:'relative', bottom: '2px',fontSize:'20px'}}>{foods.rating}</p>
                            </Link>
                            <i
                              className="fa-solid fa-heart"
                              onClick={() =>
                                handleLikes(foods.id, foods.isLike)
                              }
                              on
                              style={{
                                color: `${foods.isLike ? "red" : ""}`, cursor: 'pointer', fontSize:'25px'
                              }}
                            ></i>
                            <p style={{position:'relative', bottom: '2px',fontSize:'20px' }}>{foods.totalLikes}</p>
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
                                data-bs-target={`#exampleModal-${foods.id}`}                                               
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
                    class="modal fade"
                    id={`exampleModal-${foods.id}`}
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div class="modal-body" style={{position: 'relative', left: '-40px'}}>
                          <form
                            className='box-addFoods'
                            onSubmit={(e) => handleSubmit(e, foods.id)}
                          >
                            <div className="col-md-6">
                              <label for="inputName" className="form-label">
                                Food Name
                              </label>
                              <input
                                
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type="text"
                                className="add-input"
                                id="name"
                              />
                            </div>
                            {formik.touched.name && formik.errors.name ? (
                              <div>{formik.errors.name}</div>
                            ) : null}
                            <div className="col-md-6">
                              <label for="inputAge" className="form-label">
                                Description
                              </label>
                              <input
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type="text"
                                className="add-input"
                                id="description"
                              />
                            </div>
                            {formik.touched.description && formik.errors.description ? (
                              <div>{formik.errors.description}</div>
                            ) : null}
                            <div className="col-md-12">
                              <label  className="form-label">
                                Food Image Upload
                              </label>
                              <UploadImage style={{width: '380px'}} onChange={(value) => setSavePicture(value)} />
                            </div>
                            {ingredients.map((ingredient, index) => {
                              return (
                                <div className="col-md-6">
                                  <label for="inputIngredient" className="form-label">
                                    Ingredients
                                  </label>
                                  <div className="d-flex gap-2">
                                    <input

                                      onBlur={formik.handleBlur}
                                      type="text"
                                      className="add-input"
                                      id="ingredients"
                                      value={ingredient}
                                      onChange={(event) =>
                                        handleCHangeEditIngredients(
                                          index,
                                          event.target.value
                                        )
                                      }
                                    />
                                    <button
                                      className="btn btn-success"
                                      onClick={() => handleAddEditIngredients()}
                                      type="button"
                                      style={{fontSize:'12px'}}
                                    >
                                      Add
                                    </button>
                                    <button
                                      className="btn btn-danger"
                                      style={{fontSize:'12px'}}
                                      onClick={() => handleRemoveEditIngredients(index)}
                                      type="button"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                  {formik.touched.ingredients &&
                                  formik.errors.ingredients ? (
                                    <div>{formik.errors.ingredients}</div>
                                  ) : null}
                                </div>
                              );
                            })}
                            <div className="col-12">
                              <button type="submit" className="btn btn-primary">
                                Edit Food
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
