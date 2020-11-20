require('../models/Survey')
const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const { path } = require('../models/Recipient');
// const Survey = require('../models/Survey'); //without this my app crash, IDK why but if work it's fine

// const Survey = mongoose.model('surveys').;
const Survey = mongoose.model('surveys');


module.exports = (app) => {
    app.get('/api/surveys/thanks', (req, res) => {
        res.send('THANKS FOR VOTING!');
    });

    app.post('/api/surveys/webhooks', (req, res) => {
        const events = _.map(req.body, ({ email, url }) => {
            const pathname = new URL(url).pathname;
            const p = new Path('/api/surveys/:surveyId/:choice');
            const match = p.test(pathname);
            if (match) return { email, surveyId: match.surveyId, choice: match.choice };
        });
        const compacEvents = _.compact(events);
        const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');

        res.send({});
    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;
        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        });

        // Great place to send an email!
        const mailer = new Mailer(survey, surveyTemplate(survey));

        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();

            res.send(user);
        } catch (err) {
            res.status(422).send(err);
        }
    });
};
/**
 *   recipients: recipients.split(',').map(email =>  ({ email: email.trim() }))
 *      this will take the list of emails addresses.
 *      split it into an array and then return an object for every email address in there
 *      with a property of email and the value of the actual email address
 *      trim() will take out any white space in the list of emails
 */