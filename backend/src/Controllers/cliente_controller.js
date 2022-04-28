var parser = require('../Analizadores/gramatica');
var AST = require("../AST");
var semantico = require("../Analizadores/Interprete");
var ts = require("../tabla_simbolos");
var errores = require("../Errores")
const { stderr } = require('process');


var dot=""

exports.index = async(req, res)=>{
    res.send({"Controlador":"Cliente"})
}


exports.Analizar = async(req, res) =>{
    //console.log(req.body.cod||"Error")
    ts.tabla.getInstancia().borrarTabla()
    errores.ListaErrores.getInstance().borrarErrores()
    let resultado=null
    
    semantico.permitir=false, semantico.false,semantico.ctn=false,semantico.rtrn=false,semantico.valRtrn=null;
    semantico.codFun="";
    semantico.unicoRun=true;
    semantico.habilitarLlamada=false;
    //console.log("LLEGO y con")
    //console.log(req.body.cod.toString())
    resultado=parser.parse(req.body.cod.toString())

    dot=AST.imprimir(resultado);
    console.log("******************************************")
    console.log(dot)
    console.log("******************************************")

    semantico.interpretar(resultado,"General","Normal",true)
    let codigo = semantico.interpretar(resultado, "General", "Normal", false)
    console.log(codigo)
    
    res.json({Respuesta: codigo})
}

exports.TSimbolos = async(req, res) =>{
    //console.log(ts.tabla.getInstancia().getTablaSimbolos())
    res.send({simbolos:ts.tabla.getInstancia().getTablaSimbolos()})
}

exports.Ast = async(req,res)=>{
    var exec = require ('child_process');
    var fs = require('fs');
    fs.writeFile("ast.dot", dot, function(err){console.log(err)})
    exec.exec("dot -Tsvg ast.dot -o ../frontend/src/assets/ast.svg",(error,stodut,stderr)=>{
        if(error){ res.send({"res":false})} else {res.send({"res":true});}
    })
    
}

/*
{
    "nombre":"Javier",
    "edad":21
}
*/