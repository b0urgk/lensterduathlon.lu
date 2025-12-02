require('dotenv').config()
const mongoose = require('mongoose');
const debug = require('debug')('app:mongoose-connection')

// MongoDB connection URI (adjust this if you're using a remote MongoDB instance)

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_HOST}/${process.env.MONGO_DB_NAME}?authSource=admin`);
        debug('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);  // Exit the process if there's an error
    }
};

module.exports = connectDB;
