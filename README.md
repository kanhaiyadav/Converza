<p align="center">
  <img src="https://github.com/kanhaiyadav/Converza/blob/master/client/public/android-chrome-512x512.png?raw=true" alt="Invictus Logo" width="200">
</p>

# Converza

Converza is a real-time chat application built with the MERN (MongoDB, Express, React, Node.js) stack and Socket.io. It enables users to have seamless conversations with real-time message delivery, seen status, and a modern UI.  
Production Deploy: [https://converza.kanhaiya.me](https://converza.kanhaiya.me)     
Video Preview: [https://youtu.be/Hi-g3dInSLg?si=eQUxfyhcE_TV5dWv](https://youtu.be/Hi-g3dInSLg?si=eQUxfyhcE_TV5dWv)


## Features

- **Real-time messaging**: Instant message delivery using Socket.io
- **User authentication**: Secure login and registration
- **Message seen status**: Users can check if their message has been seen
- **Responsive UI**: Optimized for both desktop and mobile devices
- **Persistent chat history**: Messages are stored in MongoDB for future reference
- **In app Notifications**: Get notified about new messages

## Tech Stack

### Frontend
- React.js (Create React App)
- Styled Components (as CSS framework for styling)
- React Router (for navigation)
- Redux (for state management)

### Backend
- Node.js with Express.js
- MongoDB with Mongoose ORM
- JWT authentication
- WebSockets using Socket.io

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## Installation

### Prerequisites
- git cli
- Node.js (v20.15.0 or later)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/converza.git
   cd converza
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd server
   npm install
   
   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. **Configure environment variables**  
   Create a `.env` file in the root of `server` directory and set up the following variables:
   ```env
    DB_URI=mongodb+srv://kanhaiya2004yadav:uRVjS9MsGp28yoN4@cluster0.ootts.mongodb.net/Converza?retryWrites=true&w=majority&appName=Cluster0
   ```
   Create a `.env` file in the root of `client` directory and set up the following variables:
   ```env
   REACT_APP_SERVER_URI=http://localhost:3000
   ```

4. **Run the application**
   ```bash
   # Start the backend
   cd server
   npm start
   
   # Start the frontend
   cd ../client
   npm start
   ```

5. **Access the application**
   Open `http://localhost:5173` in your browser.

## Future Enhancements
- **Group Conversation**
- **Voice and video calling**
- **End-to-end encryption**
- **Message reactions and replies**
- **Profile customization**
- **Status updates**

## Contributing
If you'd like to contribute, please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License.

## Contact
For any issues or feature requests, feel free to reach out at [kanhaiyadav.me@gmail.com](kanhaiyadav.me@gmail.com) or open an issue on GitHub.

