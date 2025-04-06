import React, {useState} from 'react';

import { useNavigate } from 'react-router-dom';

import './SignIn.css';


//sign in form, handles user login and authenticates using the jwt token
export default function SignIn({handleLogin}) {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    //adds jwt token for authentication and login
    const handleSubmit = (e) => {
        e.preventDefault();
        
        fetch("http://localhost:3000/users/sign-in", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then( response => response.json() )
        .then( returnedData => {
            localStorage.setItem( "jwt-token", returnedData.jwt);

            handleLogin();
        });

    };

  return (
    <div className="signin-container">
    <div className="signin-box">
      <h1 className="signin-title">Sign In</h1>
      <p className="small">Welcome back</p>
      <form onSubmit={handleSubmit} className="signin-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email"
            placeholder="Enter your email"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password"
            placeholder="Enter your password"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required 
          />
        </div>

        <button type="submit" className="full-btn">Sign In</button>
      </form>
    </div>
  </div>
  )
}
