const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    Title:{
        type:String,
        required:true
    },
    Category:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    Cost:{
        type:String,
        required:true
    },
    EditorName: {
        type:String,
        required:true
    }
})

module.exports = mongoose.model("products", itemSchema);