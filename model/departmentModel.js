const mongoose = require("mongoose");

const departmentModel = new mongoose.Schema({
    DepartmentName: {
        type: String,
        required: true
    },
    Designation:[String],
    Description: {
        type: String,
        required: true
    }
});

const Department = mongoose.model("Department", departmentModel);
module.exports = Department;