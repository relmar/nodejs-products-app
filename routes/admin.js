const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/products', adminController.getAdminProducts);
router.get('/product/add', adminController.getAddProduct);
router.post('/product/add', adminController.postAddproduct);
router.get('/product/:productId/edit', adminController.getEditProduct);
router.post('/product/:productId/edit', adminController.postEditProduct);
router.post('/product/:productId/delete', adminController.postDeleteProduct);

module.exports = router;