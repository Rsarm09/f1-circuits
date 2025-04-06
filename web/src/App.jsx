import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';

// Routes
import AllCircuits from './pages/AllCircuits';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Header from './components/Header';

//Authentication function
import authRequired from './authRequired';

//checks if the user is authenticated before showing circuit page
const ProtectedAllCircuits = authRequired(AllCircuits);

function App() {
  //checks if the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  //navigate hook to a page
  const navigate = useNavigate();

  //remove token and remove authentication when user logs out
    //redirects to sign-in page
  const handleLogout = () => {
    localStorage.removeItem('jwt-token');
    setIsAuthenticated(false);
    navigate("/sign-in");
  };

  //when user logs in authentication goes through, navigate to home page
  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate("/");
  };


  //grabs jwt token if authentication is true on mount
  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt-token");
    if (jwtToken) {
      setIsAuthenticated(true);
    }

  }, []);

  return (
    <>
    {/* pass logout and authentication functions to components/pages */}
      <Header handleLogout={handleLogout} isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path='/' element={<ProtectedAllCircuits />} />
        <Route path='/sign-in' element={<SignIn handleLogin={handleLogin} isAuthenticated={isAuthenticated} />} />
        <Route path='/sign-up' element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
