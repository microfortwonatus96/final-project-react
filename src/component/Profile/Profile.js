import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, API_KEY } from "../../Environment";
import { Link } from "react-router-dom";
import UploadImage from "../UploadImage/UploadImage";
import * as Yup from "yup";
import { useFormik } from "formik";

const Profile = () => {
  const [Profile, setProfile] = useState("");
  const [savePicture, setSavePicture] = useState("");

  const getProfile = () => {
    axios({
      method: "get",
      url: `${BASE_URL}/api/v1/user`,
      headers: {
        apiKey: `${API_KEY}`,
        Authorization: `Bearer ${localStorage.getItem(`token`)}`,
      },
    })
      .then((resp) => {
        console.log("cek22:", resp);
        setProfile(resp.data.user);
      })
      .catch((error) => {
        console.error(error);
        alert("Error, try reloading the page");
      });
  }
  useEffect(() => {
    getProfile()
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = formik.values;
    axios({
      method: "post",
      url: `${BASE_URL}/api/v1/update-profile`,
      headers: {
        apiKey: `${API_KEY}`,
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: {
        name: values.name,
        email: values.email,
        profilePictureUrl: savePicture,
        phoneNumber: values.phoneNumber,
        role: values.role
      },
    })
    .then((response) => {
        console.log(response);
        axios({
          method: "post",
          url: `https://api-bootcamp.do.dibimbing.id/api/v1/update-user-role/${
            Profile && Profile.id
          }`,
          data: {
            role: values.role,
          },
          headers: {
            apiKey: `${API_KEY}`,
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((response) => {
            console.log(response);
            localStorage.setItem("role", values.role);
            alert("Update Profile Successful !!")
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      role: "",     
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().required("Required"),
      phoneNumber: Yup.string().required("Required"),
    }),
  });

  return (
    <>
      <div className="box-container">
        <div className="box-detail ">
          <div>
            <img
              className="img-all-foods"
              src={Profile.profilePictureUrl}
              alt="All Foods"
            />
          </div>
          <div>
            <p>id: {Profile.id}</p>
            <p>Name: {Profile.name}</p>
            <p>Email: {Profile.email}</p>
            <p>Role: {Profile.role}</p>
            <p>Phone Number: {Profile.phoneNumber}</p>
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

      <div
        class="modal fade"
        id="exampleModal"
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
            <div
              class="modal-body"
              style={{ position: "relative", left: "-40px" }}
            >
              <form
                className="box-addFoods"
                onSubmit={(e) => handleSubmit(e, Profile.id)}
              >
                <div className="col-md-6">
                  <label for="inputName" className="form-label">
                    User Name
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
                    Email
                  </label>
                  <input
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                    className="add-input"
                    id="email"
                  />
                </div>
                {formik.touched.email && formik.errors.email ? (
                  <div>{formik.errors.email}</div>
                ) : null}

                <div className="col-md-6">
                  <label for="inputAge" className="form-label">
                    Role
                  </label>
                  {localStorage.getItem("role") === "admin" ? (
                  <select label="Role" name="role" className="add-input" onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.role}>
                    <option value="">Select a Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                ) : null}
                </div>
        
                <div className="col-md-12">
                  <label className="form-label">Food Image Upload</label>
                  <UploadImage
                    style={{ width: "380px" }}
                    onChange={(value) => setSavePicture(value)}
                  />
                </div>

                <div className="col-md-6">
                  <label for="inputAge" className="form-label">
                    phone Number
                  </label>
                  <input
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                    className="add-input"
                    id="phoneNumber"
                  />
                </div>
                {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                  <div>{formik.errors.phoneNumber}</div>
                ) : null}
              

                <div className="col-12">
                  <button type="submit" className="btn btn-success">
                    Edit Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
