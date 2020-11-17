const mongoose = require('mongoose');
const RecipientSchema = require('./Recipient');

const surveySchema = new mongoose.Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [RecipientSchema],
    yes: {
        type: Number,
        default: 0
    },
    no: {
        type: Number,
        default: 0
    },
    _user: {//set up a relationship between this model and User model
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dataSent: Date,
    lastResponded: Date
});

mongoose.model('surveys', surveySchema);
