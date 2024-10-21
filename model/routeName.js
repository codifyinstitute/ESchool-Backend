const mongoose = require("mongoose");

const routeModel = new mongoose.Schema({
    RouteName: {
        type: String,
        required: true
    }
});

const Route = mongoose.model("Route", routeModel);
module.exports = Route;