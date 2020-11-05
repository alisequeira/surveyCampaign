const passport = require('passport');
module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email'] //optional object that we passed in scope, scope specify to google servers what kind of access we want to have inside of this
    }));

    app.get('/auth/google/callback', passport.authenticate('google'));

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
}
