const mongoose = require('mongoose');

const surveySchema = mongoose.Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [String]
});

mongoose.model('surveys', surveySchema);