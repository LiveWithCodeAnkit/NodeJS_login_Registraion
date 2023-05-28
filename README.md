# NodeJS Login and Registration

This is a basic Node.js project that demonstrates user registration and login functionality using JSON Web Tokens (JWT) for authentication and password encryption for improved security.

## Features

- User registration: Users can create an account by providing their username, email, and password. The password is securely encrypted before being stored in the database.
- User login: Registered users can log in using their email and password. Upon successful authentication, a JWT is generated and returned to the client.
- Password decryption: The stored password is encrypted, meaning it cannot be directly accessed. Instead, when a user logs in, their provided password is encrypted and compared against the stored encrypted password for authentication.

