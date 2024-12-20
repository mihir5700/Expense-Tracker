const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category',
        required: true
    },
    budget: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Budget',
        required: true
    },
    spent: {
        type: Number,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    remarks: {
        type: String,
        required: false
    }
},
{ timestamps: true })

const Expense = mongoose.model('Expense',expenseSchema); // Model/Schema creation for collection: 'expenses'
module.exports = Expense;