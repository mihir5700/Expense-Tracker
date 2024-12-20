const mongoose = require('mongoose');
const Schema = mongoose.Schema; //A Property not a method

const categorySchema = new Schema({
    category: {
        type: String,
        required: true
    },
    remarks: {
        type: String,
        required: false
    }
},
{ timestamps: true })

const Category = mongoose.model('Category',categorySchema); // Model/Schema creation for collection: 'categorys'
module.exports = Category;