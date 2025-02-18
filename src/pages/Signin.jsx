import React from "react";
import logo from "../assets/images/logo.png";
import signin from "../assets/images/sign-in-img.jpg";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useMutation, useQuery } from "@tanstack/react-query";
import AuthServices from "../services/authservices/AuthServices";
import { ToastContainer, toast } from "react-toastify";
import StorageHelper from "../helper/StorageHelper";

const Signin = () => {
  const nav = useNavigate();
  const formik = useFormik({
    initialValues: { username: "", password: "" },
    onSubmit: (values, action) => {
      SubmitHandler(values)
    }
  })

  const SubmitHandler = (data) => {
    console.log("Data", data)
    const formdata = new FormData()
    formdata.append('username', data?.username.toLowerCase())
    formdata.append('password', data?.password)
    mutation.mutate(formdata)
    return


  };
  const mutation = useMutation((formdata) => {
    return AuthServices.login(formdata)
  }, {
    onSuccess: (data) => {
      // console.log("Login Data", data?.data)
      toast.success('Logged In Successfully', { delay: 10 })
      const tokenBearer = data?.data?.token_type + " " + data?.data?.access_token
      StorageHelper.setToken(tokenBearer)

      setTimeout(() => {
        window.location.replace("/")
      }, 3000)
      return
    },
    onError: (err) => {
      console.log("Err", err?.message)
      toast.error(err?.response?.data?.detail || err?.message, { delay: 10 })
    }
  })

  const { data: userDetails, isLoading } = useQuery(['userdetails'], () => {
    const tokenBearer = mutation?.data?.data?.token_type + " " + mutation?.data?.data?.access_token
    return AuthServices.userDetails(tokenBearer)

  }, {
    enabled: !!mutation?.data?.data?.access_token,
    onSuccess: (data) => {
      StorageHelper.setUserData(data?.data)

      return;
    },
    onError: (err) => {
      console.log(err?.response?.data?.detail)
      return;
    }
  })

  return (
    <section className="sign-in-section">
      <ToastContainer />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
            <div className="sign-in-form">
              <div className="logo">
                <img src={logo} alt />
              </div>
              <form onSubmit={formik.handleSubmit}>
                <h3 className="common-title">Signin with this services</h3>
                <div className="row">
                  <div className="col-8 m-auto">
                    <div className="form-contact-box">
                      <input
                        type="email"
                        placeholder="Email address"
                        className="form-control form-input"
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-8 m-auto">
                    <div className="form-contact-box">
                      <input
                        type="password"
                        placeholder="Password"
                        className="form-control form-input"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      />
                    </div>
                  </div>
                  <a className="link" href="#">
                    Forgot Password?
                  </a>
                  <div className="col-8 m-auto">
                    <div className="form-button">
                      <button
                        type="submit"
                        className="btn common-btn"

                      >
                        Sign In
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
            <div className="sign-in-img">
              <img src={signin} alt />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
