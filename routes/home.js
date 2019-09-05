const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('layouts/app');
});

module.exports = router;
