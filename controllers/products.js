const Product = require('../models/product')

module.exports.getAddProduct = (req, res, next) => {
    res.render('add-product', { pageTitle: "Add Product" });
}

module.exports.postAddproduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect(302, '/');
}

module.exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop', {
            products: products,
            pageTitle: "Shop"
        });
    })
}