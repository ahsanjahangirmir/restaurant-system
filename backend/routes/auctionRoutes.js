// backend/routes/auctionRoutes.js

import express from 'express';
import { createAuction, getOngoingAuctions, placeBid } from '../controllers/auctionController.js';

const router = express.Router();

// Route for creating a new auction
router.post('/', createAuction);
router.get('/ongoing', getOngoingAuctions);
router.post('/bid', placeBid);


export default router;
