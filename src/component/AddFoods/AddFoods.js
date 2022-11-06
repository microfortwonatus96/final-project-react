import React from "react";
// import imgFoods from "../../img/steak.jpg";
import "../AddFoods/AddFoods.css";
import { BASE_URL, API_KEY } from "../../Environment";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useState } from "react";

export const AddFoods = () => {
  const [ingredients, setIngredients] = useState(["test"]);

  const handleAddIngredients = () => {
    setIngredients([...ingredients, ""]);
  };

  const handleDeleteIngredients = (index) => {
    const values = [...ingredients];
    values.splice(index, 1);
    setIngredients(values);
  };

  const handleChangeIngredients = (index, value) => {
    // const values = [...ingredients];
    // values[index] = value;
    // setIngredients(values);
    setIngredients(previous => {
      const values = [...previous];
      values[index] = value;
      return values;
    })
  };

  const formAddFoods = useFormik({
    initialValues: {
      name: "",
      description: "",
      imageUrl: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
      imageUrl: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      axios({
        method: "post",
        url: `${BASE_URL}/api/v1/create-food`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem(`token`)}`,
          apiKey: `${API_KEY}`,
        },
        data: {
          name: values.name,
          description: values.description,
          imageUrl: values.imageUrl,
          ingredients: ingredients
        },
      })
        .then((res) => {
          console.log(res);
          window.location.href = "/";
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  return (
    <>
    <div className="bg-addFoods">
      <form onSubmit={formAddFoods.handleSubmit} className='box-addFoods'>
        <h2 class="">Add Foods</h2>
        <div class="">
          <input
            id="name"
            name="name"
            type="text"
            className="add-input"
            onChange={formAddFoods.handleChange}
            onBlur={formAddFoods.handleBlur}
            value={formAddFoods.values.name}
            placeholder="name"
          />
          {formAddFoods.touched.name && formAddFoods.errors.name ? (
            <div>{formAddFoods.errors.name}</div>
          ) : null}
        </div>

        <div class="">
          <input
            id="description"
            name="description"
            type="text"
            className="add-input"
            onChange={formAddFoods.handleChange}
            onBlur={formAddFoods.handleBlur}
            value={formAddFoods.values.description}
            placeholder="description"
          />
        </div>

        <div class="">
          <input
            id="imageUrl"
            name="imageUrl"
            type="url"
            className="add-input"
            onChange={formAddFoods.handleChange}
            onBlur={formAddFoods.handleBlur}
            value={formAddFoods.values.imageUrl}
            placeholder="imageUrl"
          />
        </div>

        <div>
        {ingredients.map((ingredient, index) => {
          return (
            <div class="d-flex" key={index}>
              <input
                id="ingredients"
                name="ingredients"
                type="text"
                className="add-input"
                onBlur={formAddFoods.handleBlur}
                placeholder="ingredients"
                value={ingredient}
                onChange={(event) =>
                  handleChangeIngredients(index, event.target.value)
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
                onClick={() => handleDeleteIngredients(index)}
              >
                Delete
              </button>
            </div>
          );
        })}
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
    </>
  );
};
