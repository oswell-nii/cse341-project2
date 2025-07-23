const router = require('express').Router();

router.get('/', (req, res) => { 
    res.send('Hello World');
});

router.use('/emergency-contacts', require('./emergency-contacts'));

module.exports = router;