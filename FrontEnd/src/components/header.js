import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const handleLogOut = async () => {
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('authToken');
    alert('Logged Out !!');
    navigate('login');
  };
  return (
    <>
      <h1>Expence Tracker</h1>
      <p class="intro">
        Hello {localStorage.getItem('name')} !!{' '}
        <button class="logout btn btn-sm btn-danger " onClick={handleLogOut}>
          Logout
        </button>
      </p>
    </>
  );
}

export default Header;
