// 📁 controllers/product.controller.js
const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("farmer", "name")  // Populate the 'farmer' field with only the 'name' field. You can add more fields as needed.
    .exec();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductsByFarmerId = async (req, res) => {
    try {
        const products = await Product.find({ farmer: req.params.id }).populate("farmer", "name");
        if (!products) return res.status(404).json({ message: 'No products found for this farmer' });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.createProduct = async (req, res) => {
    try {
    console.log(req.body);
      const product = new Product({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        farmer: req.body.farmer, 
      });
  
      const savedProduct = await product.save();
  
      res.status(201).json(savedProduct);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

