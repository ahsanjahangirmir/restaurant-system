import React, { useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom'; // Import Link and useLocation from react-router-dom
import styles from './Home.module.css'; // Import the CSS module


const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.username;

  const handleNavigate = (path) => {
    navigate(path, { state: { username: username } });
  };
  
  if (username)
  {
    return (
      <div className={styles.home}>
          <nav className={styles.navbarHome}>
            <div className={styles.homeContainer}>
            <div className={styles.navLink} onClick={() => handleNavigate('/emp-home')}>{username}'s Employee Home</div>
              <div className={styles.navbarMenu}>
                  <div className={styles.navLink} onClick={() => handleNavigate('/emp-home')}>Home</div>
                  <div className={styles.navLink} onClick={() => handleNavigate('/emp-profile')}>Profile</div>
                  <div className={styles.navLink} onClick={() =>navigate('/')}>Logout</div>
              </div>
            </div>
          </nav>
        <div className="center-content">
          <button className={styles.homeScreenButton} onClick={() => handleNavigate('/emp-profile')}>
          <span className={styles.box}>
              Browse Profile
          </span>
          </button>
        </div>

 
      </div>
    );
  }
};

export default Home;
