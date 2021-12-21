const mongoose=require("mongoose");
const express=require("express");
require("dotenv").config();
const router=require("./progettoRoutes")
const cors=require("cors")
const app=express();
app.use(express.urlencoded({extended:true}))
app.use(cors());
app.use(function(req,res,next)
{
    next()
})

mongoose.connect("mongodb://127.0.0.1:27017/ListaUtenti",function(err)
{
    if (err) console.log("errore:",err);
    console.log("Database Collegato");
    app.use("/homepage",router)
    app.listen(process.env.PORT,process.env.HOST,function(err)
{
    if(err) console.log("errore:", err)
    console.log("server avviato sulla porta:",process.env.PORT)
})
})
