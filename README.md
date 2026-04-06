# Finance Data Processing & Access Control Backend

## Description
This project is a **Finance Data Processing and Access Control Backend** built with Node.js and Express. It provides secure, role-based APIs for authentication, managing financial records, and generating dashboard summaries (income, expenses, and category breakdowns) using MongoDB Atlas for storage and JWT for authentication.

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas (via Mongoose)
- **Auth**: JWT (JSON Web Tokens)
- **Security**: Role-based access control (Admin, Analyst, Viewer)

## Features
- **User authentication**: Register & Login
- **Role-based access control**: Admin, Analyst, Viewer
- **Financial records management**: CRUD operations (with access restrictions)
- **Dashboard summary APIs**: totals for income/expense, breakdowns, recent activity
- **Secure APIs**: protected routes using JWT tokens
- **MongoDB Atlas**: cloud database persistence

## Folder Structure
```
app.js
server.js
package.json
.env
src/
  config/
  controllers/
  middleware/
  models/
  routes/
  services/
  utils/
  validators/
```

## Installation Steps
1. Clone the repository:

```bash
git clone <your-repo-url>
cd <your-repo-folder>
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root (next to `server.js`):

```bash
touch .env
```

4. Add your environment variables (see below), then start the server:

```bash
npm start
```

## Environment Variables
Create a `.env` file in the project root with:

```bash
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<db>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
PORT=3000
```

Notes:
- The app reads the database connection string from `process.env.MONGODB_URI` (MongoDB Atlas).
- Keep `.env` out of version control and rotate secrets regularly.

## API Endpoints
Base URL: `http://<host>:<PORT>/api`

### Authentication
- **POST** `/api/auth/register` — Register a user
- **POST** `/api/auth/login` — Login and receive a JWT

### Records
- **POST** `/api/records` — Create a record (JWT required)
- **GET** `/api/records` — Get all records for the logged-in user (JWT required)

### Dashboard
- **GET** `/api/dashboard/summary` — Dashboard summary (JWT required)

## Example Requests (Postman)
Use the header below for protected routes:
- `Authorization: Bearer <YOUR_JWT>`

### Register
**POST** `/api/auth/register`

Body (JSON):
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "secret12"
}
```

### Login
**POST** `/api/auth/login`

Body (JSON):
```json
{
  "email": "jane@example.com",
  "password": "secret12"
}
```

### Create record
**POST** `/api/records`

Headers:
- `Authorization: Bearer <YOUR_JWT>`
- `Content-Type: application/json`

Body (JSON):
```json
{
  "amount": 1500,
  "type": "income",
  "category": "Salary",
  "notes": "April salary"
}
```




