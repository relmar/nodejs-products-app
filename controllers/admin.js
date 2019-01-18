const Product = require('../models/product')

module.exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', { 
        path: '/admin/add-product',
        pageTitle: "Add Product" 
    });
}

module.exports.postAddproduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect(301, '/');
}

module.exports.getEditProduct = (req, res, next) => {
    res.render('admin/edit-product', { 
        path: '/admin/edit-product',
        pageTitle: "Edit Product" 
    });
}

module.exports.getAdminProducts = (req, res, next) => {
    res.render('admin/products', { 
        path: '/admin/products',
        pageTitle: "Admin Products" 
    });
}
