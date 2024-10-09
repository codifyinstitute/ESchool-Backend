const mongoose = require("mongoose");

const feeStaticsModel = new mongoose.Schema({
    FeeId: { type: String, required: true, unique: true },
    Classes:[{
        Class:{
            type:String
        },
        Header: [{
            Name: { type: String },
            Amount: { type: Number }
        }] 
    }],
    
});

const FeeStatic = mongoose.model('FeeStatic', feeStaticsModel);
module.exports = FeeStatic;