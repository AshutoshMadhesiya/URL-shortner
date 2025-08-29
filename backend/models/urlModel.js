const mongoose = require('mongoose');
const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    visitedHistory: {
        type: [{ date: Date }],
        default: []
    }
})

module.exports = mongoose.model('URL', urlSchema);