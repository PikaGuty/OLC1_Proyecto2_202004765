var fs = require('fs'); 
var parser = require('./gramatica');
var AST = require("../AST");
var semantico = require("./Interprete");


fs.readFile('./entrada.txt', (err, data) => {
    if (err) throw err;
    resultado=parser.parse(data.toString());

    
    console.log(AST.imprimir(resultado));
    semantico.interpretar(resultado,"General","Normal",true)
    let codigo = semantico.interpretar(resultado,"General","Normal",false)
    
    semantico.tabla();
    console.log("\nSALIDA\n")
    console.log(codigo)
});