const path = require('path');

const express = require('express');

const router = express.Router();

const products = [];

router.get('/products', (req, res, next) => {
    res.render('add-product', { pageTitle: "Add Product" });
});

router.post('/add-product', (req, res, next) => {
    products.push(req.body);
    console.log(req.body);
    res.redirect('/');
});

exports.routes = router;
exports.products = products;