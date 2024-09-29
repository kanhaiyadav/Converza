import Message from "./models/message.js";
import mongoose from "mongoose";

try {
    await mongoose.connect('mongodb://localhost:27017/WhatsApp');
    console.log("Database connection successful...");  // Connection success message
} catch (err) {
    console.error('Problem connecting to the database', err);  // Connection error handling
}

async function fun() {
    try {
        const messages = await Message.find({ status: { $exists: true } }); // Find all users with phoneNo field

        for (const message of messages) {
            console.log(message); // Save the updated user document
        }

        console.log(`Updated ${messages.length} users with phoneNo.`);
    } catch (error) {
        console.error('Error updating users:', error);
    } finally {
        mongoose.connection.close(); // Close the connection after the operation
    }
}

// Call the function
fun();