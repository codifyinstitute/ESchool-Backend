const mongoose = require('mongoose');

const URL = "mongodb://127.0.0.1:27017/ESchool?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.6";

mongoose.connect(URL).then(()=> console.log("!!MongoDB Connected!!")).catch((error)=>console.log(error));