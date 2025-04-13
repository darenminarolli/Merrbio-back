const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const requestController = require('../controllers/request.controller');

router.get('/', productController.getAllProducts);
router.get('/:id', requestController.getFarmerRequests);
router.post('/', requestController.createRequest);
router.put('/:id', requestController.updateRequestStatus);

module.exports = router;