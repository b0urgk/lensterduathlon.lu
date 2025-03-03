const mongoose = require('mongoose');


const ContentSchema = new mongoose.Schema({
    language: { type: String, required: true },
    page: { type: String, required: true },
    sections: [{
        key: { type: String, required: true },
        value: { type: String, required: true }
    }],
    lastUpdated: { type: Date, required: true }
});

module.exports = mongoose.model('Content', ContentSchema);