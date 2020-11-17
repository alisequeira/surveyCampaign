const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')
const Survey = mongoose.model('surveys');//getting access to survey model
module.exports = (app) => {
    app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
        const { title, subject, body, recipients } = req.body;
        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        });

        //Great place to send a email
        const mailer = new Mailer(survey, surveyTemplate);
    });
};
/**
 *   recipients: recipients.split(',').map(email =>  ({ email: email.trim() }))
 *      this will take the list of emails addresses.
 *      split it into an array and then return an object for every email address in there
 *      with a property of email and the value of the actual email address
 *      trim() will take out any white space in the list of emails
 */