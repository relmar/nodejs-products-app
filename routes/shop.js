const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.all('/', shopController.getIndex);

router.get('/products', shopController.getProducts);
router.get('/product/:productId', shopController.getProduct);

router.get('/cart', shopController.getCart);
router.post('/cart', shopController.postCart);
router.post('/cart/product/delete', shopController.postCartDeleteProduct);

router.all('/checkout', shopController.getCheckout);

router.all('/orders', shopController.getOrders);

module.exports = router;