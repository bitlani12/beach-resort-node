/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import React, { useState } from "react";

const Login = () => {
  const [value, setValue] = useState({});
  const [arr, setArr] = useState([]);
  const handleOnChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
   
    axios.post('http://localhost:5000/users/login', {email:value.username, password: value.pass}).then((val)=>{
      console.log("arr", val); 
    if(val.status === 200){
      
      // const getItem = JSON.parse(localStorage.getItem("signup"));
      // const isValid =
      //   getItem && getItem.length
      //     ? getItem.filter(
      //         (el) => el.username === value.username && el.pass === value.pass
      //       )
      //     : false;
      // console.log("isValid", isValid);
      // if (isValid.length) {
        // console.log("isValid", isValid);
        // return;
        // localStorage.setItem("loginDetails", isValid);
        localStorage.setItem(
          "token",
          "hhgagwq89y2482y824t2ty9823qyt92318ty318gtyh32q89gtq"
        );
        window.location.href = "/";
      } else {
        alert("Wrong Details");
      }
    }
  // }
   
    ) 
    .catch((err)=>{
      console.log(err.response.data.message, 'errr')
      return alert(err.response.data.message)
    })
    // else {
      
    // }
   
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
            <span className="login100-form-title p-b-32">Account Login</span>
            <span className="txt1 p-b-11">Username</span>
            <div
              className="wrap-input100 validate-input m-b-36"
              data-validate="Username is required"
            >
              <input
                className="input100"
                type="text"
                name="username"
                onChange={(e) => handleOnChange(e)}
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
                type="password"
                onChange={(e) => handleOnChange(e)}
                name="pass"
              />
              <span className="focus-input100"></span>
            </div>

            <div className="container-login100-form-btn">
              <button
                className="login100-form-btn"
                type="submit"
                style={{ marginTop: "10px" }}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
