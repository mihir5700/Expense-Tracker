const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const budgetSchema = new Schema({
    month: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    remarks: {
        type: String,
        required: false
    }
},
{ timestamps: true })

const Budget = mongoose.model('Budget',budgetSchema); // Model/Schema creation for collection: 'budgets'
module.exports = Budget;