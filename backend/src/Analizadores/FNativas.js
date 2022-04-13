var errores = require("../Errores")

module.exports = {
    tLower: function(v1,fila,columna){
        let res = new ResultadoOp();
        switch(v1.tipo){
            case "String":
                res.tipo="String";
                cad=v1.valor.toString().split("");
                cadr ="";
                for (let i = 1; i < cad.length-1; i++) {
                    cadr += cad[i];
                }
                res.valor=cadr.toLowerCase();
                return res;
            
            default:
                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","La función \"toLower\" solo recibe como parámetro una expresión de tipo Cadena",fila,columna));
                res.tipo="error";
                res.valor="error";
                return res;
        }
    },
    tUpper: function(v1,fila,columna){
        let res = new ResultadoOp();
        switch(v1.tipo){
            case "String":
                res.tipo="String";
                cad=v1.valor.toString().split("");
                cadr ="";
                for (let i = 1; i < cad.length-1; i++) {
                    cadr += cad[i];
                }
                res.valor=cadr.toUpperCase();
                return res;
            
            default:
                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","La función \"toUpper\" solo recibe como parámetro una expresión de tipo Cadena",fila,columna));
                res.tipo="error";
                res.valor="error";
                return res;
        }
    },
    round: function(v1,fila,columna){
        let res = new ResultadoOp();
        switch(v1.tipo){
            case "Int":
                res.tipo="Int";
                res.valor=Math.round(parseInt(v1.valor))
                return res;
            case "Double":
                res.tipo="Int";
                cad=v1.valor.toString().split(".");
                if(parseInt(cad[1])>=5){
                    cadr=parseInt(cad[0])+1
                }else{
                    cadr=parseInt(cad[0])
                }
                res.valor=cadr
                return res;
            default:
                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","La función \"round\" solo recibe como parámetro una expresión de tipo numérico",fila,columna));
                res.tipo="error";
                res.valor="error";
                return res;
        }
    },
    Flength: function(v1,fila,columna){
        //FALTAN LISTAS Y VECTORES
        let res = new ResultadoOp();
        switch(v1.tipo){
            case "String":
                res.tipo="Int";
                cad=v1.valor.toString().split("");
                cadr ="";
                for (let i = 1; i < cad.length-1; i++) {
                    cadr += cad[i];
                }
                res.valor=cadr.length
                return res;
            default:
                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","La función \"length\" solo recibe como parámetro una expresión de tipo cadena, listas y vectores",fila,columna));
                res.tipo="error";
                res.valor="error";
                return res;
        }
    },
    typof: function(v1,fila,columna){
        let res = new ResultadoOp();
        res.tipo="String";
        res.valor="\""+v1.tipo+"\""
        return res;
    },
    tstring: function(v1,fila,columna){
        let res = new ResultadoOp();
        switch(v1.tipo){
            case "Int":
            case "Double":
            case "Boolean":
                res.tipo="String";
                res.valor="\""+v1.valor+"\""
                return res;
            default:
                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","La función \"toString\" solo recibe como parámetro una expresión de tipo numérico o booleano",fila,columna));
                res.tipo="error";
                res.valor="error";
                return res;
        }
    }
}

class ResultadoOp{
    constructor(tipo,valor){
        this.tipo=tipo;
        this.valor=valor;
    }
}