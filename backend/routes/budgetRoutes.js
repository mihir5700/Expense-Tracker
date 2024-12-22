const express = require('express');
const budgetsController = require('../controller/budgetsController');
const router = express.Router();

// Create a Budget (POST)
router.post('/create', budgetsController.createBudget)

// Edit a Budget (PATCH)
router.patch('/edit', budgetsController.editBudget)

// Get Year Wise Budgets (GET)
router.get('/get/:year', budgetsController.getSelectedYearWiseBudgets)

module.exports = router