import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendUrl } from '../context/globalState';
function Register() {
  const [email, setEmail] = useState(null);
  const [otp, setOtp] = useState(null);
  const [name, setName] = useState(null);
  const [password1, setPassword1] = useState(null);
  const [password2, setPassword2] = useState(null);
  const navigate = useNavigate();
  const handleRegister = async () => {};
  const handleSendOtp = async () => {
    const response = await fetch(sendUrl + '/api/auth/otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    });
    const result = await response.json();
    alert(result.message);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(sendUrl + '/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password1: password1,
        password2: password2,
        otp: otp,
      }),
    });
    const result = await response.json();
    alert(result.message);
    if (result.success) {
      navigate('/login');
    }
  };
  return (
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
          <h1 class>Register For Expense Tracker</h1>
          <form onSubmit={onSubmit}>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Email address
              </label>
              <div class="d-flex align-items-center gap-2">
                <input
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  name="email"
                  aria-describedby="emailHelp"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  //   style="max-width: 300px;"
                />
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={handleSendOtp}
                >
                  Get OTP
                </button>
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label">User Name</label>
              <input
                type="text"
                class="form-control"
                name="name"
                aria-describedby="emailHelp"
                onChange={(e) => {
                  setName(e.target.value);
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
                name="password1"
                onChange={(e) => {
                  setPassword1(e.target.value);
                }}
              />
              <label for="exampleInputPassword1" class="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                name="password2"
                onChange={(e) => {
                  setPassword2(e.target.value);
                }}
              />
              <label for="exampleInputPassword1" class="form-label">
                OTP
              </label>
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                name="otp"
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
              />
            </div>

            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Register;
