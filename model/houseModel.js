const mongoose = require("mongoose");

const houseModel = new mongoose.Schema({
    HouseName: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    }
});

const House = mongoose.model("House", houseModel);
module.exports = House;