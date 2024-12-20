const mongoose = require('mongoose');

const isValidObjectId = (id) => {
    if(id == null || id == undefined || id.toString().length <= 0)
        return false;
    else
        return mongoose.Types.ObjectId.isValid(id.toString());
}

module.exports = {
    isValidObjectId
}