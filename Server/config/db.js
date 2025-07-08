const mongoose = require("mongoose")

const connectDB = async ()=>{
    try{
        const conn= await mongoose.connect(
            'mongodb+srv://pavani:Pavani24@cluster0.tdnszbx.mongodb.net/products?retryWrites=true&w=majority&appName=Cluster0'
        )
        console.log("Mongodb connected")
}catch(error){
console.error(error)
process.exit(1)
}
}

module.exports=connectDB;