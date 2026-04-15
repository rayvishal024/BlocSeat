# BlocSeat

BlocSeat is a simple and reliable seat booking system built with Node.js and PostgreSQL.
It focuses on preventing duplicate bookings using database transactions and row-level locking, along with a secure authentication system using JWT.

---

## Features

* User registration and login (JWT-based authentication)
* Protected booking routes
* Prevents duplicate seat booking using database locking (`FOR UPDATE`)
* PostgreSQL integration (Neon supported)
* Simple frontend for authentication and seat booking
* Clean and modular backend architecture

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express
* **Database:** PostgreSQL (Neon)
* **Authentication:** JWT
* **Password Security:** bcrypt
* **Frontend:** HTML, Tailwind CSS

---

## 📁 Project Structure

```bash
.
├── public/
│   └── index.html          # Frontend UI (login + booking)
│
├── src/
│   ├── config/
│   │   └── db.js           # Database connection
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── seat.controller.js
│   │
│   ├── db/
│   │   └── schema.sql      # Table creation queries
│   │
│   ├── middleware/
│   │   └── auth.middleware.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── seat.routes.js
│   │
│   └── validator/
│       └── auth.validator.js
│
├── index.mjs               # Entry point
├── .env                    # Environment variables
├── package.json
├── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd blocseat
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Setup environment variables

Create a `.env` file in the root directory:

```env
PORT=8080
DATABASE_URL=your_neon_connection_string
JWT_SECRET=your_secret_key
```

---

### 4. Setup database

Run the following SQL in your database (Neon or local):

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255)
);

CREATE TABLE seats (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  isbooked INT DEFAULT 0,
  user_id INT
);
```

Insert initial seat data:

```sql
INSERT INTO seats (isbooked)
SELECT 0 FROM generate_series(1, 20);
```

---

### 5. Run the server

```bash
npm run dev
```

Server will run on:

```bash
http://localhost:8080
```

---

## 🔐 API Endpoints

### Auth

* `POST /api/auth/register` → Register a new user
* `POST /api/auth/login` → Login and receive JWT

### Seats

* `GET /api/seats` → Get all seats
* `PUT /api/seats/book/:id` → Book a seat (requires authentication)

---

## 🧪 Testing Flow

1. Register a user
2. Login and get token
3. Access seat list
4. Book a seat
5. Try booking the same seat again (should fail)

---

## 🧠 Key Concept

BlocSeat uses PostgreSQL transactions with **row-level locking (`FOR UPDATE`)** to prevent race conditions and ensure that only one user can book a seat at a time.

---

## 📦 Deployment

* Backend: Render
* Database: Neon

---

## 📌 Notes

* Frontend is minimal and included for demonstration
* Focus of the project is backend architecture and concurrency handling

---

## 👨‍💻 Author

Vishal Ray

---

## ⭐ Acknowledgement

This project was built as part of a backend hackathon assignment to extend an existing codebase with authentication and a protected booking system.
