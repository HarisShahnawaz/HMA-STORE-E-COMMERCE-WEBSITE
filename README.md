# 🛍️ HmaStore — E-Commerce Web Application

![HmaStore Banner](./assets/screenshots/banner.png)

> A modern, full-stack e-commerce web application built with React, Node.js, Express, and MongoDB.

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## 📖 About the Project

HmaStore is a fully featured e-commerce platform that allows users to browse products, manage a shopping cart, place orders, and complete secure payments — all through a clean and responsive UI.

---

## ✨ Features

- 🔐 User authentication (Register / Login / Logout)
- 🛒 Shopping cart with real-time updates
- 📦 Product listing, search, and filtering
- 💳 Checkout and order management
- 👤 User profile and order history
- 🛠️ Admin dashboard for product & order management
- 📱 Fully responsive design (mobile-first)
- 🌙 Dark / Light mode support

---

## 🧰 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| [React](https://react.dev/) | UI library |
| [Vite](https://vitejs.dev/) | Build tool & dev server |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [React Router](https://reactrouter.com/) | Client-side routing |
| [Axios](https://axios-http.com/) | HTTP requests |

### Backend
| Technology | Purpose |
|---|---|
| [Node.js](https://nodejs.org/) | JavaScript runtime |
| [Express.js](https://expressjs.com/) | REST API framework |
| [MongoDB](https://www.mongodb.com/) | NoSQL database |
| [Mongoose](https://mongoosejs.com/) | MongoDB ODM |
| [JWT](https://jwt.io/) | Authentication tokens |
| [bcrypt](https://www.npmjs.com/package/bcrypt) | Password hashing |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18+
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (local) or a [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

---

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/hmastore.git
   cd hmastore
   ```

2. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../server
   npm install
   ```

---

### Environment Variables

Create a `.env` file inside the `server/` directory and add the following:

```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB
MONGO_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# (Optional) Payment Gateway
STRIPE_SECRET_KEY=your_stripe_secret_key
```

Create a `.env` file inside the `client/` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

---

### Running the App

**Start the backend server:**
```bash
cd server
npm run dev
```

**Start the frontend (in a new terminal):**
```bash
cd client
npm run dev
```

The app will be available at **https://hma-store-e-commerce-website.vercel.app/**

---

## 📁 Project Structure

```
hmastore/
├── client/                  # React frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/          # Images, icons
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Route-level pages
│   │   ├── context/         # React context (auth, cart)
│   │   ├── hooks/           # Custom hooks
│   │   ├── services/        # API call functions
│   │   └── main.jsx
│   ├── index.html
│   └── vite.config.js
│
├── server/                  # Node.js backend
│   ├── config/              # DB connection, env config
│   ├── controllers/         # Route handler logic
│   ├── middleware/           # Auth, error handling
│   ├── models/              # Mongoose schemas
│   ├── routes/              # Express routes
│   └── index.js
│
└── README.md
```

---

## 📸 Screenshots

> Add your screenshots here

| Home Page | Product Page | Cart |
|---|---|---|
| ![Home](./assets/screenshots/home.png) | ![Product](./assets/screenshots/product.png) | ![Cart](./assets/screenshots/cart.png) |

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT |

### Products
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/products` | Create product (Admin) |
| PUT | `/api/products/:id` | Update product (Admin) |
| DELETE | `/api/products/:id` | Delete product (Admin) |

### Orders
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/orders` | Place an order |
| GET | `/api/orders/my` | Get logged-in user's orders |
| GET | `/api/orders` | Get all orders (Admin) |
| PUT | `/api/orders/:id` | Update order status (Admin) |

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m "Add your feature"`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please make sure your code follows the existing style and passes any linting checks.

---

## 📄 License

This project is licensed under the [MIT License].

---

## 📬 Contact

**HmaStore Team**

- GitHub: [HarisShahnawaz](https://github.com/HarisShahnawaz)
- Email: harisshahnawaz97@gmail.com

---

<p align="center">Made with ❤️ by the HmaStore Team</p>
