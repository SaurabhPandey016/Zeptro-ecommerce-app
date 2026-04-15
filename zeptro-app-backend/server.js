// Import required dependencies and middleware
import express from "express";
import connectDb from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

// Import route files for different API endpoints
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";

// Load environment variables from .env file
dotenv.config();

// connect to MongoDb Database
connectDb();

// Initialize Express application
const app = express();
const port = process.env.PORT || 3000;
const hostedUrl = process.env.BASE_URL || "https://zeptro-ecommerce-app.onrender.com";

// Swagger documentation configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Zeptro App Backend API",
      version: "1.0.0",
      description: "Swagger documentation for the Zeptro App backend API.",
      contact: {
        name: "Zeptro App Backend"
      }
    },
    servers: [
      {
        url: hostedUrl,
        description: "Hosted backend API"
      },
      {
        url: `http://localhost:${port}`,
        description: "Local development server"
      }
    ],
    components: {
      schemas: {
        Product: {
          type: "object",
          properties: {
            _id: { type: "string", description: "MongoDB document ID" },
            productId: { type: "number" },
            title: { type: "string" },
            price: { type: "number" },
            description: { type: "string" },
            category: {
              type: "object",
              properties: {
                id: { type: "number" },
                name: { type: "string" },
                slug: { type: "string" }
              }
            },
            images: { type: "array", items: { type: "string" } }
          }
        },
        CartItem: {
          type: "object",
          properties: {
            _id: { type: "string" },
            productId: { type: "string" },
            quantity: { type: "number" }
          }
        },
        FavoriteItem: {
          type: "object",
          properties: {
            _id: { type: "string" },
            productId: { type: "string" }
          }
        },
        ErrorResponse: {
          type: "object",
          properties: {
            message: { type: "string" }
          }
        }
      }
    },
    paths: {
      "/products": {
        get: {
          tags: ["Products"],
          summary: "Get all products",
          responses: {
            "200": {
              description: "List of all products",
              content: {
                "application/json": {
                  schema: { type: "array", items: { $ref: "#/components/schemas/Product" } }
                }
              }
            }
          }
        }
      },
      "/products/single/{id}": {
        get: {
          tags: ["Products"],
          summary: "Get a single product by ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" }
            }
          ],
          responses: {
            "200": {
              description: "Single product",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Product" }
                }
              }
            },
            "404": {
              description: "Not found",
              content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } }
            }
          }
        }
      },
      "/products/category/{id}": {
        get: {
          tags: ["Products"],
          summary: "Get products by category ID",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "integer" }
            }
          ],
          responses: {
            "200": {
              description: "Filtered products by category ID",
              content: {
                "application/json": {
                  schema: { type: "array", items: { $ref: "#/components/schemas/Product" } }
                }
              }
            }
          }
        }
      },
      "/products/{category}": {
        get: {
          tags: ["Products"],
          summary: "Get products by category slug",
          parameters: [
            {
              name: "category",
              in: "path",
              required: true,
              schema: { type: "string" }
            }
          ],
          responses: {
            "200": {
              description: "Filtered products by category slug",
              content: {
                "application/json": {
                  schema: { type: "array", items: { $ref: "#/components/schemas/Product" } }
                }
              }
            }
          }
        }
      },
      "/cart": {
        get: {
          tags: ["Cart"],
          summary: "Get shopping cart items",
          responses: {
            "200": {
              description: "Current cart items",
              content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/CartItem" } } } }
            }
          }
        },
        post: {
          tags: ["Cart"],
          summary: "Add a product to cart",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { productId: { type: "string" } },
                  required: ["productId"]
                }
              }
            }
          },
          responses: {
            "200": {
              description: "Cart item created or updated",
              content: { "application/json": { schema: { $ref: "#/components/schemas/CartItem" } } }
            }
          }
        }
      },
      "/cart/increase/{id}": {
        patch: {
          tags: ["Cart"],
          summary: "Increase cart item quantity",
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } }
          ],
          responses: {
            "200": {
              description: "Cart item quantity increased",
              content: { "application/json": { schema: { $ref: "#/components/schemas/CartItem" } } }
            }
          }
        }
      },
      "/cart/decrease/{id}": {
        patch: {
          tags: ["Cart"],
          summary: "Decrease cart item quantity",
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } }
          ],
          responses: {
            "200": {
              description: "Cart item quantity decreased or removed",
              content: { "application/json": { schema: { type: "object" } } }
            }
          }
        }
      },
      "/cart/{id}": {
        delete: {
          tags: ["Cart"],
          summary: "Remove a cart item",
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } }
          ],
          responses: {
            "200": {
              description: "Cart item deleted",
              content: { "application/json": { schema: { type: "object" } } }
            }
          }
        }
      },
      "/favorites": {
        get: {
          tags: ["Favorites"],
          summary: "Get favorite products",
          responses: {
            "200": {
              description: "List of favorite items",
              content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/FavoriteItem" } } } }
            }
          }
        },
        post: {
          tags: ["Favorites"],
          summary: "Add a product to favorites",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { productId: { type: "string" } },
                  required: ["productId"]
                }
              }
            }
          },
          responses: {
            "200": {
              description: "Favorite item created",
              content: { "application/json": { schema: { $ref: "#/components/schemas/FavoriteItem" } } }
            }
          }
        }
      },
      "/favorites/{id}": {
        delete: {
          tags: ["Favorites"],
          summary: "Remove a favorite item by document ID",
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } }
          ],
          responses: {
            "200": {
              description: "Favorite item removed",
              content: { "application/json": { schema: { type: "object" } } }
            }
          }
        }
      },
      "/favorites/product/{productId}": {
        delete: {
          tags: ["Favorites"],
          summary: "Remove a favorite item by product ID",
          parameters: [
            { name: "productId", in: "path", required: true, schema: { type: "string" } }
          ],
          responses: {
            "200": {
              description: "Favorite item removed by product ID",
              content: { "application/json": { schema: { type: "object" } } }
            }
          }
        }
      }
    }
  },
  apis: []
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Enable Cross-Origin Resource Sharing (CORS) for frontend communication
app.use(cors());

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// Swagger UI route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

// Register route handlers for different API endpoints
app.use("/products", productRoutes);      // Routes for product operations (fetch, filter)
app.use("/cart", cartRoutes);              // Routes for shopping cart management
app.use("/favorites", favoriteRoutes);    // Routes for favorite/wishlist management

// Fallback for any unknown route
app.use((req, res) => {
  res.status(404).json({ message: "Route not found. Use /api-docs for API documentation." });
});

// Start server on the specified port
app.listen(port, () =>
  console.log(`Server running on port ${port}`)
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
