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
    },

    cast: function(tipo,v1,fila,columna){
        let res = new ResultadoOp();
        switch(tipo){
            case "Int":
                switch(v1.tipo){
                    case "Double":
                        res.tipo="Int";
                        res.valor=parseInt(v1.valor);
                        return res;
                    case "Char":
                        res.tipo="Int";
                        cad=v1.valor.toString().split("");
                        cadr ="";
                        for (let i = 1; i < cad.length-1; i++) {
                            cadr += cad[i];
                        }
                        cadr=cadr.replace(/\\n/g,"\n");
                        cadr=cadr.replace(/\\t/g,"\t");
                        cadr=cadr.replace(/\\r/g,"\r");
                        cadr=cadr.replace(/\\\\/g,"\\");
                        cadr=cadr.replace(/\\\"/g,"\"");
                        cadr=cadr.replace(/\\\'/g,"\'");
                        res.valor=cadr.toString().charCodeAt()
                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible castear del tipo "+v1.tipo+" al tipo "+tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
            case "Double":
                switch(v1.tipo){
                    case "Int":
                        res.tipo="Double";
                        res.valor=parseFloat(v1.valor+".0");
                        return res;
                    case "Char":
                        res.tipo="Double";
                        cad=v1.valor.toString().split("");
                        cadr ="";
                        for (let i = 1; i < cad.length-1; i++) {
                            cadr += cad[i];
                        }
                        cadr=cadr.replace(/\\n/g,"\n");
                        cadr=cadr.replace(/\\t/g,"\t");
                        cadr=cadr.replace(/\\r/g,"\r");
                        cadr=cadr.replace(/\\\\/g,"\\");
                        cadr=cadr.replace(/\\\"/g,"\"");
                        cadr=cadr.replace(/\\\'/g,"\'");
                        res.valor=parseFloat(cadr.toString().charCodeAt()+".0")
                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible castear del tipo "+v1.tipo+" al tipo "+tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
            case "String":
                switch(v1.tipo){
                    case "Int":
                    case "Double":
                        res.tipo="String";
                        res.valor="\""+v1.valor+"\""
                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible castear del tipo "+v1.tipo+" al tipo "+tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
            case "Char":
                switch(v1.tipo){
                    case "Int":
                        res.tipo="Char";
                        cadr = String.fromCharCode(parseInt(v1.valor))
                        cadr=cadr.replace("\n","\\n");
                        cadr=cadr.replace("\t","\\t");
                        cadr=cadr.replace("\r","\\r");
                        cadr=cadr.replace("\\","\\\\");
                        cadr=cadr.replace("\"","\\\"");
                        cadr=cadr.replace("\'","\\\'");
                        if(cadr.includes("\\n")||cadr.includes("\\t")||cadr.includes("\\r")){
                            cad=cadr.split("")
                            res.valor="\'"+cad[1]+cad[2]+"\'"
                            return res;
                        }
                        res.valor="\'"+cadr+"\'"
                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible castear del tipo "+v1.tipo+" al tipo "+tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
            default:
                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible castear del tipo "+v1.tipo+" al tipo "+tipo,fila,columna));
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