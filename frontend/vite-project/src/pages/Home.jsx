import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const user = localStorage.getItem('user');

  return (
    <div className="container">
      <div className="form-box">
        <h2>🎉 WELCOME</h2>
        <h3>Enjoy your Life</h3>

        <h1 style={{ color: "white", textAlign: "center" }}>
          Welcome {user || "Guest"}
        </h1>

        <button onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Home;