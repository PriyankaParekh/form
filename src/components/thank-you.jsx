import React from "react";
import { useNavigate } from "react-router-dom";

function ThankYou() {
  const navigate = useNavigate();
  function handleNavigate() {
    localStorage.removeItem("FormData");
    navigate("/");
  }
  return (
    <div className="content d-flex vh-100 justify-conten-center align-items-center">
      <div className="wrapper-1">
        <div className="wrapper-2">
          <h1>THANK YOU !</h1>
          <p className="text-uppercase">Thanks for Submitting Form </p>
          <button className="go-home text-uppercase" onClick={handleNavigate}>
            Submit another respond?
          </button>
        </div>
      </div>
    </div>
  );
}

export default ThankYou;
