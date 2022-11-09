import React, {useState} from "react";
import "../Form/Form.css";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { BASE_URL, API_KEY } from "../../Environment";
import imgSignIn from '../../img/login.svg'
import imgSignUp from '../../img/register.svg'
import UploadImage from "../UploadImage/UploadImage";

const Form = () => {
  const [classSignUp, setClassSignUp] = useState("");
  const [UploadFile, setUploadFile] = useState('');

  const handleSignUp = () => {
    setClassSignUp("sign-up-mode");
  };

  const handleSignIn = () => {
    setClassSignUp("");
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordRepeat: "",
      role: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      // email: Yup.string()
      //   .required('Required'),
      // password: Yup.string()
      //   .min(8, 'Must be 8 characters or more')
      //   .max(20, 'Must be 20 characters or less')
      //   .required('Required'),
    }),
    onSubmit: (values) => {
      axios({
        method: "post",
        url: `${BASE_URL}/api/v1/register`,
        headers: {
          apiKey: `${API_KEY}`,
        },
        data: {
          name: values.name,
          email: values.email,
          password: values.password,
          passwordRepeat: values.passwordRepeat,
          role: values.role,
          phoneNumber: values.phoneNumber,
          profilePictureUrl: UploadFile,
        },
      })
        .then((Response) => {
          alert("Registration Successful !!");
          window.location.reload()
        })
        .catch((e) => {
          alert("Registration Failed !!");
        });
    },
  });

  const formLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      axios({
        method: "post",
        url: `${BASE_URL}/api/v1/login`,
        headers: {
          apiKey: `${API_KEY}`,
          
        },
        data: {
          email: values.email,
          password: values.password,
        },
      })
        .then((Response) => {
          alert("Login successful !!");
          const token = Response.data.token;
          localStorage.setItem("token", token);

          const role = Response.data.user.role;
          localStorage.setItem("role", role);

          const name = Response.data.user.name;
          localStorage.setItem("name", name);

          const email = values.email;
          localStorage.setItem("email", email);
          window.location.href = "/";
        })
        .catch((error) => {
          console.log(error);
          alert("Login Failed! Please, Check Email and Password !!");
        });
    },
  });

  return (
    <>
      <div class={`container-form ${classSignUp}`}>
        <div class="forms-container">
          <div class="signin-signup">
            {/* sign-in  */}
            <form onSubmit={formLogin.handleSubmit} class="sign-in-form">
              <h2 class="title">Sign in</h2>
              <div class="input-field">
                <i class="fas fa-envelope"></i>
                <input
                  id="email"
                  name="email"
                  type="text"
                  className="input-box"
                  onChange={formLogin.handleChange}
                  onBlur={formLogin.handleBlur}
                  value={formLogin.values.email}
                  placeholder="Email"
                />
                {formLogin.touched.email && formLogin.errors.email ? (
                  <div>{formLogin.errors.email}</div>
                ) : null}
              </div>
              <div class="input-field">
                <i class="fas fa-lock"></i>
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={formLogin.handleChange}
                  onBlur={formLogin.handleBlur}
                  value={formLogin.values.password}
                  placeholder="Password"
                />
              </div>
              <input type="submit" value="Login" class="button-login solid" />
              <p class="social-text">Or Sign in with social platforms</p>
              <div class="social-media">
                <div class="social-icon">
                  <i class="fab fa-twitter"></i>
                </div>
                <div class="social-icon">
                  <i class="fab fa-linkedin-in"></i>
                </div>
                <div className="social-icon">
                  <i class="fab fa-facebook-f"></i>
                </div>
                <div class="social-icon">
                  <i class="fab fa-google"></i>
                </div>
              </div>
            </form>
            {/* end-sign-in  */}

            {/* sign-up  */}
            <form onSubmit={formik.handleSubmit} class="sign-up-form">
              <h2 class="title">Sign up</h2>
              <div class="input-field">
                <i class="fas fa-user"></i>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Username"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />

                {formik.touched.username && formik.errors.username ? (
                  <div>{formik.errors.username}</div>
                ) : null}
              </div>
              <div class="input-field">
                <i class="fas fa-envelope"></i>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />

                {formik.touched.email && formik.errors.email ? (
                  <div>{formik.errors.email}</div>
                ) : null}
              </div>

              <div class="input-field">
                <i class="fas fa-lock"></i>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />

                {formik.touched.password && formik.errors.password ? (
                  <div>{formik.errors.password}</div>
                ) : null}
              </div>

              <div class="input-field">
                <i class="fas fa-lock"></i>
                <input
                  id="passwordRepeat"
                  name="passwordRepeat"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.passwordRepeat}
                />

                {formik.touched.passwordRepeat &&
                formik.errors.passwordRepeat ? (
                  <div>{formik.errors.passwordRepeat}</div>
                ) : null}
              </div>
              <div class="input-field">
                <i class="fas fa-user"></i>
                <select
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.role}
                  component="select"
                  id="role"
                  name="role"
                  multiple={false}
                  class="select-field"
                >
                  <option value="">Select a Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              <div class="input-field">
                <i class="fa fa-phone"></i>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  placeholder="Phone Number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phoneNumber}
                />

                {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                  <div>{formik.errors.phoneNumber}</div>
                ) : null}
              </div>
              <div style={{position: 'relative', left: '30px'}}>
                <UploadImage
                onChange={(value) => setUploadFile(value)} />
              </div>
              <button type="submit" class="button-login btn-primary">
                Submit
              </button>
            </form>
            {/* end-sign-up  */}
          </div>
        </div>

        <div class="panels-container">
          <div class="panel left-panel">
            <div class="content">
              <h3>New here ?</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Debitis, ex ratione. Aliquid!
              </p>
              <button
                class="button-login transparent"
                id="sign-up-btn"
                onClick={() => handleSignUp()}
              >
                Sign up
              </button>
            </div>
            <img src={imgSignIn} class="image" alt="" />
          </div>

          <div class="panel right-panel">
            <div class="content">
              <h3>One of us ?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                laboriosam ad deleniti.
              </p>
              <button
                class="button-login transparent"
                id="sign-in-btn"
                onClick={() => handleSignIn()}
              >
                Sign in
              </button>
            </div>
            <img src={imgSignUp} class="image" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
