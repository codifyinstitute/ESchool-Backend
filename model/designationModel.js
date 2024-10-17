const mongoose = require("mongoose");

const designationModel = new mongoose.Schema({
    DepartmentName: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    }
});

const Designation = mongoose.model("Designation", designationModel);
module.exports = Designation;