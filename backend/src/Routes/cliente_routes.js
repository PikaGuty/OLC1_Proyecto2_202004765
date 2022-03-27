const express = require ('express')
const router = express.Router()
const control = require("../Controllers/cliente_controller")

router.get("/cliente", control.index)

router.get("/ver", control.verLista)
router.post("/agregar", control.AgregarLista)

module.exports = router