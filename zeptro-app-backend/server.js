// Import required dependencies and middleware
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Import route files for different API endpoints
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";

// Load environment variables from .env file
dotenv.config();

// Initialize Express application
const app = express();

// Enable Cross-Origin Resource Sharing (CORS) for frontend communication
app.use(cors());

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// Connect to MongoDB database using the connection URI from environment variables
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Register route handlers for different API endpoints
app.use("/products", productRoutes);      // Routes for product operations (fetch, filter)
app.use("/cart", cartRoutes);              // Routes for shopping cart management
app.use("/favorites", favoriteRoutes);    // Routes for favorite/wishlist management

// Start server on the specified port
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);

// Export app for serverless deployment platforms (e.g., Vercel)
export default app;


// Archive: for connection to vercel we'll make an aysnc function where we track if server already connected or notl
// let isConnected = false;
// async function connectToMongoDB() {
//   try {
//     await mongoose.connect(process.env.MONGO_URI , {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     isConnected = true;
//     console.log("MongoDB connected");
//   } catch (error) {
//     console.error("MongoDB connection error:", error);
//   }
  
// }

// // add a middle ware;
// app.use((req, res, next) => {
//   if(!isConnected) {
//      connectToMongoDB();
//   }
//   next();
// })



// if (import.meta.url === `file://${process.argv[1]}`) {
//   const port = process.env.PORT || 3000;
//   app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
//   });
// }
