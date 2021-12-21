Model=require("./progettoModeles")

module.exports=
{
    NuovoUtente: function(req,res)
    {
        console.log("query:",req.body)
        Model.Registrazione(req,(err)=>
        {
            if(err)
            {
                if(err.keyValue==err.keyValue.Username)
                res.send(JSON.stringify("USERNAME GIA ESISTENTE"));
                else
                res.send(JSON.stringify("LA MAIL E' COLLEGATA A UN ALTRO ACCOUNT"));
            }
            else
            {
                console.log("utente creato")
                res.status(200)
                res.send(JSON.stringify({status:200, text:"UTENTE CREATO"}))   
            }
        })
    },

    Login: function(req,res)
    {
        console.log("req.query:",req.query)
        Model.LogiIn(req,(LoggedUser)=>
        {
            if(LoggedUser===null)
            {
                console.log("LoggedUser:",LoggedUser)
                res.status(404)
                res.send(JSON.stringify({status:404, text:"UNA O PIU CREDENZIALI RISULTANO ERRATE"}));
                console.log(res.send)

            }
            else
            {
                console.log("LoggedUser:",LoggedUser)
                console.log("login avvenuto con successo")
                res.status(200)
                res.send(JSON.stringify({status:200,Username:LoggedUser.Username,id:LoggedUser._id}));
            }

        })

    },

    Delete:function(req,res)
    {
        console.log(req.body)
        Model.Elimina(req,(err,DeletedUser)=>
        {
            console.log("DeletedUser:",DeletedUser);
            if(err) 
            {
                console.log("errore:",err)
            }
            else
            {
                if(DeletedUser===undefined)
                {
                    res.status(404)
                    res.send(JSON.stringify({status:404,text:"UTENTE NON TROVATO RIMMETTERE I DATI"}));   
                }
                else
                {
                    res.status(200)
                    res.send(JSON.stringify({status:200,text:"ELIMINAZIONE AVVENUTA"}));
                }
            }

        })
    },

    Modifica:function(req,res)
    {
        console.log("entrato nella func modifica in controller")
        Model.Modifica(req,(err,UpdtedUser)=>
        {
            console.log("ritorno del model")
            console.log("UpdtedUser:",UpdtedUser);
            if(err) 
            {
                console.log("errore:",err)
                res.status(404)
                res.send(JSON.stringify({status:404,text:err}));
            }
            else
            {
                if(UpdtedUser===undefined)
                {
                    res.status(404)
                    res.send(JSON.stringify({status:404,text:"ERRORE NELLA MODIFICA DELL'UTENTE"}));   
                }
                else            
                {
                    res.status(200)
                    res.send(JSON.stringify({status:200,text:"MODIFICA AVVENUTA CON SUCCESSO"}));
                }
            }

        })
    }






}