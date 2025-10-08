import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSignup = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/signup', {
        email,
        password,
      });
      alert('Signup Successful');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.msg || 'Error Signing up');
    }
  };
  return (
    <div>
      <h2>Signup</h2>
      <input
        type='email'
        placeholder='Enter your email'
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='password'
        placeholder='Enter your password'
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>SignUp</button>
    </div>
  );
};

export default Signup;
