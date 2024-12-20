const express = require('express');
const categoriesController = require('../controller/categoriesController');
const router = express.Router();

// Create a Category (POST)
router.post('/create', categoriesController.createCategory)

// Get a Category by it's Id (GET)
router.get('/get/:id', categoriesController.getCategoryById)

// Get a Category by it's Description (GET)
router.get('/get/category', categoriesController.getCategoryByDescription)

// Get all Categories (GET)
router.get('/get', categoriesController.getAllCategories)

// Edit a Category (PATCH)
router.patch('/edit', categoriesController.editCategory)

// Delete a Category (DELETE)
router.delete('/delete/:id', categoriesController.deleteCategory)

module.exports = router