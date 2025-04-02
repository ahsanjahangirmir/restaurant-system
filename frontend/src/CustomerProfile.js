import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import styles from './Profile.module.css'; // Import the CSS module
import axios from 'axios';

const CustomerProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username;

  const handleNavigate = (path) => {
    navigate(path, { state: { username: username } });
  };

  // State hooks for user details and auctions
  const [userDetails, setUserDetails] = useState({ name: '', numItemsOwned: 0 });
  const [userAuctions, setUserAuctions] = useState([]);

  useEffect(() => {
    // Fetch user details and auctions by username
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/users/${username}`);
        setUserDetails(response.data.user);
        setUserAuctions(response.data.orders);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [username]);

  

  return (
    <div className={styles.profile}>
      {/* Navigation bar */}
      <nav className={styles.navbar}>
            <div className={styles.homeContainer}>
            <div className={styles.navLink} onClick={() => handleNavigate('/customer-home')}>{username}'s Customer Profile</div>
              <div className={styles.navbarMenu}>
                  <div className={styles.navLink} onClick={() => handleNavigate('/customer-home')}>Home</div>
                  <div className={styles.navLink} onClick={() => handleNavigate('/customer-menu')}>Menu</div>
                  <div className={styles.navLink} onClick={() => handleNavigate('/customer-profile')}>Profile</div>
                  <div className={styles.navLink} onClick={() =>navigate('/')}>Logout</div>
              </div>
            </div>
      </nav>


      {/* Profile content */}
      <div className={styles.content}>
        <div className={styles.column}>
          <h3>User Details</h3>
          <p>Name: {userDetails.name}</p>
          <p>Username: {username}</p>
          <p>User Role: {userDetails.role}</p>
        </div>

        <div className={styles.column}>
          <h3>Orders Created</h3>
          {/* List of auctions */}
          <div className={styles.auctionList}>
            {userAuctions.map((auction, index) => (
              <div key={index} className={styles.auctionItem}>
                <p>Bill: {auction.totalPrice}</p>
                <p>Status: {auction.status}</p>
                {/* Display more auction details as needed */}
              </div>
            ))}
          </div>
        </div>

        </div>
      </div>
  );
};

export default CustomerProfile;
