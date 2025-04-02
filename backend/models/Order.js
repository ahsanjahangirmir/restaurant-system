// backend/models/Auctions.js

import mongoose from 'mongoose';
import { menuSchema } from './Menu.js'; // Import the auctionSchema from Auctions.js

const orderSchema = new mongoose.Schema({
    menuItems: [{menuSchema, quantity: Number}] ,
    status: { type: String, default: '' },
    totalPrice: { type: Number },
    orderedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' }, // Use ObjectId references
    orderUser: {type: String}
});

const Order = mongoose.model('Order', orderSchema);

export { orderSchema }; // Exporting auctionSchema

export default Order;
