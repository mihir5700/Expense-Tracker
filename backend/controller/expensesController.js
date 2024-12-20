const Expense = require('../model/expenseModel');

const getActiveYrMonthExpensesData = (req, res) => {
    res.json({"message":"Get Active Year/Month Expenses"});
}

const getSelectedYrMonthExpense = (req, res) => {
    res.json({"message":"Get Selected Year/Month Expenses"});
}

const validateDataExistence = async (category, date) => {
    try {
        const fetchParameters = {category: category || 0, date: date || 0};
        const fetchData = await Expense.findOne(fetchParameters).lean();
        if(fetchData != null && fetchData != undefined && fetchData._id.toString().length > 0)
            return true;
        else
            return false;
    }
    catch(err) {
        console.log(err);
        return null;
    }
}

const createNewExpense = async (req, res) => {
    try {
        const saveBody = new Expense(req.body);
        const duplicateDataExists = await validateDataExistence(saveBody.date, budgetBody.category);
        if(duplicateDataExists)
            res.status(200).json({"message": "Expense already exists for the given date and category"});
        else{
            const saveResult = await Expense.create(saveBody); 
            res.status(200).json(saveResult);
        }
    }
    catch(error) {
        if(error && error.message){
            res.status(404).json({ error: error.message });
        }
        else{
            res.status(404).json({ error: "Failed to create a budget" });
        }
    }
}

const editExpense = (req, res) => {
    res.json({"message":"Edit Expense"});
}

const deleteExpense = (req, res) => {
    res.json({"message":"Delete Expense"});
}

module.exports = {
    getActiveYrMonthExpensesData,
    getSelectedYrMonthExpense,
    createNewExpense,
    editExpense,
    deleteExpense
}