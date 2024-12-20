const Budget = require('../model/budgetModel');

/**
 * Method to fetch year wise budgets
 */
const getSelectedYearWiseBudgets = async (req, res) => {
    try {
        const year = req.params.year || 0;
        if(year == null || year == undefined || year <= 0)
            res.status(404).json({ error: "Year not found!" })
        else {
            const fetchData = await Budget.find({ year: Number(year) }).select("month budget remarks").lean();
            if(fetchData != null && fetchData != undefined && fetchData.length > 0)
                res.status(200).json(fetchData);
            else
                return res.status(200).json({"message":"No Data Records Found"});
        }
    }
    catch(err) {
        console.log(err);
        return null;
    }
}

/**
 * Method to validate existence of a duplicate budget as per the mentioned year and month
 */
const validateDataExistence = async (year, month) => {
    try {
        const fetchParameters = {year: year || 0, month: month || 0};
        const fetchData = await Budget.findOne(fetchParameters).lean();
        if(fetchData != null && fetchData != undefined && Number(fetchData.budget) > 0 )
            return true;
        else
            return false;
    }
    catch(err) {
        console.log(err);
        return null;
    }
}

/**
 * Method to create a budget
 */
const createBudget = async (req, res) => {
    try {
        const budgetBody = new Budget(req.body) || {};
        if(budgetBody == null || budgetBody == undefined  || budgetBody == {})
            res.status(404).json({ error: "Insufficient Parameters to create a budget!" });
        else {
            const duplicateDataExists = await validateDataExistence(budgetBody.year, budgetBody.month);
            if(duplicateDataExists)
                res.status(200).json({"message": "Budget already exists for the given month and year"});
            else{
                const createResult = await Budget.create(budgetBody);
                res.status(200).json(createResult);
            }
        }
    }
    catch (error) {
        if(error && error.message){
            res.status(404).json({ error: error.message });
        }
        else{
            res.status(404).json({ error: "Failed to create a budget" });
        }
    }
}

/**
 * Method to edit a budget
 */
const editBudget = async (req, res) => {
    try {
        const budgetBody = new Budget(req.body) || {};
        if(budgetBody == null || budgetBody == undefined  || budgetBody == {})
            res.status(404).json({ error: "Insufficient Parameters to update!" });
        else {
            const updateResult = await Budget.findByIdAndUpdate(budgetBody._id.toString(), 
                                                                {$set: {budget: Number(budgetBody.budget), remarks: String(budgetBody.remarks)}}, 
                                                                {new: true});
            res.status(200).json({updateResult});
        }
    }
    catch(error) {
        if(error && error.message){
            res.status(404).json({ error: error.message });
        }
        else{
            res.status(404).json({ error: "Failed to upate budget" });
        }
    }
}

module.exports = {
    createBudget,
    editBudget,
    getSelectedYearWiseBudgets
}