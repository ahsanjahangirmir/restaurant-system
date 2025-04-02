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

  if(username)
  {
      return (
        <div className={styles.home}>
          <nav className={styles.navbarHome}>
            <div className={styles.homeContainer}>
            <div className={styles.navLink} onClick={() => handleNavigate('/customer-home')}>{username}'s Customer Home</div>
              <div className={styles.navbarMenu}>
                  <div className={styles.navLink} onClick={() => handleNavigate('/customer-home')}>Home</div>
                  <div className={styles.navLink} onClick={() => handleNavigate('/customer-menu')}>Menu</div>
                  <div className={styles.navLink} onClick={() => handleNavigate('/customer-profile')}>Profile</div>
                  <div className={styles.navLink} onClick={() =>navigate('/')}>Logout</div>
              </div>
            </div>
          </nav>
          <div className="center-content">
            <button className={styles.homeScreenButton} onClick={() => handleNavigate('/customer-profile')}>
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
