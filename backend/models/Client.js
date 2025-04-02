// backend/models/User.js

import mongoose from 'mongoose';
// import { auctionSchema } from './Menu.js'; // Import the auctionSchema from Auctions.js

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "Customer"},
  // numItemsOwned: { type: Number, default: 0 },
  // createdAuctions: [auctionSchema] ,
  // createdAuctionsID: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Auction' }] // Use ObjectId references
});

const Client = mongoose.model('Client', clientSchema);

export default Client;
