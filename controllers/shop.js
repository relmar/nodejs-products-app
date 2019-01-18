const Product = require('../models/product')

module.exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/product-list', {
            products: products,
            path: '/',
            pageTitle: "Products"
        });
    })
}

module.exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/index', {
            path: '/products',
            products: products,
            pageTitle: "Shop"
        });
    })
}

module.exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        path: '/cart',
        pageTitle: "Your Cart"
    });
}

module.exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: "Checkout"
    });
}