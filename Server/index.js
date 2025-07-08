const express = require('express')
const connectDB=require("./config/db")
const modals= require("./api/Modal/Products")
const cors = require("cors")
const productPostRoute = require("./api/Route/ProductRoutes/productPost")
const productGetRoute = require("./api/Route/ProductRoutes/productGet")
const productGetIdRoute = require("./api/Route/ProductRoutes/productGetId")
const productPutRoute = require("./api/Route/ProductRoutes/productPut")
const productDelete= require("./api/Route/ProductRoutes/productDelete")
//user
const registerGetRoute = require("./api/Route/UserRoutes/registerGetRoute")
const registerGetIdRoute = require('./api/Route/UserRoutes/registerGetIdRoute')
const registerPostRoute = require('./api/Route/UserRoutes/registerPostRoute')
const registerPutRoute = require('./api/Route/UserRoutes/registerPutRoute')

const route=express()

//middlewares
route.use(express.json())
route.use(cors())

connectDB()

//ProductRoutes
route.use("/api", productPostRoute)
route.use("/api" , productGetRoute)
route.use("/api", productGetIdRoute)
route.use("/api", productPutRoute)
route.use("/api", productDelete)

//UserRoutes
route.use("/api", registerGetRoute)
route.use("/api",registerGetIdRoute)
route.use("/api",registerPostRoute )
route.use("/api",registerPutRoute )




route.listen(3000, (req,res)=>{
    console.log("server is running")
})