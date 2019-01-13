const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    const form = '<form action="/add-product" method="post"><label>Enter name:</label><input type="text" name="name" value=""><input type="submit" value="Submit"></form>';
    res.send(form + '<h1>Hello</h1><a href="/products">Products</a>');
});

module.exports = router;