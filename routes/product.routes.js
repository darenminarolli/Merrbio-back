const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.get('/farmer/:id', productController.getProductsByFarmerId);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;