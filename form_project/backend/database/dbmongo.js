const mongo = require("mongoose");

const schema = new mongo.Schema({

username : {type: String,required: true,unique: true},
email: {type: String, required: true,unique: true},
password : {type: String,required: true}



});

module.exports = mongo.model("user",schema);