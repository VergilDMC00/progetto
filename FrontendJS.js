let cookie;
let user;
let AccessoEseguito;
let LoggedUser;
Nascondi1()


function Nascondi1()
{
    let AccessoEseguito=localStorage.getItem('Accesso')
    console.log(AccessoEseguito)
    if(AccessoEseguito=='true')
    {
        document.getElementById("BSPartDx1").style.display="none";
        document.getElementById("BSPartDx2").style.display="flex";
        //document.getElementById("BarraCommenti").style.display="block"
    }

}

function Nascondi2()
{
    let AccessoEseguito=localStorage.getItem('Accesso')
    console.log(AccessoEseguito)
    if(AccessoEseguito=='false')
    {
        document.getElementById("BSPartDx1").style.display="flex";
        document.getElementById("BSPartDx2").style.display="none";
        //document.getElementById("BarraCommenti").style.display="none"
    } 
}

function LogOut()
{
    document.getElementById("BSPartDx1").style.display="flex";
    document.getElementById("BSPartDx2").style.display="none";
    //document.getElementById("BarraCommenti").style.display="none"
    localStorage.setItem('Accesso','false');
    Nascondi2()
}

//FUNZIONE PER LO SLIDESHOW

var slideIndex = 0;
carousel();

function carousel() 
{
    var i;
    var x = document.getElementsByClassName("center");
    for (i = 0; i < x.length; i++) 
    {
        x[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > x.length) {slideIndex = 1}
    x[slideIndex-1].style.display = "block";
    setTimeout(carousel, 2000); // Change image every 2 seconds
}



//FUNZIONI DI FETCH

//LOGIN
function FetchLogin()
{
    let dati=[];
    const modal=document.querySelector("#ModalLogin")
    const utente={
        Username:modal.querySelector("[name='Username']").value,
        Email:modal.querySelector("[name='Email']").value,
        Password:modal.querySelector("[name='Password']").value
    };
    console.log("utente:",utente)
    dati.push(utente)
    if(utente.Username!=''&utente.Email!=""&utente.Password!="")
    {
        fetch('http://localhost:2000/homepage/login?'+ObjectToURL(utente),
        {
            method: 'GET', 
        }).then(async res=>res.json()).then(data=>
            {
                if(data.status==200)
                {
                    console.log(data);
                    user=data;
                    document.getElementById("ModalLogin").style.display="none";
                    modal.querySelector("[name='Username']").value="";
                    modal.querySelector("[name='Email']").value="";
                    modal.querySelector("[name='Password']").value="";
                    LoggedUser=utente
                    localStorage.setItem('Accesso','true');
                    Nascondi1()
                    //document.getElementById("NomeUtente").value=user.Username;  
                }
                else
                {
                    alert(data.text)
                    document.getElementById("ModalLogin").style.display="none";
                }
            }).catch(err=>
                {
                    console.log(err);
                    alert(err);
                })
    }
    else
    alert("UNO O PIU CAMPI NON SONO STATI COMPLETATI")
}

//REGISTRAZIONE
function FetchRegistrazione()
{
    let dati=[];
    const modal=document.querySelector("#ModalRegistrazione")
    const utente={
        Username:modal.querySelector("[name='Username']").value,
        Email:modal.querySelector("[name='Email']").value,
        Password:modal.querySelector("[name='Password']").value
    };
    dati.push(utente)
    console.log(utente.Email)

    if(utente.Username!=''&utente.Email!=""&utente.Password!="")
    {
        let EmailValidation;
        for(i=0;i<=utente.Email.length;i++)
        {
            if(utente.Email[i]=='@')
            {
                EmailValidation=true;
                break
            }
            else
            {
                EmailValidation=false;
            }
        }
        if(EmailValidation==true)
        {
            let CheckBox=document.getElementById('PrivacyPolicy').checked==true
            if(CheckBox===true)
            {
                fetch('http://localhost:2000/homepage/aggiungi', {
                    method: 'POST',
                    body: ObjectToURL(utente),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded',},
                }).then(async res=>res.json()).then(data=>
                    {
                        console.log(data.status)
                        if(data.status==200)
                        {
                            alert("UTENTE CREATO CON SUCCESSO")
                            document.getElementById("ModalRegistrazione").style.display="none";
                            modal.querySelector("[name='Username']").value="";
                            modal.querySelector("[name='Email']").value="";
                            modal.querySelector("[name='Password']").value="";
                        }
                        else
                        {
                            alert(data)
                        }

                    }).catch(err=>
                        {
                            console.log(err);
                            alert(err);
                        })
            }
            else
            alert("ACCETTA LE CONDIZIONI DELLA PRIVACY")
        }
        else
        alert("LA MAIL NON E' VALIDA, INSERIRE UNA MAIL CORRETTA")
    }
    else
    alert("UNO O PIU CAMPI NON SONO STATI COMPLETATI")
}
//ELIMINAZIONE
function FetchElimina()
{
    let dati=[];
    const modal=document.querySelector("#modalDelete")
    const utente={
        Id:user.id,
        Username:modal.querySelector("[name='Username']").value,
        Email:modal.querySelector("[name='Email']").value,
        Password:modal.querySelector("[name='Password']").value
    };
    dati.push(utente)
    if(utente.Username!=''&utente.Email!=""&utente.Password!="")
    {
        fetch('http://localhost:2000/homepage/elimina', {
            method: 'POST',
            body: ObjectToURL(utente),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },

        }).then(async res=>res.json()).then(data=>
            {
                if(data.status==200)
                {
                    alert(data.text)
                    document.getElementById("modalDelete").style.display="none";
                    document.querySelector(".modalDelete").style.display = "none";
                    modal.querySelector("[name='Username']").value="";
                    modal.querySelector("[name='Email']").value="";
                    modal.querySelector("[name='Password']").value="";
                    localStorage.setItem('Accesso','false');
                    Nascondi2()
                    document.getElementById("NomeUtente").value=utente.Username;
                }
                else
                {
                    alert(data.text)
                    document.getElementById("modalDelete").style.display="none";
                    Nascondi1()
                }

            }).catch(err=>
                {
                    console.log(err);
                    alert(err);
                })
    }
    else
    alert("UNO O PIU CAMPI NON SONO STATI COMPLETATI")
}

//MODIFICA
function FetchModifica()
{
    let dati=[];
    const modal=document.querySelector("#modalUpdate")
    const utente={
        id:user.id,
        Username:modal.querySelector("[name='Username']").value,
        Email:modal.querySelector("[name='Email']").value,
        Password:modal.querySelector("[name='Password']").value
    };
    console.log("utente:",utente);
    dati.push(utente)
    if(utente.Username!=''&utente.Email!=""&utente.Password!="")
    {
        fetch('http://localhost:2000/homepage/modifica', {
            method: 'POST',
            body: ObjectToURL(utente),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },

        }).then(async res=>res.json()).then(data=>
            {
                if(data.status=200)
                {
                    alert(data.text)
                    document.getElementById("modalUpdate").style.display="none";
                    document.querySelector(".modalUpdate").style.display = "none";
                    localStorage.setItem('Accesso','false');
                    Nascondi2()
                    //document.getElementById("NomeUtente").value=utente.Username;
                }
                else
                {
                    alert(data.status,sata.text);
                }

            }).catch(err=>
                {
                    console.log(err);
                    alert(err);
                })
    }
    else
    alert("UNO O PIU CAMPI NON SONO STATI COMPLETATI")
}

function ObjectToURL(object){
    let parts = [];
    for(var part in object){
        parts.push(part+'='+object[part]);
    }
    return parts.join('&');
}


//controllo la visibilta della modale

function Registrazione()
{
    document.querySelector(".modalRegistrazione").style.display = "block";
    document.querySelector(".modalLogin").style.display = "none";
}

function AnnullaRegistrazione()
{
    document.querySelector(".modalRegistrazione").style.display = "none";
}

function MLogin()
{
    document.querySelector(".modalLogin").style.display = "block";
    document.querySelector(".modalRegistrazione").style.display = "none";
}

function AnnullaLogin()
{
    document.querySelector(".modalLogin").style.display = "none";
}

function iscrizioneUtenti(err,req)
{
    console.log("inizio processo Iscrizione")
    if(err) console.log(err)
    console.log(req)
    model.NuovoUtente(req).then(console.log("iscrizione Avvenuta"))
}

function Elimina()
{
    document.querySelector(".modalDelete").style.display = "block";
}

function AnnullaEliminazione()
{
    document.querySelector(".modalDelete").style.display = "none";
}

function Modifica()
{
    document.querySelector(".modalUpdate").style.display = "block";
    document.getElementById("Username").value=LoggedUser.Username;
    document.getElementById("Email").value=LoggedUser.Email;
    document.getElementById("Password").value=LoggedUser.Password;
    

}

function AnnullaModifica()
{
    document.querySelector(".modalUpdate").style.display = "none";
}


/*CHIEDERE AL PROFE DOVE SBAGLIO*/
function NuovoCommento()
{
    alert("pubblicazione commento")
    let div1=document.createElement('div');
    document.body.appendChild(div1);
    div1.className="BarraCommenti";
    let div2=document.createElement('div');
    div2.className="BarraSuperioreC";
    div1.appendChild(div2)
    let autore=document.getElementById("NomeUtente").value;
    console.log(autore)
    div2.innerHTML=autore;
    let text=document.getElementById("AreaDiTesto").value;
    console.log(text)
    let p=document.createElement('p')
    p.innerHTML=text
    p.id="AreaDiTesto";
    div1.appendChild(p)
    let div3=document.createElement('div')
    div3.className="BarraInferioreC"
    div1.appendChild(div3)
}

