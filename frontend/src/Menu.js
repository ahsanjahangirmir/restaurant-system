import { useNavigate, Link, useLocation } from 'react-router-dom'; // Import Link and useLocation from react-router-dom
import React from 'react';
import { useState } from 'react';
import styles from './Menu.module.css';
import {useDispatch, useSelector} from 'react-redux';
import { addToCart, incrementQuantity, removeFromCart, decrementQuantity } from './CartReducer';
import axios from 'axios';

const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.username;

  
  // State hook for the notification
  const [showNotification, setShowNotification] = useState(false);

  const handleOrderSubmit = async ()=> {

    let totalPrice = cart.map(element => element.quantity * element.price).reduce((a, b) => a + b, 0);

    console.log(totalPrice)

    try {
      // Send a POST request to the server to create a new auction
      const response = await axios.post('http://localhost:8000/api/orders', {
        cart,
        totalPrice,
        username,
      });

      // Handle success response
      console.log('order created successfully:', response.data);

      // Show notification upon successful submission
      setShowNotification(true);

      // Hide the notification after 3 seconds
      setTimeout(() => setShowNotification(false), 3000);
    } catch (error) {
      // Handle error response
      console.error('Error creating order:', error.response.data);
      // Implement error handling logic as needed
    }
  };

  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);
  const dispatch = useDispatch();

  const items = [
    {
        "id": "1",
        "name": "Burger",
        "description": "Juicy beef patty with lettuce, tomato, and cheese on a sesame seed bun.",
        "price": 10.99
    },
    {
        "id": "2",
        "name": "Pizza",
        "description": "Classic pizza with mozzarella cheese and pepperoni.",
        "price": 12.99
    },
    {
        "id": "3",
        "name": "Pasta",
        "description": "Spaghetti noodles with marinara sauce and meatballs.",
        "price": 9.99
    },
    {
        "id": "4",
        "name": "Salad",
        "description": "Fresh mixed greens with tomatoes, cucumbers, and choice of dressing.",
        "price": 7.99
    },
    {
        "id": "5",
        "name": "Steak",
        "description": "Grilled sirloin steak served with mashed potatoes and vegetables.",
        "price": 16.99
    },
    {
        "id": "6",
        "name": "Fish and Chips",
        "description": "Crispy battered fish served with fries and tartar sauce.",
        "price": 11.99
    }];

  const handleNavigate = (path) => {
    navigate(path, { state: { username: username } });
  };

  const addItemToCart = (item) => {
    dispatch(addToCart(item));
  }

  const remove = (item) => {
    dispatch(removeFromCart(item));
  }

  const increaseQuantity = (item) => 
  {
    dispatch(incrementQuantity(item));

  }
 
  const decreaseQuantity = (item) => 
  {
    if (item.quantity == 1)
    {
        dispatch(removeFromCart(item));
    }
    else
    {

        dispatch(decrementQuantity(item));
    }

  }

  return (
    <div>
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

              {/* Notification */}
      {showNotification && (
        <div className={styles.notification}>
          Order created successfully!
        </div>
      )}

        {cart.length > 0 &&
            <div> 
            <h1 style={{color:'greenyellow'}}>Shopping Cart</h1>
            
                {cart.map((item, index) => 
                {
                    return(
                    <div className={styles.auctionItem}>
                    <h3 style={{color:'white'}}>Name:  {item.name}</h3>
                    <p style={{color:'white'}}>Total Price: {item.price * item.quantity}</p>
                    <button  onClick={() => increaseQuantity(item)}>Increment</button>
                    <p style={{color:"white"}}>{item.quantity}</p>
                    <button  onClick={() => decreaseQuantity(item)}>Decrement</button>
                    </div>
                    )
                }
        
                )}
            <h2 style={{color:"white"}}> TOTAL BILL: {cart.map(element => element.quantity * element.price).reduce((a, b) => a + b, 0)}</h2>
            <button onClick={() => handleOrderSubmit()} style={{backgroundColor:"greenyellow"}}>PLACE ORDER </button>
            </div>
        }

        
        {items.map(function(data) {
          return (
            <div>
              <h3 style={{color:'white'}}>Name:  {data.name}</h3>
              <p style={{color:'white'}}>Description:  {data.description}</p>
              <p style={{color:'white'}}>Price: {data.price}</p>
                {cart.some((value) => value.name == data.name) ?
                (
                    <button onClick={() => remove(data)}> Remove From Cart </button>
                )
                : (
                    <button onClick={() => addItemToCart(data)}> Add To Cart </button>)
                }
              
            </div>
          )
        })}
    </div>
  );
};

export default Menu;