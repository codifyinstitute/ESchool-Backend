const mongoose = require('mongoose');

const addBankModel = new mongoose.Schema({
    BankName: {
        type: String,
        required: true
    },
    Logo: {
        type: String,
        required: true
    },
    AccountNo: {
        type: Number,
        required: true
    },
    OpeningBalance: {
        type: String,
        required: true
    },
    Primary:{
        type: Boolean,
        default: false
    },
    Remark: {
        type: String,
    }
});

const AddBank = mongoose.model("Bank", addBankModel);
module.exports = AddBank;