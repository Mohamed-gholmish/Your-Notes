import React from "react";
import style from "./Login.module.css";
import LoginImage from "../../assets/images/login.jpg";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup"
import axios from "axios";
import { useState } from "react";
import { useFormik } from "formik";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { useEffect } from "react";

export default function Login() {
  const [isLoading , setLoding] = useState(false);
  let navigate= useNavigate();
  const {usInfo , setUserInfo , token ,setToken} = useContext(UserContext)
  let validationSchema = Yup.object({
    email: Yup.string()
      .required("#email must be exist")
      .email("Enter valid email"),
    password: Yup.string()
      .required("*password must be exist")
      .matches(
        /^[A-Z][0-9]{1,}/,
        "Password must start with capital letter & minmum one number"
      )
      .min(7, "Password must be at least 7 characters")
      .max(30, "Password must be at most 30 characters"),
  });

  let formic = useFormik({
    initialValues: {
      email: "",
      password: "",

    },
    validationSchema,
    onSubmit: handleLogin
  });
  async function handleLogin(values) {
   setLoding(true)
    let { data } = await axios.post(
      "https://sticky-note-fe.vercel.app/signin",
      values
    );
    if (data.message === "success") { 
    localStorage.setItem("userInfo",JSON.stringify(data.user) )
    localStorage.setItem("token" , data.token)
    setToken(data.token);
    setUserInfo(data.user);
 console.log(localStorage.getItem("token"));
    }


    data.message === "email doesn't exist"
      ? setEmailError(data.message)
      : setEmailError(false);

    data.message === "incorrect password"
      ? setPasswordError(data.message)
      : setPasswordError(false);
  }
  useEffect(()=>{if (token == null) {return} ;
  navigate("/")},[token])
  return (
    <section className="min-vh-100 d-flex align-items-center justify-content-center">
      <div className={`${style.container} row`}>
        <figure className="col-md-8 m-0 p-md-0">
          <div className="image-container">
            <img src={LoginImage} className="w-100 " alt="Regsiter Image" />
          </div>
        </figure>
        <form onSubmit={ formic.handleSubmit} 
        className="col-md-4 d-flex flex-column justify-content-center px-5">
          <h2 className="m-0 fw-bold font-Montserrat">
            Welcome Back<i className="fa-solid fa-heart ms-0 text-main"></i>
          </h2>
          <p className="mb-3">
            Thanks for returning! 
          </p>
          <div className="form-group d-flex flex-column gap-2 justify-content-center">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              id="email"
              onChange={formic.handleChange}
              onBlur={formic.handleBlur}
              value={formic.values.email}
            />
            {formic.errors.email && formic.touched.email ? (
              <div className="error">{formic.errors.email}</div>
              ) : null}
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              id="password"
              onChange={formic.handleChange}
              onBlur={formic.handleBlur}
              value={formic.values.password}
            />
              {formic.errors.password && formic.touched.password ? (
              <div className="error">{formic.errors.password}</div>
            ) : null}
            <button type="submit" className="btn btn-main" disabled={isLoading}>
              Login
            </button>
            <p>
              You don't have account yet ?
              <Link to="/register" className="text-decoration-underline">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
