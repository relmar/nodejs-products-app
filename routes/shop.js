const path = require('path');

const adminData = require('./admin');

const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log(adminData.products);
    res.render('shop', { products: adminData.products, pageTitle: "Shop" });
});

module.exports = router;