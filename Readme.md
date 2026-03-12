# 🛒 Zeptro – Full Stack E-Commerce Application (MERN)

<p align="center">
  <img src="https://img.shields.io/badge/React-Frontend-blue?logo=react" />
  <img src="https://img.shields.io/badge/Node.js-Backend-green?logo=node.js" />
  <img src="https://img.shields.io/badge/Express-API-black?logo=express" />
  <img src="https://img.shields.io/badge/MongoDB-Database-darkgreen?logo=mongodb" />
  <img src="https://img.shields.io/badge/Context%20API-State%20Management-orange" />
  <img src="https://img.shields.io/badge/Status-Full%20Stack%20Complete-success" />
</p>

---

## 🚀 Project Overview

**Zeptro** is a **full-stack e-commerce web application** built using the **MERN stack**.  
It demonstrates **real-world frontend + backend integration**, scalable architecture, and production-ready coding practices.

This project is designed to reflect **industry-level skills** expected by modern software companies.

---

## 🎯 Core Features

### 🖥️ Frontend
- Product listing & categories
- Add to cart functionality
- Wishlist (Favorites)
- Single product detail page
- Pagination & filtering
- Global state management
- Responsive UI

### 🛠️ Backend
- RESTful APIs
- MongoDB data models
- Cart & Favorite persistence
- Product management
- Seed data functionality
- MVC architecture

---

## 🧠 Tech Stack

### Frontend
| Technology | Purpose |
|----------|--------|
| **React 18** | UI Development |
| **Vite** | Fast Build Tool |
| **Context API** | Global State Management |
| **React Router** | Client-side Routing |
| **TailwindCSS** | Styling |

---

### Backend
| Technology | Purpose |
|----------|--------|
| **Node.js** | Runtime Environment |
| **Express.js** | Web Framework |
| **MongoDB** | Database |
| **Mongoose** | ODM |
| **dotenv** | Environment Variables |
| **CORS** | Cross-Origin Requests |
| **Nodemon** | Development Tool |

---

## 🏗️ Project Architecture

```text
Frontend (React)
→ Context API
→ API Calls
→ Backend (Express)
→ MongoDB Database

📂 Frontend Structure

src/
├── components/
│   ├── Navbar.jsx
│   ├── ProductCard.jsx
│   ├── Carousel.jsx
│   ├── Category.jsx
│   ├── FilterSection.jsx
│   ├── Pagination.jsx
│   ├── BreadCrums.jsx
│   └── MidBanner.jsx
│
├── context/
│   ├── CartContext.jsx
│   ├── FavoriteContext.jsx
│   └── DataContext.jsx
│
├── pages/
│   ├── Products.jsx
│   ├── CategoryProduct.jsx
│   ├── SingleProduct.jsx
│   ├── Cart.jsx
│   └── Favorites.jsx
│
├── App.jsx
└── main.jsx

📂 Backend Structure (MVC)

backend/
├── models/
│   ├── Product.js
│   ├── Cart.js
│   └── Favorite.js
│
├── controllers/
│   ├── productController.js
│   ├── cartController.js
│   ├── favoriteController.js
│   └── seedController.js
│
├── routes/
│   ├── productRoutes.js
│   ├── cartRoutes.js
│   └── favoriteRoutes.js
│
├── server.js
├── .env
└── package.json
```

### 🔁 State Management (Frontend)

Context API Used Instead of Redux

Simpler setup
Less boilerplate
Ideal for medium-scale apps

Contexts Implemented
Context	Responsibility
DataContext	Product data
CartContext	Cart operations
FavoriteContext	Wishlist logic

### 🔄 Backend API Design

Product APIs
GET /api/products
GET /api/products/:id

Cart APIs
POST /api/cart
GET /api/cart
DELETE /api/cart/:id

Favorite APIs
POST /api/favorites
GET /api/favorites
DELETE /api/favorites/:id

Seed API
POST /api/seed

## 🗄️ Database Models (MongoDB)

Product Model

name
price
category
image
description

### Cart Model

product reference
quantity

## Favorite Model
product reference

### 🔐 Environment Variables
PORT=5000
MONGO_URI=your_mongodb_connection_string

### 🧪 Development Scripts

### Frontend
npm install
npm run dev

### Backend
npm install
npm run server

### 🧠 Key Engineering Decisions

Context API over Redux
✔ Faster development
✔ Cleaner code

MVC architecture in backend
✔ Scalable
✔ Industry standard

RESTful APIs
✔ Clear separation
✔ Easy frontend integration

### 🔄 Redux Compatibility

This project follows Redux principles:
Single source of truth
Predictable updates
Unidirectional data flow
👉 Can be easily migrated to Redux Toolkit + Thunk.

### 🎯 What This Project Demonstrates

✔ Full-stack development skills
✔ API design & integration
✔ State management knowledge
✔ Clean architecture
✔ Interview-ready coding practices

### 👨‍💻 Author
Saurabh Pandey
Frontend & Backend Developer

📌 This project is part of my professional portfolio and interview preparation.

## ⭐ For Recruiters / Interviewers
Zeptro demonstrates my ability to design, build, and integrate a complete full-stack application using modern technologies and best practices.

