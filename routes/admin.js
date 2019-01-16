const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

router.get('/products', productsController.getAddProduct);
router.post('/add-product', productsController.postAddproduct);

module.exports = router;