const mongoose = require('mongoose');

const recipientSchema = new mongoose.Schema({
    email: String,
    responded: {
        typeK: Boolean,
        default: false
    }
});

module.exports = recipientSchema;