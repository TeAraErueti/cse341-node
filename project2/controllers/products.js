const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// Helper: Validate product structure
const validateProduct = (product) => {
  return (
    typeof product.name === 'string' &&
    typeof product.price === 'string' &&
    typeof product.category === 'string'
  );
};

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API for managing products
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 */
const getAllProducts = async (req, res) => {
  try {
    const products = await mongodb.getDatabase().collection('products').find().toArray();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a single product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product found
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Product not found
 */
const getSingleProduct = async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid product ID' });
  }

  try {
    const product = await mongodb.getDatabase().collection('products').findOne({ _id: new ObjectId(id) });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, price, category]
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product created
 *       400:
 *         description: Invalid input
 */
const createProduct = async (req, res) => {
  const product = req.body;
  if (!validateProduct(product)) {
    return res.status(400).json({ error: 'Invalid product format' });
  }

  try {
    const result = await mongodb.getDatabase().collection('products').insertOne(product);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create product' });
  }
};

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update an existing product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, price, category]
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: string
 *               category:
 *                 type: string

 *     responses:
 *       204:
 *         description: Product updated
 *       400:
 *         description: Invalid input or ID
 *       404:
 *         description: Product not found
 */
const updateProduct = async (req, res) => {
  const id = req.params.id;
  const product = req.body;

  if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid product ID' });
  if (!validateProduct(product)) return res.status(400).json({ error: 'Invalid product format' });

  try {
    const result = await mongodb.getDatabase().collection('products').replaceOne(
      { _id: new ObjectId(id) },
      product
    );

    if (result.modifiedCount === 0) return res.status(404).json({ error: 'Product not found or no change' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Product not found
 */
const deleteProduct = async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid product ID' });

  try {
    const result = await mongodb.getDatabase().collection('products').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};

