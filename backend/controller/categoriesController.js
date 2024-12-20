const Category = require('../model/categoryModel');
const HelperService = require('../services/helperService');

/**
 * Method to create a category which also validates existence of duplicate data
 */
const createCategory = async (req, res) => {
    try {
        const categoryBody = new Category(req.body) || {};
        if(categoryBody == null || categoryBody == undefined  || categoryBody == {})
            res.status(404).json({ error: "Invalid Parameters !" });
        else if(categoryBody.category == null || categoryBody.category == "" || categoryBody.category.length <= 0)
            res.status(404).json({ error: "Please enter a category" });
        else {
            const duplicateDataExists = await validateDuplicateCategory(categoryBody.category);
            if(duplicateDataExists)
                res.status(200).json({"message": "This category already exists"});
            else{
                const createResult = await Category.create(categoryBody);
                res.status(200).json(createResult);
            }
        }
    }
    catch(error) {
        handleErrorMessages(error, "Failed to create category", res);
    }
}

/**
 * Method to validate existence of duplicate category data
 */
const validateDuplicateCategory = async(category) => {
    try {
        const fetchParameters = {category: category || ""};
        const fetchData = await Category.findOne(fetchParameters).lean();
        if(fetchData != null && fetchData != undefined && fetchData.category.length > 0 )
            return true;
        else
            return false;
    }
    catch(error) {
        handleErrorMessages(error, "Failed to validate the duplicate data", res);
    }
}

/**
 * Method to fetch a category by it's objectId
 */
const getCategoryById = async (req, res) => {
    try {
        const id = String(req.params.id) || ""
        if(id == null || id == undefined || id == "" || id.length <= 0)
            res.status(404).json({ error: "Id Not Found" });
        else if (!HelperService.isValidObjectId(id))
            res.status(404).json({ error: "Invalid id" });
        else {
            const fetchedData = await Category.findById(id).lean();
            if(fetchedData) 
                res.status(200).json(fetchedData);
            else
                res.status(200).json({ "message" : "No Records Found !"});
        }
    }
    catch (error) {
        handleErrorMessages(error, "Failed to fetch the record", res);
    }
}


/**
 * Method to fetch a category by it's category name
 */
const getCategoryByDescription = async (req, res) => {
    try {
        const catDesc = String(req.body.category) || ""
        if(catDesc == null || catDesc == undefined || catDesc == "" || catDesc.length <= 0)
            res.status(404).json({ error: "Insufficient paramters !" });
        else {
            const fetchedData = await Category.find({ category: catDesc }).lean();
            if(fetchedData) 
                res.status(200).json(fetchedData);
            else
                res.status(200).json({ "message" : "No Records Found !"});
        }
    }
    catch (error) {
        handleErrorMessages(error, "Failed to fetch the record", res);
    }
}

/**
 * Method to fetch all categories in descending (from the time of creation) fashion
 */
const getAllCategories = async (req, res) => {
    try {
        const fetchedData = await Category.find().sort({ createdAt: -1 }).lean();
        if(fetchedData) 
            res.status(200).json(fetchedData);
        else
            res.status(200).json({ "message" : "No Records Found !"});
    }
    catch (error) {
        handleErrorMessages(error, "Failed to fetch all categories", res);
    }
}

/**
 * Method to update a category
 */
const editCategory = async (req, res) => {
    try {
        const updateBody = new Category(req.body) || {};
        if(updateBody == null || updateBody == undefined || updateBody == {})
            res.status(404).json({ error: "Insufficient paramters !" });
        else {
            const updateResult = await Category.findByIdAndUpdate(updateBody._id.toString(), 
                                                                  { $set: {category: updateBody.category, remarks: updateBody.remarks} },
                                                                  { new: true });
            res.status(200).json(updateResult);
        }
    }
    catch(error) {
        handleErrorMessages(error, "Failed to update this category", res);
    }
}

/**
 * Method to delete a category
 */
const deleteCategory = async (req, res) => {
    try {
        const id = String(req.params.id) || ""
        if(id == null || id == undefined || id == "" || id.length <= 0)
            res.status(404).json({ error: "Id Not Found" });
        else if (!HelperService.isValidObjectId(id))
            res.status(404).json({ error: "Invalid id" });
        else {
            const deleteResult = await Category.findByIdAndDelete(id).lean();
            if(deleteResult) {
                const fetchedData = await Category.findById(id).lean();
                if(!fetchedData) 
                    res.status(200).json({ "message" : "Deleted successfully!" });
            }
        }
    }
    catch(error) {
        handleErrorMessages(error, "Failed to delete this category", res);
    }
}

/**
 * Method to handle error messages
 */
const handleErrorMessages = (error, customMessage, res) => {
    if(error && error.message){
        res.status(404).json({ error: error.message });
    }
    else{
        res.status(404).json({ error: customMessage });
    }
}

module.exports = {
    createCategory,
    getCategoryById,
    getCategoryByDescription,
    getAllCategories,
    editCategory,
    deleteCategory,
}