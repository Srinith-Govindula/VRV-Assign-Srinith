# Role-Based Access Control (RBAC) Backend Project

## **Overview**
This project is a backend implementation for a role-based access control (RBAC) system. It includes user authentication, role-based authorization, and permissions to access protected resources. Built using **Node.js**, **Express.js**, and **MongoDB**, the system ensures that users are authenticated and can only access resources allowed by their roles.

---

## **Features**
- **User Registration:** Allows users to register with roles such as `Admin`, `Moderator`, and `User`.
- **User Login:** Provides secure login functionality with JWT authentication.
- **Role-Based Authorization:** Permissions like `viewUsers` and `updateUserDetails` are assigned to roles, controlling access to specific endpoints.
- **Password Security:** Passwords are hashed using **bcrypt** for enhanced security.
- **JWT Authentication:** Ensures secure session management with JSON Web Tokens.

---

## **Technologies Used**
- **Backend Framework:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **Security:** bcrypt for password hashing
- **Development Tools:** Thunder Client (API testing)

---

## **Setup Instructions**
### **Prerequisites**
1. Node.js and npm installed on your machine.
2. MongoDB database set up locally or on a cloud platform.
3. Environment variables configured in a `.env` file.

