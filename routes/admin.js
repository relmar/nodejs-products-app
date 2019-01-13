const express = require('express');

const router = express.Router();

router.get('/products', (req, res, next) => {
    res.send('<ul><li>Product 1</li><li>Product 2</li></ul><a href="/">Back</a>');
});

router.post('/add-product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;