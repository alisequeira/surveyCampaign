const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
    constructor({ subject, recipients }, content) {
        super();

        this.sgApi = sendgrid(keys.sendGridKey);
        this.from_email = new helper.Email('alisequeira.la.240@gmail.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);

        this.addContent(this.body);
        this.addClickTraking();
        this.addRecipients();
    }

    formatAddresses(recipients) {
        return recipients.map(({ email }) => {
            return new helper.Email(email);
        });
    }
    addClickTraking() {
        const trackingSetting = new helper.TrackingSettings();
        const clickTraking = new helper.ClickTraking(true, true);

        trackingSetting.setClickTracking(clickTraking);
        this.addTrackingSettings(trackingSetting);
    }

    addRecipients() {
        const personalize = new helper.Personalization();
        this.recipients.forEach(recipient => {
            personalize.addTo(recipient);
        });
        this.addPersonalization(personalize);
    }

    async send() {
        const request = await this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });

        const response = this.sgApi.API(request);
        return response;
    }
}
module.exports = Mailer;