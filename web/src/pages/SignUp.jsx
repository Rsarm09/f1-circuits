import React, { useState } from 'react';
import '../global.css';
import './SignUp.css';

import { useNavigate } from 'react-router-dom';

function SignUp() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
      email: "",
      password: "",
      confirmPassword: ""
  });

  const handleSubmit = (e) => {
      e.preventDefault();

      if (formData.password !== formData.confirmPassword) {
          alert("Passwords do not match!");
          return;
      }

      if (formData.password.length < 8) {
        alert("Password must be at least 8 characters long.");
        return;
      }

      fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
      })
      .then( response => response.json() )
      .then(returnedJSON => {
        navigate("/sign-in")
      });

  };  

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1 className="signup-title">Sign Up</h1>
        <p className='small'>Create an Account</p>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              placeholder="Email"
              onChange={(event) => {
                setFormData({... formData, email: event.target.value});
              }}
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Password"
              name="password"
              onChange={(event) => {
                setFormData({...formData, password: event.target.value});
              }}
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword" 
              placeholder="Retype Password"
              name="confirmPassword"
              onChange={(event) => {
                setFormData({...formData, confirmPassword: event.target.value});
              }}
              required 
            />
          </div>

          <button type="submit" value="Register" className="full-btn">Create Account</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;