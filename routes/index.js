const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('index', { pageTitle: 'Naruse Jun - Discord Bot', user: req.session.user || null });
});

module.exports = router;