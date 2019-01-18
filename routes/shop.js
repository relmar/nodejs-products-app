const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.all('/', shopController.getIndex);
router.all('/products', shopController.getProducts);
router.all('/cart', shopController.getCart);
router.all('/checkout', shopController.getCheckout);

module.exports = router;