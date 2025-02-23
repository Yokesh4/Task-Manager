const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://myUser:myPassword@cluster0.pqziq.mongodb.net/taskManager?retryWrites=true&w=majority&appName=Cluster0", {
           
        });
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("Database Connection Failed", error);
        process.exit(1);
    }
};

module.exports = connectDB;
