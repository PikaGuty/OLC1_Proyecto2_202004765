
var aritmetica = require("./OpAritmeticas")
var relacionales = require("./OpRelacionales")
var logicos = require("./OpLogicos")
var fntiva = require("./FNativas")
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
                raiz.hijos.forEach(hijo=> variable(t.valor,hijo))
                return codigo;
            case "FPrint":
                res = evaluarExpresion(raiz.hijos[0]);
                if(res.tipo=="String"){
                    cad=res.valor.toString().split("");
                    cadr ="";
                    for (let i = 1; i < cad.length-1; i++) {
                        cadr += cad[i];
                    }
                    codigo+=cadr
                }else{
                    codigo+=res.valor
                }
                
                return codigo;
            case "FPrintln":
                res = evaluarExpresion(raiz.hijos[0]);
                if(res.tipo=="String"){
                    cad=res.valor.toString().split("");
                    cadr ="";
                    for (let i = 1; i < cad.length-1; i++) {
                        cadr += cad[i];
                    }
                    codigo+=cadr+"\n"
                }else{
                    codigo+=res.valor+"\n"
                }
                
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
                res1 = evaluarExpresion(raiz.hijos[0]);
                res2 = evaluarExpresion(raiz.hijos[2]);

                let operador = raiz.hijos[1].valor;
                switch(operador){
                    //OPERACIONES ARITMETICAS
                    case "^":
                        return aritmetica.Potencia(res1,res2,raiz.hijos[1].fila,raiz.hijos[1].columna)
                    case "+":
                        return aritmetica.suma(res1,res2,raiz.hijos[1].fila,raiz.hijos[1].columna)
                    case "-": 
                        return aritmetica.resta(res1,res2,raiz.hijos[1].fila,raiz.hijos[1].columna)
                    case "*":
                        return aritmetica.multiplicacion(res1,res2,raiz.hijos[1].fila,raiz.hijos[1].columna)
                    case "/":
                        return aritmetica.division(res1,res2,raiz.hijos[1].fila,raiz.hijos[1].columna)
                    case "%": 
                        return aritmetica.modular(res1,res2,raiz.hijos[1].fila,raiz.hijos[1].columna)
                    //OPERACIONES LOGICAS
                    case "==":
                        return relacionales.igualacion(res1,res2,raiz.hijos[1].fila,raiz.hijos[1].columna)
                    case "!=":
                        return relacionales.diferenciacion(res1,res2,raiz.hijos[1].fila,raiz.hijos[1].columna)
                    case ">=":
                        return relacionales.mayique(res1,res2,raiz.hijos[1].fila,raiz.hijos[1].columna)
                    case "<=":
                        return relacionales.menique(res1,res2,raiz.hijos[1].fila,raiz.hijos[1].columna)
                    case ">":
                        return relacionales.mayque(res1,res2,raiz.hijos[1].fila,raiz.hijos[1].columna)
                    case "<":
                        return relacionales.menque(res1,res2,raiz.hijos[1].fila,raiz.hijos[1].columna)
                    case "||":
                        return logicos.oplor(res1,res2,raiz.hijos[1].fila,raiz.hijos[1].columna)
                    case "&&":
                        return logicos.opand(res1,res2,raiz.hijos[1].fila,raiz.hijos[1].columna)
                    default:
                        break;
                }
            }else if (raiz.hijos.length==2) {
                res1 = evaluarExpresion(raiz.hijos[1]);

                let operador = raiz.hijos[0].valor;
                switch(operador){
                    case "-":
                        return aritmetica.negacion(res1,raiz.hijos[0].fila,raiz.hijos[0].columna)
                    case "!":
                        return logicos.neg(res1,res2,raiz.hijos[1].fila,raiz.hijos[1].columna)
                    default:
                        break;
                }
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
        case "FToLower":
            res1 = evaluarExpresion(raiz.hijos[0]);
            return fntiva.tLower(res1,raiz.hijos[0].fila,raiz.hijos[0].columna)
        case "FToUpper":
            res1 = evaluarExpresion(raiz.hijos[0]);
            return fntiva.tUpper(res1,raiz.hijos[0].fila,raiz.hijos[0].columna)
        case "FRound":
            res1 = evaluarExpresion(raiz.hijos[0]);
            return fntiva.round(res1,raiz.hijos[0].fila,raiz.hijos[0].columna)
        case "FLength":
            //FALTAN LISTAS Y VECTORES
            res1 = evaluarExpresion(raiz.hijos[0]);
            return fntiva.Flength(res1,raiz.hijos[0].fila,raiz.hijos[0].columna)
        case "FTypeOf":
            res1 = evaluarExpresion(raiz.hijos[0]);
            return fntiva.typof(res1,raiz.hijos[0].fila,raiz.hijos[0].columna)
        case "FToString":
            res1 = evaluarExpresion(raiz.hijos[0]);
            return fntiva.tstring(res1,raiz.hijos[0].fila,raiz.hijos[0].columna)
        case "FToCharArray":
            //FALTAN LISTAS Y VECTORES

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

