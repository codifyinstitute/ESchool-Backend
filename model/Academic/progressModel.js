const mongoose = require('mongoose');

const progressModel = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    Count: {
        type: Number,
        required: true
    }
});

const Progress = mongoose.model("Progress", progressModel);
module.exports = Progress;