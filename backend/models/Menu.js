// backend/models/Auctions.js

import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
    id: { type: String},
    name: { type: String},
    description: { type: String},
    price: { type: Number },
});

const Menu = mongoose.model('Menu', menuSchema);

export { menuSchema }; // Exporting auctionSchema

export default Menu;
