import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendUrl } from '../context/globalState';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(sendUrl + '/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const result = await response.json();
    alert(result.message);
    if (result.success) {
      localStorage.setItem('authToken', result.token);
      localStorage.setItem('email', result.email);
      localStorage.setItem('name', result.name);
      navigate('/');
    }
  };
  return (
    <div>
      <h1>Sign In For Expense Tracker</h1>
      <form onSubmit={handleLogin}>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        &nbsp;
        <span>
          <a onClick={navigate('/register')}>New User?</a>
        </span>
        &nbsp; &nbsp;
        <span>
          <a href="/login">Forget Password?</a>
        </span>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
export default Login;
