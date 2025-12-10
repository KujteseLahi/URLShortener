# URL Shortener Project

A simple URL shortening service built with React, Express, and MongoDB. This project allows
users to generate shortened URLs, track clicks, set expiration times, and generate QR codes for easy sharing.

---



## Features

- Generate unique short URLs for any full URL.
- Track the number of clicks for each URL.
- Set expiration times for links.
- Display shortened URLs in a sidebar.
- Generate QR codes for each shortened URL.
- Prevent expired links from being accessed.
- Delete shortened URLs.

---

## Tech Stack

Frontend: React, TypeScript, Axios, Bootstrap
Backend: Node.js, Express, TypeScript
Database: MongoDB (via Mongoose)
Other: nanoid for unique short links, qrcode.react for QR code generation

---

## Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB (local or Atlas)
- Git

---

## Setup

### Backend Setup

1. Navigate to the backend folder:

cd backend
npm install
PORT=5001
MONGO_URI=<your_mongodb_connection_string>



2. Navigate to the frontend folder:
cd frontend
npm install
npm start

