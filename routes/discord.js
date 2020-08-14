const router = require('express').Router();

const { CLIENT_ID,CLIENT_SECRET,REDIRECT_URL,SCOPE } = require('../config');
const fetch = require('node-fetch');
const FormData = require('form-data');

const forceAuth = (req, res, next) => {
    if (!req.session.user) return res.redirect('/authorize')
    else return next();
}

router.get('/', (req, res) => {
    if (req.session.user) return res.redirect('/');

    const authorizeUrl = `https://discord.com/api/oauth2/authorize?client_id=731529070608908318&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauthorize%2Fcallback&response_type=code&scope=identify%20guilds`;
    res.redirect(authorizeUrl);
});

router.get('/callback', (req, res) => {
    if (req.session.user) return res.redirect('/');
    
    const accessCode = req.query.code;
    if (!accessCode) throw new Error('No access code returned frm Discord');

    const data = new FormData();
    data.append('client_id', CLIENT_ID);
    data.append('client_secret', CLIENT_SECRET);
    data.append('grant_type', 'authorization_code');
    data.append('redirect_uri', REDIRECT_URL);
    data.append('scope', SCOPE.join(' '));
    data.append('code', accessCode);

    fetch('https://discordapp.com/api/oauth2/token', {
        method: 'POST',
        body: data
    })
    .then(res => res.json())
    .then(response => {
        fetch('https://discordapp.com/api/users/@me', {
            method: 'GET',
            headers: {
                authorization: `${response.token_type} ${response.access_token}`
            },
        })
        .then(res2 => res2.json())
        .then(userResponse => {
            userResponse.tag = `${userResponse.username}#${userResponse.discriminator}`;
            userResponse.avatarURL = userResponse.avatar ? `https://cdn.discordapp.com/avatars/${userResponse.id}/${userResponse.avatar}.png?size=1024` : null;

            req.session.user = userResponse;
            res.redirect('/');
        });
    });
});

router.get('/me',(req, res) => {

});

router.get('/logout', forceAuth, (req, res) => {
    req.session.destroy();
});

module.exports = router;