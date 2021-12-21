const mongoose=require("mongoose");
const express=require("express");
const res = require("express/lib/response");
Schema=mongoose.Schema
({
    Username:{type:String, required:true, unique:true},
    Email:{type:String, required:true, unique:true},
    Password:{type:String, required:true},
    Permesso:{type:String, required:true}
})
const UtentiModel=mongoose.model("users", Schema)

module.exports=
{
     Registrazione: function(req,callback)
    {
        let NuovoUtente= new UtentiModel({Username:req.body.Username, Email:req.body.Email, Password:req.body.Password, Permesso:"Utente"});
        NuovoUtente.save((err,result)=>
        {
            if(err)
            {
                console.log("errore:", err)
                callback(err)
            }
            else
            {
                console.log("result:", result)
                callback()
            }
        })
    },

    LogiIn: function(req,callback)
    {
        console.log("query:",req.body)
        UtentiModel.findOne({Username:req.query.Username, Email:req.query.Email, Password:req.query.Password}, (err,UtenteLoggato)=>
        {
            console.log()
            if(err) 
            console.log("errore:",err)
            else
            callback(UtenteLoggato);
        })
    },

    Elimina: function(req,callback)
    {
        console.log(req.body);
        UtentiModel.findOneAndDelete({_id:req.body.Id,Username:req.body.Username, Email:req.body.Email, Password:req.body.Password}, (err,UtenteEliminato)=>
        {
            if(err) 
            console.log("errore:",err)
            else
            {
                if(UtenteEliminato===null)
                {
                    callback()    
                }
                else
                callback(err,UtenteEliminato);  
            }
        })
    },

    Modifica: function(req,callback)
    {
        console.log("entrato nella func modifica in model")
        console.log("req.body:",req.body)
        /*UtentiModel.findOne({_id:utente._id},(err,UtenteTrovato)=>
        {
            console.log("errore",err);
            console.log("Utente Trovato:",UtenteTrovato);
        });*/
        
        UtentiModel.findOneAndUpdate({_id:req.body.id},{Username:req.body.Username, Email:req.body.Email, Password:req.body.Password},(err,UtenteModificato)=>
        {
            console.log("UtenteModificato:",UtenteModificato)
            if(err) 
            console.log("errore:",err)
            else
            {
                if(UtenteModificato===null)
                {
                    callback()    
                }
                else
                callback(err,UtenteModificato);  
            }
        })
    }
}