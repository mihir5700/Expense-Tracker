const express = require('express');
const expensesController = require('../controller/expensesController');
const router = express.Router();

// Get Current Month+Year Expenses (GET)
router.get('/current', expensesController.getActiveYrMonthExpensesData)

// Get Selected Month+Year Budget and Expenses (GET)
router.get('/history', expensesController.getSelectedYrMonthExpense)

// Create an Expense (POST)
router.post('/add', expensesController.createNewExpense)

// Edit an Expense (PATCH)
router.patch('/edit/:id', expensesController.editExpense)

// Delete an Expense (DELETE)
router.delete('/delete/:id', expensesController.deleteExpense)

module.exports = router