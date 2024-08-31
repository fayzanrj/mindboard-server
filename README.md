# Mindboard Server

Mindboard Server is the backend server for the Mindboard (https://github.com/fayzanrj/mindboard-frontend), a collaborative whiteboard tool that allows multiple users to create, share, and collaborate on interactive whiteboards in real time.

### Features

- **Real-Time Collaboration:** Supports real-time updates and collaboration using `socket.io`.
- **User Authentication:** Managed by Clerk for secure user authentication and session management.
- **User Data Storage:** Saves user data and other application data in MongoDB.
- **Email Notifications:** Sends emails for various events using `nodemailer`.
- **Environment Configuration:** Configurable environment variables using `.env` file.

### Prerequisites

- Node.js (version 14 or higher)
- MongoDB

### Installation

Steps to install project dependencies and get the project running locally.

1. Clone the repository:

   ```sh
   git clone https://github.com/fayzanrj/mindboard-server.git
   ```
   cd mindboard-server

2. Install dependencies

   Run npm install

3. Include environment variables
   - ACCESS_TOKEN
   - DATABASE_URI
   - EMAIL
   - EMAIL_PASS

5. Running

   Run npm run nodemon
   
