import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.email || !form.password) return setMessage("All fields are required");
    
    try {
      const res = await axios.post('http://localhost:5000/login', form);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="form-control mb-2"/>
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="form-control mb-2"/>
        <button type="submit" className="btn btn-primary">Login</button>
        {message && <p className="mt-3">{message}</p>}
      </form>
    </div>
  );
}

export default Login;
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", email);  // Add this line for debugging

  const user = await User.findOne({ email });
  if (!user) {
    console.log("User not found");
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    console.log("Password does not match");
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  console.log("Login successful");
  res.json({ message: 'Login successful' });
});
