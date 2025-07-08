const express = require("express")
const Data = require("../../Modal/Products")
const router=express.Router()


router.get('/userGet' ,async (req , res)=>{
    try{
        const users= await Data.find()
        res.status(200).json(users)
    }catch(error){
        console.log("error fetching data:", error)
        res.status(500).json({message:"Internal server error"})
    }

})
module.exports=router;



