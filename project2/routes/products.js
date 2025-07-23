const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');

// Validation middleware
const validateProduct = (req, res, next) => {
  const { name, price, description } = req.body;

  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'Product name is required and must be a string.' });
  }

  if (price === undefined || typeof price !== 'string') {
    return res.status(400).json({ error: 'Product price is required and must be a string.' });
  }

  if (description && typeof description !== 'string') {
    return res.status(400).json({ error: 'Product description must be a string if provided.' });
  }

  next();
};

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products
 */
router.get('/', productsController.getAllProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a single product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: A product object
 */
router.get('/:id', productsController.getSingleProduct);

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
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: string
 *                 example: "$799.99"
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product created successfully
 */
router.post('/', validateProduct, productsController.createProduct);

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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: string
 *                 example: "$699.99"
 *               description:
 *                 type: string
 *     responses:
 *       204:
 *         description: Product updated successfully
 */
router.put('/:id', validateProduct, productsController.updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 */
router.delete('/:id', productsController.deleteProduct);

module.exports = router;
