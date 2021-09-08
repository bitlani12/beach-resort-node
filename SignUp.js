/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import axios from 'axios'
const Signup = () => {
  const [value, setValue] = useState({});
  const [arr, setArr] = useState([]);
  const handleOnChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = () => {
    setArr(localStorage.getItem("signup"));
    axios.post('http://localhost:5000/users/signup', {email:value.email, password: value.pass,username: value.username}).then((val)=>{
      console.log("arr", val); 
    if(val.status === 200){
      localStorage.setItem("signup", JSON.stringify([...arr, value]));
     localStorage.setItem(
       "token",
       "hhgagwq89y2482y824t2ty9823qyt92318ty318gtyh32q89gtq"
     );
     window.location.href = "/";
    }
    
  }
  
    )
    .catch((err)=>{
      console.log(err.response.data.message, 'errr')
      return alert(err.response.data.message)
    })
    // localStorage.setItem("signup", JSON.stringify([...arr, value]));
    // localStorage.setItem(
    //   "token",
    //   "hhgagwq89y2482y824t2ty9823qyt92318ty318gtyh32q89gtq"
    // );
    // window.location.href = "/";
  };

  return (
    <div>
      <div className="container-login100">
        <div className="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
          <form
            className="login100-form validate-form flex-sb flex-w"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <span className="login100-form-title p-b-32">Account Signup</span>
            <span className="txt1 p-b-11">Email</span>
            <div
              className="wrap-input100 validate-input m-b-36"
              data-validate="Email is required"
            >
              <input
                className="input100"
                onChange={(e) => handleOnChange(e)}
                type="text"
                name="email"
                required
              />
              <span className="focus-input100"></span>
            </div>
            <span className="txt1 p-b-11">Username</span>
            <div
              className="wrap-input100 validate-input m-b-36"
              data-validate="Username is required"
            >
              <input
                className="input100"
                onChange={(e) => handleOnChange(e)}
                type="text"
                name="username"
                required
              />
              <span className="focus-input100"></span>
            </div>
            <span className="txt1 p-b-11">Password</span>
            <div
              className="wrap-input100 validate-input m-b-12"
              data-validate="Password is required"
            >
              <span className="btn-show-pass">
                <i className="fa fa-eye"></i>
              </span>
              <input
                className="input100"
                onChange={(e) => handleOnChange(e)}
                type="password"
                name="pass"
                required
              />
              <span className="focus-input100"></span>
            </div>

            <div className="container-login100-form-btn">
              <button
                className="login100-form-btn"
                style={{ marginTop: "10px" }}
              >
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
