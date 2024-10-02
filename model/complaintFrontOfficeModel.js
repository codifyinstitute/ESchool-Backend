const mongoose = require("mongoose");

const compliantFrontOfficeModel = new mongoose.Schema({
    Date:{
        type:String,
        required:true
    },
    MeterNo:{
        type:String,
        required:true
    },
    Reading:{
        ReadingAt7AM:{

        }
    }
});
const CompliantFrontOffice = mongoose.model("CompliantFrontOffice", compliantFrontOfficeModel);
module.exports = CompliantFrontOffice;