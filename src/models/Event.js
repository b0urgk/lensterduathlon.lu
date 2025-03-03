const mongoose = require('mongoose');


const EventSchema =  new mongoose.Schema({
    eventTitle: {
        type: String,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    eventEdition: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    schedule: [
        {
            time: {
                type: String, // 24-hour time format (HH:mm)
                required: true
            },
            activity: {
                type: String,
                required: true
            }
        }
    ],
    contactInfo: {
        email: {
            type: String,
            required: true,
            match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
        },
        phone: {
            type: String,
            required: true
        }
    },
    resultsLink: {
        type: 'String',
        required: true
    }
}, { timestamps: true }); // Adding timestamps for createdAt and updatedAt


module.exports = mongoose.model('Event', EventSchema);