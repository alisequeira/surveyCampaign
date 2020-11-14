const keys = require('../config/keys');
const tripe = require('stripe')(keys.stripeSecretKey);

module.exports = app => {
    app.post('/api/stripe', (req, res) => { });
};