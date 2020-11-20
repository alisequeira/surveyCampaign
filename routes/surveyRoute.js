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
    app.get('/api/surveys', requireLogin, async (req, res) => {
        const Surveys = await Survey.find({ _user: req.user.id });
        res.send(Surveys);
    });

    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('THANKS FOR VOTING!');
    });

    app.post('/api/surveys/webhooks', (req, res) => {
        const p = new Path('/api/surveys/:surveyId/:choice');
        _.chain(req.body)
            .map(({ email, url }) => {
                const match = p.test(new URL(url).pathname);
                if (match) return { email, surveyId: match.surveyId, choice: match.choice };
            })
            .compact()
            .uniqBy('email', 'surveyId')
            .each(({ surveyId, email, choice }) => {
                Survey.updateOne({
                    id: surveyId,
                    recipients: {
                        $elemMatch: { email: email, response: false }
                    }
                }, {
                    $inc: { [choice]: 1 },
                    $set: { 'recipients.$.responded': true },
                    lastResponded: new Date()
                }).exec();
            })
            .value()


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