
var aritmetica = require("./OpAritmeticas")
var tabsim = require("../tabla_simbolos")
var errores = require("../Errores")

module.exports = {

    interpretar: function(raiz){

        let op;
        let res;
        let codigo=""
        let simbolo;
        if(raiz===undefined || raiz===null)return;

        switch(raiz.etiqueta){
            case "Raiz":
                raiz.hijos.forEach(hijo=> codigo+=this.interpretar(hijo))
                return codigo;
            case "Instrucciones":
                raiz.hijos.forEach(hijo=> codigo+=this.interpretar(hijo))
                return codigo;
            case "Var":
                let t = raiz.hijos[0];
                raiz.hijos.forEach(hijo=> codigo+=variable(t.valor,hijo))
                return codigo;
        }
        return codigo;
    },

    tabla: function(){
        console.log("\nTabla de simbolos")
        console.log(tabsim.tabla.getInstancia().getsimbolos());
        console.log("Tabla de errores\n")
        console.log(errores.ListaErrores.getInstance().getErrores())
    }
}

function variable(tipo,raiz){
    let sim;
    let valo;
    switch(raiz.etiqueta){
        case "Dec":
            raiz.hijos.forEach(hijo=> variable(tipo,hijo))
            break;
        case "id":
            //(nombre,tipo1,tipo2,valor,linea,columna)
            switch(tipo){
                case "Int":
                    sim= new simbolo(raiz.valor,"Declaracion",tipo,0,raiz.fila,raiz.columna)
                    break;
                case "Double":
                    sim= new simbolo(raiz.valor,"Declaracion",tipo,0.0,raiz.fila,raiz.columna)
                    break;
                case "Boolean":
                    sim= new simbolo(raiz.valor,"Declaracion",tipo,true,raiz.fila,raiz.columna)
                    break;
                case "Char":
                    sim= new simbolo(raiz.valor,"Declaracion",tipo,'0',raiz.fila,raiz.columna)
                    break;
                case "String":
                    sim= new simbolo(raiz.valor,"Declaracion",tipo,"\"\"",raiz.fila,raiz.columna)
                    break;
            }
            tabsim.tabla.getInstancia().pushSimbolo(sim)
            break;
        case "Asig":
            res=evaluarExpresion(raiz.hijos[1]);
            if (tipo==res.tipo){
                sim = new simbolo(raiz.hijos[0].valor,"Asignacion",tipo,res.valor,raiz.fila,raiz.columna)
            }else if(tipo=="Double"&&res.tipo=="Int"){
                sim = new simbolo(raiz.hijos[0].valor,"Asignacion",tipo,res.valor,raiz.fila,raiz.columna)
            }else{
                console.log("Error semantico, el dato "+res.valor+" no es de tipo "+tipo)
            }
            if(sim!=null){
                tabsim.tabla.getInstancia().pushSimbolo(sim)
            }
            
            break
    }
}

function evaluarExpresion(raiz){
    let res1 = null;
    let res2 = null;
    let res = null;
    
    switch (raiz.etiqueta) {
        case "Expresion":
            if (raiz.hijos.length==3) {
                console.log("ENcontre 3")
                res1 = evaluarExpresion(raiz.hijos[0]);
                res2 = evaluarExpresion(raiz.hijos[2]);

                let operador = raiz.hijos[1].valor;
                console.log("El operador es "+operador)
                switch(operador){
                    //OPERACIONES ARITMETICAS
                    case "^":
                    case "+":
                        return aritmetica.suma(res1,res2,raiz.hijos[1].fila,raiz.hijos[1].columna)
                    case "-": 
                    case "*":
                    case "/":
                    case "%": 
                    //OPERACIONES LOGICAS
                    case "==":
                    case "!=":
                    case ">=":
                    case "<=":
                    case ">":
                    case "<":
                    case "||":
                    case "&&":
                    default:
                        break;
                }
            }else if (raiz.hijos.length==2) {
                console.log("Tengo 2 hijos")
            }else if (raiz.hijos.length==1) {
                return evaluarExpresion(raiz.hijos[0]);
            }
        case "entero":
            res = new ResultadoOp();
            res.tipo="Int";
            res.valor=raiz.valor;
            return res;
        case "decimal":
            res = new ResultadoOp();
            res.tipo="Double"
            res.valor=raiz.valor;
            return res;
        case "true":
            res = new ResultadoOp();
            res.tipo="Boolean"
            res.valor=raiz.valor;
            return res;
        case "false":
            res = new ResultadoOp();
            res.tipo="Boolean"
            res.valor=raiz.valor;
            return res;
        case "id":
            res = new ResultadoOp();
            //AQUI FUMARME ALGO DESPUES
            return res;
        case "caracter":
            res = new ResultadoOp();
            res.tipo="Char"
            res.valor=raiz.valor;
            return res;
        case "cadena":
            res = new ResultadoOp();
            res.tipo="String"
            res.valor=raiz.valor;
            return res;
    }
}

class ResultadoOp{
    constructor(tipo,valor){
        this.tipo=tipo;
        this.valor=valor;
    }
}

class simbolo {
    constructor(nombre,tipo1,tipo2,valor,linea,columna){
        this.nombre = nombre;
        this.tipo1 = tipo1;
        this.tipo2 = tipo2;
        this.valor = valor;
        this.linea = linea;
        this.columna =  columna;
    }
}

