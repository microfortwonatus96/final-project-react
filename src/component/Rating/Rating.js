import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BASE_URL, API_KEY } from "../../Environment";

const Rating = () => {
  let { foodsID } = useParams();
  const [foods, setFoods] = useState();
  const [rating, setRating] = useState();

  useEffect(() => {
    axios({
      method: "get",
      url: `${BASE_URL}/api/v1/foods/${foodsID}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        apiKey: `${API_KEY}`,
      },
    })
      .then((res) => {
        setFoods(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [foodsID]);

  const getRating = () => {
    axios({
      method: "get",
      url: `${BASE_URL}/api/v1/food-rating/${foodsID}`,
      headers: {
        apiKey: `${API_KEY}`,
      },
    })
      .then((res) => {
        setRating(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getRating();
  }, [foodsID]);

  const handleSubmit = (e) => {
    console.log(values);
    e.preventDefault();
    const values = formik.values;
    axios({
      method: "post",
      url: `${BASE_URL}/api/v1/rate-food/${foodsID}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        apiKey: `${API_KEY}`,
      },
      data: {
        rating: values.rating,
        review: values.review,
      },
    })
      .then((res) => {
        console.log(res);
        getRating();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formik = useFormik({
    initialValues: {
        rating: "",
        review: "",   
    },
    validationSchema: Yup.object({
        rating: Yup.string().required("Required"),
        review: Yup.string().required("Required"),
    }),
  });
  return <div>Rating</div>;
};

export default Rating;
