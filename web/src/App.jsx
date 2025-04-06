import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';

// Routes
import AllCircuits from './pages/AllCircuits';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Header from './components/Header';
import authRequired from './authRequired';

const ProtectedAllCircuits = authRequired(AllCircuits);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false); // new

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jwt-token');
    setIsAuthenticated(false);
    navigate("/sign-in");
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate("/");
  };

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt-token");
    if (jwtToken) {
      setIsAuthenticated(true);
    }
    setAuthChecked(true);

  }, []);

  return (
    <>
      {authChecked && (
        <Header handleLogout={handleLogout} isAuthenticated={isAuthenticated} />
      )}
      <Routes>
        <Route path='/' element={<ProtectedAllCircuits />} />
        <Route path='/sign-in' element={<SignIn handleLogin={handleLogin} isAuthenticated={isAuthenticated} />} />
        <Route path='/sign-up' element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
