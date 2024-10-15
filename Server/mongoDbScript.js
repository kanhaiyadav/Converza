import Message from "./models/message.js";
import User from "./models/user.js";
import mongoose from "mongoose";

// Async function to establish a database connection and perform operations
async function start() {
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb://localhost:27017/WhatsApp');
        console.log("Database connection successful...");

        // Perform user updates inside the same function
        await updateUserStatuses();

    } catch (err) {
        console.error('Problem connecting to the database', err);  // Connection error handling
    } finally {
        mongoose.connection.close(); // Close the connection after the operation
    }
}

// Function to update user statuses
async function updateUserStatuses() {
    try {
        const users = await User.find({}); // Get all users
        const updatePromises = users.map(async (user) => {
            user.status = '';  // Update status to an empty string
            await user.save(); // Save the updated user
        });
        await Promise.all(updatePromises); // Wait for all save operations to complete
        console.log('User statuses updated successfully.');
    } catch (error) {
        console.error('Error updating users:', error);
    }
}

// Call the start function to begin
start();
