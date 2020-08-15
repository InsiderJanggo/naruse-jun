const router = require('express').Router();

const checkAuth = (req, res, next) => {
    if (!req.session.user) return res.redirect('/')
    else return next();
}

router.get('/me', checkAuth, (req, res) => {
    res.render('user', {
        status: (req.isAuthenticated() ? `${req.user.username}#${req.user.discriminator}` : "Logout"),
        client:  req.client.server.client.user,
        user:  req.session.user || null,
        guilds: req.user.guilds.filter(u => (u.permissions & 2146958591) === 2146958591),
        avatarURL:`https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png`,
        iconURL:`https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png?size=32`
    });
});

module.exports = router;