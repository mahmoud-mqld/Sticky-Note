
import { useFormik } from "formik";
import noteImg from '../../images/sign-up-illustration-with-signed-official-paper-and-stamper.png'
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Helmet } from "react-helmet";

export default function Register() {
  let navigate = useNavigate();

let [responseMsg,setResponseMsg]=useState('');
let [erorrMsg,seterorrMsg]=useState('');
let[loading,setLoading]=useState(false)
let [visible,setVisible]=useState(false)
function resetMsg(){
  setResponseMsg(null)
  seterorrMsg(null)
  }

  let validationSchema = yup.object({
   
    email: yup.string().required("Please Enter Your E-mail").email(),
    password: yup
      .string()
      .required()
      .matches(/\S{6,}/g, "Password should be at least 6 cahracters"),
   
   
  });

  function signIn(val) {
    setLoading(true)
    console.log(val);
    axios.post('https://note-sigma-black.vercel.app/api/v1/users/signIn',val)
    .then((res)=>{
      console.log(res);
      console.log(res.data.msg);
      setResponseMsg(res.data.msg)
      let token = res.data.token
      localStorage.setItem("token",token)
      setLoading(false)
      navigate('/home')
    }).catch((err)=>{
      setLoading(false)
      seterorrMsg(err.response.data.msg)
    })
  }

  let registerForm = useFormik({
    initialValues: {
     
      email: "",
      password: ""   
    },
    validationSchema,
    onSubmit: signIn,
  });
  return (
    <>
     <Helmet>
    <title>Sticky Note</title>
    </Helmet>
      <li className="fixed-top p-3 pe-lg-5 d-lg-flex d-none  ">
        <i className="fa-regular fa-note-sticky text-info fs-2"></i>
        <p className="ps-2 fs-4 fw-bold">Notes</p>
      </li>
      <div className="container">
        <div className="row">
          <div className="col-lg-5 d-none d-lg-flex justify-content-center align-items-center">
            <img className=" vh-100 p-5" src={noteImg} alt="" />
          </div>

          <div className="col-lg-7">
            <div className="min-vh-100 d-flex justify-content-center align-items-center text-center signup-container">
              <div className="bg-light bg-opacity-25 shadow w-100 mx-auto  p-5 rounded-2">
                <h1 className="fw-bold">Sign In Now</h1>
                <div className="pt-3">
                  <form onSubmit={registerForm.handleSubmit}>
                    {responseMsg? <div className="alert alert-success">{responseMsg}</div>:''}
                    {erorrMsg? <div className="alert alert-danger">{erorrMsg}</div>:''}
                  
                    <input 
                    onFocus={resetMsg}
                      onChange={registerForm.handleChange}
                      value={registerForm.values.email}
                      onBlur={registerForm.handleBlur}
                      className="form-control my-2"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter Your Email"
                    />
                    {registerForm.touched.email && registerForm.errors.email ? (
                      <div className="alert alert-danger">
                        {registerForm.errors.email}
                      </div>
                    ) : null}
                    <div className=" position-relative">
                      <input 
                    onFocus={resetMsg}
                     onChange={registerForm.handleChange}
                     value={registerForm.values.password}
                     onBlur={registerForm.handleBlur}
                      className="form-control my-2 "

                      type={visible?"text":"password"}
                      name="password"
                      id="password"
                      placeholder="Enter Your Password"
                    />
                       <button
                      type="button"
                      className="btn text-color border-0 position-absolute end-0 top-50 translate-middle-y"
                      onClick={() => {
                        setVisible(!visible);
                      }}
                    >
                      <i
                        className={`fa-regular ${
                          visible ? "fa-eye-slash text-main" : "fa-eye"
                        }`}
                      ></i>
                    </button>
                    </div>
                    
                       {registerForm.touched.password && registerForm.errors.password ? (
                      <div className="alert alert-danger">
                        {registerForm.errors.password}
                      </div>
                    ) : null}
                   
                    <button
                      type="submit"
                      className="btn btn-info text-light w-100 rounded-2 mt-2">
                        {loading? <i className="fa-solid fa-spinner fa-spin"></i>:"Sign In"}
                      
                    </button>
                  </form>
                  <p>Dont Have An Account Yet ? <Link to={'/register'}>Sign Up</Link> </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
