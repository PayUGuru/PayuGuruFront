import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Registerpage.css";
import loadingImg from "../../assets/img/loading.gif";
import { ENDPOINTS } from "../../utils/apiConfig";
import { Button } from "@mui/material";

const Register = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [loader, setLoader] = useState(false);
  const [registerErr, setRegisterErr] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    userName: "",
    userPhone: "",
    userEmail: "",
    password: "",
    confirmPass: "",
    companyName: "",
  });

  const [formData, setFormData] = useState({
    userName: "",
    userPhone: "",
    userEmail: "",
    password: "",
    confirmPass: "",
    companyName: "",
  });

  let navigate = useNavigate();

  const handleCheckboxChange = (e) => {
    console.log('Terms Status: ', e.target.checked);
    setIsChecked(e.target.checked);
    if (e.target.checked === false) {
      setRegisterErr("");
    }
  };

  const toggleApiKeyVisibility = () => {
    setShowPass(!showPass);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getAPI = async () => {
    return {
      Registration: ENDPOINTS.REGISTER_USER, // Assuming ENDPOINTS.REGISTER_USER is a URL string
    };
  };

  const registerUser = async (e) => {
    e.preventDefault();
    setLoader(true);
    setRegisterErr("");
    setFieldErrors({});

    if (!isChecked) {
      setLoader(false);
      setRegisterErr("You must agree to the terms and conditions.");
      return;
    }

    try {
      const reg_api = (await getAPI()).Registration;

      console.log("Registration API: ", reg_api);

      // let headers = new Headers();
      // headers.append('Content-Type', 'application/json');
      // headers.append('Accept', 'application/json');
      // // headers.append('Authorization', 'Basic ' + base64.encode(username + ":" +  password));
      // headers.append('Origin','https://payuguru.com');
         
        const requestOptions = {
          method: "POST",
          headers: {
            accept: "*/*",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: formData.userName,
            mobile: formData.userPhone,
            email: formData.userEmail,
            password: formData.password,
            confirmedpassword: formData.confirmPass,
            com_name: formData.companyName
          })
  
        };
      const response = await fetch(reg_api, requestOptions);

      // const response = await fetch(reg_api, {
      //   method: "POST",
      //   headers: {
      //     Accept: "*/*", // Capitalized for consistency
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     name: formData.userName,
      //     mobile: formData.userPhone,
      //     email: formData.userEmail,
      //     password: formData.password,
      //     confirmedpassword: formData.confirmPass,
      //     com_name: formData.companyName,
      //     accept: isChecked, // Include the accept field
      //   }),
      // });

      const responseData = await response.json();
      console.log(responseData);
      setLoader(false);

      if (responseData.StatusCodes && responseData.StatusCodes === "00") {
        localStorage.setItem("clientId", responseData.responsed.clientId);
        console.log(
          "Registration successful:",
          responseData.responsed.clientId
        );
        navigate(`/mobileotp`);
      } else if (responseData.success === false) {
        console.log("Registration error:", responseData.message);
        parseFieldErrors(responseData.message);
      } else {
        console.error("Unexpected response structure:", responseData);
        setRegisterErr("An unexpected error occurred. Please try again.");
      }
    } catch (error) {
      setLoader(false);
      console.error("Error during OTP verification:", error);
      setRegisterErr("Internal Server Error. Please try again later.");
    }
  };

  const parseFieldErrors = (errorMessage) => {
    const fieldErrors = {
      userName: "",
      userPhone: "",
      userEmail: "",
      password: "",
      confirmPass: "",
      companyName: "",
    };
    if (errorMessage.includes('"name"'))
      fieldErrors.userName = "*Name is not allowed to be empty";
    if (errorMessage.includes('"mobile"'))
      fieldErrors.userPhone = "*Mobile number already exists.";
    if (errorMessage.includes('"email"'))
      fieldErrors.userEmail = "*Invalid email address.";
    if (errorMessage.includes('"password"'))
      fieldErrors.password =
        "*Password must be at least 8 characters long, containing one uppercase letter, one lowercase letter, and one digit.";
    if (errorMessage.includes('"confirmedpassword"'))
      fieldErrors.confirmPass = "*Passwords do not match.";
    if (errorMessage.includes('"com_name"'))
      fieldErrors.companyName = "*Company name is not allowed to be empty";

    setFieldErrors(fieldErrors);
  };

  // Remove direct DOM manipulation and use React's form handling
  // Also, add form submission on Enter key within the form
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      registerUser(event);
    }
  };

  return (
    <div>
      <section className="mt-5 py-5 enquiry-section1" id="stack1">
        <div className="container position-relative">
          <div className="row">
            <div className="col-lg-3 col-md-2 col-12 "></div>
            <div className="col-lg-6 col-md-8 col-12">
              <div className="form" onKeyDown={handleKeyDown}>
                <h3 className="text-center">Sign-Up</h3>
                <p className="text-center">
                  <Link to="/" className="text-white">
                    <img
                      src="https://demo.payu.guru/favicon_128.png"
                      alt="home-icon"
                      className="home-icon"
                    />
                    
                  </Link>
                </p>
                <div className="inputbox">
                  <label htmlFor="userName">Name</label>
                  <input
                    type="text"
                    name="userName"
                    id="userName"
                    value={formData.userName}
                    onChange={handleInputChange}
                  />
                  <p className="msg text-warning p-2">{fieldErrors.userName}</p>
                </div>
                <div className="inputbox">
                  <label htmlFor="companyName">Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    id="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                  />
                  <p className="msg text-warning p-2">{fieldErrors.companyName}</p>
                </div>
                <div className="inputbox">
                  <label htmlFor="userEmail">Email</label>
                  <input
                    type="email"
                    name="userEmail"
                    id="userEmail"
                    value={formData.userEmail}
                    onChange={handleInputChange}
                  />
                  <p className="msg text-warning p-2">{fieldErrors.userEmail}</p>
                </div>
                <div className="inputbox">
                  <label htmlFor="userPhone">Mobile</label>
                  <input
                    type="tel"
                    name="userPhone"
                    id="userPhone"
                    value={formData.userPhone}
                    onChange={handleInputChange}
                  />
                  <p className="msg text-warning p-2">{fieldErrors.userPhone}</p>
                </div>
                <div className="inputbox">
                  <label htmlFor="password">Password</label>
                  <div className="d-flex mb-2">
                  <input
                    type={showPass ? "text" : "password"}
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <Button
                        className="eyeBtn"
                        
                        title={showPass ? "Hide" : "Show"}
                        onClick={toggleApiKeyVisibility}
                      >
                        <span>
                          <i
                            className={`fa ${
                              showPass ? "fa-eye-slash" : "fa-eye"
                            }`}
                          ></i>
                        </span>
                      </Button>
                  </div>
                  <p className="msg text-warning p-2">{fieldErrors.password}</p>
                </div>
                <div className="inputbox">
                  <label htmlFor="confirmPass">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPass"
                    id="confirmPass"
                    value={formData.confirmPass}
                    onChange={handleInputChange}
                  />
                  <p className="msg text-warning p-2">{fieldErrors.confirmPass}</p>
                </div>
                <span id="mobileOtpError" className="text-danger">
                  {registerErr}
                </span>
                <div className="tacbox">
                  <input
                    id="checkbox"
                    type="checkbox"
                    className="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="checkbox">
                    I agree to these{" "}
                    <Link to="/termsandcondition">Terms and Conditions</Link>.
                  </label>
                </div>
                <div>
                  <button
                    type="submit"
                    id="register-button"
                    className="submitButton"
                    onClick={registerUser}
                    disabled={loader} // Disable button while loading
                  >
                    {loader ? "Submitting..." : "Submit"}
                  </button>
                </div>
                <div className="inputbox text-center">
                  <p>
                    Already Have An Account? <Link to="/Login">Login</Link>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-2 col-12 "></div>
          </div>
          <div className="loaderContainer">
            <div className="inputbox text-center loader-box">
              {loader && (
                <img src={loadingImg} alt="loading..." className="loaderImg" />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
