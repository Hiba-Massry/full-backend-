Full Backend Project: User Management System 

Version: 1.0 
Creator: Hiba Massry 
Date: 20/11/2024 

---
Project Overview 
This project is a fully functional backend system designed for user management. It provides a range of API endpoints to handle user-related operations such as registration, authentication, user data updates, deletion, and viewing  lists of users. The system also includes robust validation, secure password storage, and token-based authentication. 
---
Features 
- User Registration: 
 Allows users to sign up with a unique username, valid email, and a strong password that meets security standards. 
- User Authentication: 
 Sign in users using their email and password to generate a JSON Web Token (JWT) for secure communication. 
- CRUD Operations: 
 - Create, read, update, and delete user accounts. 
 - Fetch all user data as a list. 
- Data Management: 
 Includes a feature to clear all user data from the database. 
- Validation: 
 Validates user input for email, username, and password using defined rules to ensure data integrity. 
- Security: 
 - Passwords are hashed using `bcrypt.js` before storing in the database. 
 - JWT tokens are used for secure authentication, signed with a secret key. 
---
 API Endpoints 
URL: 
http://localhost:5000

### Endpoints: 
- `POST /api/users/signup` - Register a new user. 
- `POST /api/users/signin` - Authenticate an existing user. 
- `GET /api/users` - Fetch a list of all users. 
- `DELETE /api/users/:userId` - Delete a user by ID. 
- `DELETE /api/users/clear-all` - Clear all data in the database. 

---

## Testing 
The project includes a comprehensive set of test cases to validate functionality, attached in excel file, based on postman expected result.
****** option to add project structure includes folders and files.