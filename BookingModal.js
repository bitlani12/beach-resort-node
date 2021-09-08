import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from 'axios'
const ModalExample = (props) => {
  const {
    buttonLabel,
    className,
    toggle,
    modal,
    hotelName,
    price,
    size,
  } = props;
  const [value, setValue] = useState({});
  const [arr, setArr] = useState([]);
  const handleOnChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
      price: price + 1000,
      size: size,
    });
    setArr(JSON.parse(localStorage.getItem("bookingDetails")));
  };
  //   const [arr, setArr] = useState([]);
  const handleSubmit = () => {
   
    axios.post('http://localhost:5000/bookroom/bookroom', {name:value.name, date: value.date,noOfRooms: value.size}).then((val)=>{
      console.log("arr", val); 
    if(val.status === 200){
      localStorage.setItem("signup", JSON.stringify([...arr, value]));
     localStorage.setItem(
       "token",
       "hhgagwq89y2482y824t2ty9823qyt92318ty318gtyh32q89gtq"
     );
    //  window.location.href = "/";
    }
    else{
      alert(val.data.message)
    }
    
  }
  
    )
    .catch((err)=>{
      console.log(err.response.data.message, 'errr')
      return alert(err.response.data.message)
    })
    // setArr(JSON.parse(localStorage.getItem("bookingDetails")));
    // arr && arr.length
    //   ? localStorage.setItem("bookingDetails", JSON.stringify([...arr, value]))
    //   : localStorage.setItem("bookingDetails", JSON.stringify([value]));


      // ////////////////////////////////
    // localStorage.setItem(
    //   "bookingDetails",
    //   JSON.stringify({
    //     name: value.name,
    //     rooms: value.rooms,
    //     date: value.date,
    //     price: price + 1000,
    //     size: size,
    //   })
    // );
    // alert("Booked");
    toggle();
  };
  return (
    <div>
      <Button color="danger" onClick={toggle}>
        {buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Booking details</ModalHeader>
        <ModalBody>
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
                  <span className="login100-form-title p-b-32">
                    Enter booking details
                  </span>
                  <span className="txt1 p-b-11">Name</span>
                  <div
                    className="wrap-input100 validate-input m-b-36"
                    data-validate="Email is required"
                  >
                    <input
                      className="input100"
                      onChange={(e) => handleOnChange(e)}
                      type="text"
                      name="name"
                    />
                    <input
                      className="input100"
                      onChange={(e) => handleOnChange(e)}
                      type="hidden"
                      name="price"
                      value={price + 1000}
                    />
                    <input
                      className="input100"
                      onChange={(e) => handleOnChange(e)}
                      type="hidden"
                      name="size"
                      value={size}
                    />
                    <span className="focus-input100"></span>
                  </div>
                  <span className="txt1 p-b-11">date</span>
                  <div
                    className="wrap-input100 validate-input m-b-36"
                    data-validate="Username is required"
                  >
                    <input
                      className="input100"
                      onChange={(e) => handleOnChange(e)}
                      type="date"
                      name="date"
                      required
                    />
                    <span className="focus-input100"></span>
                  </div>
                  <span className="txt1 p-b-11">Number of rooms</span>
                  <div
                    className="wrap-input100 validate-input m-b-12"
                    data-validate="Password is required"
                  >
                    <span className="btn-show-pass"></span>
                    <input
                      className="input100"
                      onChange={(e) => handleOnChange(e)}
                      type="number"
                      name="rooms"
                    />
                    <span className="focus-input100"></span>
                  </div>

                  <div className="container-login100-form-btn">
                    <button
                      className="login100-form-btn"
                      style={{ marginTop: "10px" }}
                    >
                      Book
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </ModalBody>
        {/* <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Do Something
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter> */}
      </Modal>
    </div>
  );
};

export default ModalExample;