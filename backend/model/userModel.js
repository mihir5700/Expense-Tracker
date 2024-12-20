const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: false
    },
    contact: {
        type: String,
        required: false
    }
},
{ timestamps: true })

const User = mongoose.model('User',userSchema); // Model/Schema creation for collection: 'users'
module.exports = User;