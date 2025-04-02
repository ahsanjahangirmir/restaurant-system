import Order from '../models/Order.js';
import Client from '../models/Client.js'; // Import the User model

export const createOrder = async (req, res) => {
    const { cart, totalPrice, username } = req.body;
    // Find the user by username
    const user = await Client.findOne({ username });
  
    try {
      // Create a new auction with the provided data
      const newOrder = new Order({
        menuItems:cart,
        status: "Processing",
        totalPrice: totalPrice,
        orderedBy: user, // Use ObjectId references
        orderUser: username
      });
  
      // Save the new auction to the database
      await newOrder.save();

      console.log("new order",newOrder);
  
      res.status(201).json({ message: 'order created successfully', auction: newOrder });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  };