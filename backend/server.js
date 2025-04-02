// backend/server.js 

import { Socket, Server } from "socket.io";
import http from "http";
import { app } from "./app.js";
import { config } from "dotenv";
// import Auctions from "./models/Auctions.js"; // Import your Auction model
// import User from "./models/User.js";
import schedule from 'node-schedule'; // Make sure 'node-schedule' is installed

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

config({
  path: "./config.env",
});

// const clientSocketMap = {}; // Maps client IDs (usernames) to socket IDs

// io.on("connection", (socket) => {

//   let clientId = socket.handshake.query.clientId;
  
//   clientSocketMap[clientId] = socket.id;

//   console.log(`USER CONNECTED || Username: ${clientId} || Socket ID: ${socket.id}`);

//   socket.on('joinRoom', async ({ auctionId }) => 
  
//   {
//     io.to(auctionId).emit('joinUpdate', { message: `${clientId} has joined the auction room.` })

//     const auction = await Auctions.findById(auctionId);

//     if (auction && new Date(auction.endingTime) > new Date()) {
      
//       socket.join(auctionId);

//       schedule.scheduleJob(auction.endingTime, async () => 
      
//       {
        
//         const winningBid = await determineWinningBid(auctionId); // Implement this function based on your auction model

//         if (winningBid) {
//           const user = await User.findOneAndUpdate(
//             { username: winningBid.username },
//             { $inc: { numItemsOwned: 1 } },
//             { new: true }
//           );
//           await user.save();
//         }

//         io.to(auctionId).emit('auctionEnded', { auctionId, redirectPath: '/browse' });

//       });
//     }
//   });

//   socket.on('bid', async ({ auctionId, newBid, username }) => {
    
//     const auction = await Auctions.findById(auctionId);
    
//     if (!auction) return;
    
//     const auctionExists = await User.exists({
//       username: username,
//       createdAuctionsID: { $in: [auctionId] }
//     });

//     if (auctionExists) 

//     {
//       console.log('here')
//       socket.to(auctionId).emit('bidError', { message: 'Auction creator cannot place a bid' });
//     }
    
//     else 

//     {
//       io.to(auctionId).emit('bidUpdate', { auctionId, newPrice: newBid, username: clientId });
//       auction.currentPrice = newBid;
//       auction.lastBidUserId = clientId;
//       await auction.save();
//     }

//   });

//   socket.on('disconnect', () => {
//     console.log("USER DISCONNECTED:", socket.id);
//     // Handle disconnection logic correctly here. 
//   });
// });

// async function determineWinningBid(auctionId) {
//   // Fetch the auction including the last bidder's ID
//   const auction = await Auctions.findById(auctionId).select('lastBidUserId').lean();

//   if (auction && auction.lastBidUserId) {
//     // Return the winning bid details
//     return { username: auction.lastBidUserId };
//   }

//   return null; // Return null if there's no winning bid
// }

server.listen(8000, () => {
  console.log("Server is running on port 8000");
});


