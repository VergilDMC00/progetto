const express=require("express");
const controller=require("./progettoController")
const router=express.Router();
router.get("/login",controller.Login)
router.post("/aggiungi", controller.NuovoUtente)
router.post("/elimina", controller.Delete)
router.post("/modifica", controller.Modifica)
module.exports= router