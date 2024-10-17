const mongoose = require('mongoose');

const payrollDataModel = new mongoose.Schema({
    PayrollID: {
        type: String,
        required: true,
        unique: true
    },
    EmployeeId: {
        type: String,
        required: true
    },
    Payments: [{
        Salary: {
            Absent: {
                type: Number
            },
            Leave: {
                type: Number
            },
            Half: {
                type: Number
            },
            OneFourth: {
                type: Number
            },
            OneThird: {
                type: Number
            },
            Salary: {
                type: Number
            },
            PerDaySalary: {
                type: Number
            }
        },
        Allowance: [{
            Title: {
                type: String
            },
            Amount: {
                type: Number
            }
        }],
        Deductions: [{
            Title: {
                type: String
            },
            Amount: {
                type: Number
            }
        }],
        TotalSalary: {
            type: Number
        }
    }]
});

const PayrollData = mongoose.model("PayrollData", payrollDataModel);
module.exports = PayrollData;