# Gym Class Scheduling and Membership Management System

## Project Overview

The Gym Class Scheduling and Membership Management System is designed to manage gym operations efficiently with three defined roles—Admin, Trainer, and Trainee. Each role has specific responsibilities:

* **Admin**: Manages trainers, schedules classes, assigns trainers.
* **Trainer**: Views assigned class schedules.
* **Trainee**: Manages their profile and books available class schedules.

The system includes business logic enforcing class and booking limits to ensure streamlined operations.

---

## 🧩 Relational Diagram

You can view the relational diagram here:
**\[Insert your diagram link or image here]**

---

## 🛠️ Technology Stack

* **Language:** TypeScript
* **Framework:** Express.js
* **Database:** MongoDB 
* **ORM/ODM:**   Mongoose
* **Authentication:** JWT (JSON Web Tokens)

---

## 🔐 Authentication Roles & Permissions

* **Admin:** Create/manage trainers, schedule classes, assign trainers.
* **Trainer:** View assigned schedules.
* **Trainee:** Book classes, manage personal profile.

---

## 📘 API Endpoints

### Auth

* `POST /api/auth/register` - Register a new user
* `POST /api/auth/login` - Login and receive JWT token

### Admin

* `POST /api/admin/trainers` - Create trainer
* `POST /api/admin/schedules` - Create schedule (max 5/day)
* `GET /api/admin/schedules` - Get all schedules

### Trainer

* `GET /api/trainer/schedules` - View assigned schedules

### Trainee

* `GET /api/schedules` - View all available schedules
* `POST /api/bookings` - Book a class
* `DELETE /api/bookings/:id` - Cancel booking

---

## 🗂️ Database Schema (Model Definitions)

### User

* `id`: string
* `name`: string
* `email`: string
* `password`: string (hashed)
* `role`: enum (admin, trainer, trainee)

### Trainer

* `id`: string
* `userId`: string (references User)

### Schedule

* `id`: string
* `date`: Date
* `startTime`: Date
* `endTime`: Date
* `trainerId`: string (references Trainer)
* `traineeIds`: string\[] (references User)

### Booking

* `id`: string
* `scheduleId`: string (references Schedule)
* `traineeId`: string (references User)

---

## ✅ Business Rules

* **Max 5 schedules per day**
* **Each class lasts 2 hours**
* **Max 10 trainees per schedule**
* **No multiple bookings for same time slot**
* **Class is full => no booking allowed**

---

## 🔒 Error Handling (Sample Responses)

### Validation Error

```json
{
  "success": false,
  "message": "Validation error occurred.",
  "errorDetails": {
    "field": "email",
    "message": "Invalid email format."
  }
}
```

### Unauthorized Access

```json
{
  "success": false,
  "message": "Unauthorized access.",
  "errorDetails": "You must be an admin to perform this action."
}
```

### Booking Limit Exceeded

```json
{
  "success": false,
  "message": "Class schedule is full. Maximum 10 trainees allowed per schedule."
}
```

### Success Response

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Class booked successfully",
  "data": {
    // your booked schedule object
  }
}
```

---

## ⚙️ How to Run Locally

```bash
git clone https://github.com/jewel1269/sm-technology.git
cd gym-management-system
npm install
npm start
```

Create a `.env` file:

```
PORT=5000
JWT_SECRET=your_jwt_secret
DATABASE_URL=your_mongodb
```

---

## 🌐 Live Hosting Link

**\[https://sm-technology-green.vercel.app/]**

---

## 🔑 Admin Credentials for Testing

```txt
Email: smadmin@gmail.com
Password: sm@123
```

---

## 🧪 Testing Instructions

* Login as Admin ➝ Create trainers, schedule classes
* Login as Trainer ➝ View assigned class schedules
* Login as Trainee ➝ View schedules, book or cancel a class


