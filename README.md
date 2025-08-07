# 🎓 School Management System - Backend

A robust and scalable backend system for managing a school environment, built using **Node.js**, **Express.js**, and **MongoDB**. This project supports full CRUD operations for **Principal**, **Teacher**, and **Student**, along with secure **Authentication**, **OTP generation and verification**, and **SMS functionality using Twilio**.

---

## 🚀 Features

- ✅ **Authentication** (Login & Signup)
- 🔐 **JWT-based authorization**
- 👨‍🏫 CRUD Operations:
  - **Principal**
  - **Teacher**
  - **Student**
- 🔢 **OTP Generation & Verification**
- 📲 **SMS integration using Twilio**
- 📁 Structured project with **separated routes, controllers, services**
- 🧪 Error handling & status code management
- Add Role-Based Access Control (Admin / Teacher / Student)
---

## 🛠️ Tech Stack

| Technology | Description                     |
|------------|---------------------------------|
| Node.js    | JavaScript runtime              |
| Express.js | Web framework for Node.js       |
| MongoDB    | NoSQL Database                  |
| Mongoose   | MongoDB ODM                     |
| JWT        | Authentication                  |
| Twilio     | SMS service for OTP             |
| dotenv     | Environment variable management |
| nodemon    | Development server              |

---

## 📁 Folder Structure
school-management-backend/
├── config/ # DB and Twilio configuration
├── controllers/ # Business logic for each route
├── routes/ # All route definitions
├── services/ # Service layer to separate logic
├── models/ # Mongoose schemas
├── utils/ # OTP generation, helpers
├── middlewares/ # Auth & error middlewares
├── .env # Environment variables
├── server.js # Server entry point
├── package.json
└── README.md
---

## 🔐 Authentication & OTP Flow

1. User registers or logs in.
2. An OTP is generated using a utility function.
3. OTP is sent to the user’s mobile via **Twilio**.
4. User submits the OTP.
5. OTP is verified and authentication is completed.

---

📬 Twilio Integration

*Twilio is used to send OTPs via SMS to the user's registered phone number.
*The OTP generation logic ensures secure and time-bound verification.

---

## 🧪 Testing

Use [Postman](https://www.postman.com/) or [Thunder Client](https://www.thunderclient.com/) for testing APIs.

Make sure to:
- Set correct headers (e.g., `Content-Type: application/json`)
- Attach Bearer Token in protected routes
- Test OTP flow using your Twilio credentials
## 📮 API Endpoints

### 🔐 Auth Routes

| Method | Endpoint                         | Description                    |
|--------|----------------------------------|--------------------------------|
| POST   | `/api/v1/register`               | Register a new user            |
| POST   | `/api/v1/login`                  | Login with credentials         |
| POST   | `/api/v1/forgotPassword`         | Forgot password flow           |
| POST   | `/api/v1/verifyMobile`           | Send OTP to mobile number      |
| POST   | `/api/v1/verifyMobileotp`        | Verify mobile OTP              |
| POST   | `/api/v1/verifyEmail`            | Send OTP to email              |
| POST   | `/api/v1/verifyEmailOTP`         | Verify email OTP               |

---

### 👨‍🎓 Student Routes

| Method | Endpoint                       | Description                  |
|--------|--------------------------------|------------------------------|
| POST   | `/api/v1/student/Create`       | Create a new student         |
| GET    | `/api/v1/student/fetch/:id`    | Get student by ID            |
| PUT    | `/api/v1/student/update/:id`   | Update student by ID         |
| DELETE | `/api/v1/student/delete/:id`   | Delete student by ID         |

---

### 👨‍🏫 Teacher Routes

| Method | Endpoint                       | Description                  |
|--------|--------------------------------|------------------------------|
| POST   | `/api/v1/teacher/Create`       | Create a new teacher         |
| GET    | `/api/v1/teacher/fetch/:id`    | Get teacher by ID            |
| PUT    | `/api/v1/teacher/update/:id`   | Update teacher by ID         |
| DELETE | `/api/v1/teacher/delete/:id`   | Delete teacher by ID         |

---

### 👩‍🏫 Teacher to Student (Assignment) Routes

| Method | Endpoint                           | Description                         |
|--------|------------------------------------|-------------------------------------|
| POST   | `/api/v1/teachertostudent/:id`     | Assign student(s) to teacher by ID  |
| GET    | `/api/v1/teachertostudent/:id`     | Get student list of a teacher       |
| PUT    | `/api/v1/teachertostudent/:id`     | Update teacher-student assignment   |

---

### 👨‍💼 Principal Routes

| Method | Endpoint                     | Description                |
|--------|------------------------------|----------------------------|
| POST   | `/api/v1/principal/create`   | Create a new principal     |
| GET    | `/api/v1/principal/fetch`    | Get all principals         |
| GET    | `/api/v1/principal/:id`      | Get principal by ID        |
| PUT    | `/api/v1/principal/:id`      | Update principal by ID     |

---

### 👨‍💼 Principal to Teacher Routes

| Method | Endpoint                             | Description                     |
|--------|--------------------------------------|---------------------------------|
| GET    | `/api/v1/principaltoteacher/fetch`   | Get all teachers under principal|
| PUT    | `/api/v1/principaltoteacher/update`  | Update assigned teacher         |
| DELETE | `/api/v1/principaltoteacher/delete/:id` | Remove teacher from principal |

---

### 👨‍💼 Principal to Student Routes

| Method | Endpoint                                | Description                       |
|--------|-----------------------------------------|-----------------------------------|
| GET    | `/api/v1/principaltostudent/fetch/:id`  | Get student(s) under principal    |
| PUT    | `/api/v1/principaltostudent/update/:id` | Update student details under principal |
| DELETE | `/api/v1/principaltostudent/delete/:id` | Delete student from principal list |

---

## 🚧 Future Enhancements

- Add Admin Role with dashboard access
- Add image upload for profiles (Cloudinary/AWS S3)
- Export student/teacher data to Excel or PDF
- Add pagination and filtering in fetch APIs



