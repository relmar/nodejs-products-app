const Product = require('../models/product')

module.exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        formAction: '/admin/product/add',
        path: '/admin/product/add',
        pageTitle: "Add Product"
    });
}


module.exports.postAddproduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;

    const prod = new Product(null, title, imageUrl, description, price);
    prod.save();

    res.redirect(301, '/admin/products');
}


module.exports.getEditProduct = (req, res, next) => {
    const productId = req.params.productId;

    Product.findById(productId, product => {
        res.render('admin/edit-product', {
            formAction: '/admin/product/' + productId + '/edit',
            path: '/admin/product/' + productId + '/edit',
            pageTitle: "Edit Product",
            product: product,
            edit: true
        });
    })
}


module.exports.postEditProduct = (req, res, next) => {
    const productId = req.params.productId;

    Product.findById(productId, product => {
        const title = req.body.title;
        const imageUrl = req.body.imageUrl;
        const description = req.body.description;
        const price = req.body.price;

        const prod = new Product(productId, title, imageUrl, description, price);
        prod.save();

        res.redirect(301, '/admin/products');
    });
};


module.exports.postDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.deleteById(productId);
    res.redirect(301, '/admin/products');
};


module.exports.getAdminProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products', {
            products: products,
            path: '/admin/products',
            pageTitle: "Admin Products"
        });
    })
}
