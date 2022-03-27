exports.index = async(req, res)=>{
    res.send({"Controlador":"Cliente"})
}

const listado = []

exports.verLista = async(req, res) => {
    res.send(JSON.stringify(listado))
}

exports.AgregarLista = async(req, res) =>{
    console.log(req.body.nombre||"Error")
    listado.push(req.body)
    res.send({"Respuesta":"OK"})
}

/*
{
    "nombre":"Javier",
    "edad":21
}
*/