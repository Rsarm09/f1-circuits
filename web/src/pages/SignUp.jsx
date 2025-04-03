import React, {useState} from 'react';
import '../global.css';

export default function SignUp() {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  }


  return (
    <div className='container'>
      <div className='signin-form'>

        <h1>Sign In</h1>
      </div>
    
    
    
    </div>
)
}
