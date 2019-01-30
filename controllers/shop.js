const Cart = require('../models/cart');
const Product = require('../models/product');


module.exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/index', {
            path: '/',
            products: products,
            pageTitle: "Shop"
        });
    })
}


module.exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/product-list', {
            products: products,
            path: '/products',
            pageTitle: "Products"
        });
    })
}


module.exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;

    Product.findById(productId, (product) => {
        res.render('shop/product', {
            product: product,
            path: '/products',
            pageTitle: "Product " + product.title
        });
    })
}


module.exports.getCart = (req, res, next) => {
    Cart.getCart((cartProducts, totalPrice) => {
        Product.fetchAll((products) => {
            let cartProductsDetails = [];

            for (let product of products) {
                const cartProduct = cartProducts.find((cartProduct) => {
                    return cartProduct.id === product.id;
                });

                if (cartProduct) {
                    cartProductsDetails.push({ product: product, quantity: cartProduct.quantity });
                }
            }

            res.render('shop/cart', {
                products: cartProductsDetails,
                total: totalPrice,
                path: '/cart',
                pageTitle: "Your Cart"
            });
        })

    })
}


module.exports.postCart = (req, res, next) => {
    const productId = req.body.productId;

    Product.findById(productId, (product) => {
        Cart.addProduct(product, 1);
        res.redirect('/cart');
    });
}


module.exports.postCartDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;

    Product.findById(productId, (product) => {
        Cart.deleteProduct(product);
        res.redirect('/cart');
    });
}


module.exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: "Checkout"
    });
}


module.exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: "Orders"
    });
}