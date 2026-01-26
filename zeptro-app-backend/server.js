import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/favorites", favoriteRoutes);

app.listen(process.env.PORT, () =>
  console.log("Server running on port 3000")
);


// for connection to vercel we'll make an aysnc function where we track if server already connected or notl
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

// export default app;

// if (import.meta.url === `file://${process.argv[1]}`) {
//   const port = process.env.PORT || 3000;
//   app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
//   });
// }
