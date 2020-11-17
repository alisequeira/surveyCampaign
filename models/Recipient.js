const mongoose = require('mongoose');

const recipientSchema = mongoose.Schema({
    email: String,
    responded: {
        typeK: Boolean,
        default: false
    }
});

module.exports = recipientSchema;