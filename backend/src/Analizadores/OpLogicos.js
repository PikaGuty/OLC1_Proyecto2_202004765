var errores = require("../Errores")

module.exports = {
    oplor: function(v1,v2,fila,columna){
        let res = new ResultadoOp();
        let cad,cadr,cad2,cadr2;
        
        switch(v1.tipo){
            case "Int":
                switch(v2.tipo){ 
                    case "Boolean":
                        res.tipo="Boolean";
                        if(v2.valor.toLowerCase()=="true"){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        
                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible la operación lógica OR entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
            case "Double":
                switch(v2.tipo){
                    case "Boolean":
                        res.tipo="Boolean";
                        if(v2.valor.toLowerCase()=="true"){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        
                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible la operación lógica OR entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
            case "Char":
                switch(v2.tipo){
                    case "Boolean":
                        res.tipo="Boolean";

                        if(v2.valor.toLowerCase()=="true"){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        
                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible la operación lógica OR entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
            case "String":
                switch(v2.tipo){
                    case "Boolean":
                        res.tipo="Boolean";

                        if(v2.valor.toLowerCase()=="true"){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }

                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible la operación lógica OR entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }

            case "Boolean":
                switch(v2.tipo){
                    case "Int":
                        res.tipo="Boolean";
                        if(v1.valor.toLowerCase()=="true"){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        
                        return res;
                    case "Double":
                        res.tipo="Boolean";
                        if(v1.valor.toLowerCase()=="true"){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        
                        return res;
                    case "Char":
                        res.tipo="Boolean";

                        if(v1.valor.toLowerCase()=="true"){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        
                        return res;
                    case "String":
                        res.tipo="Boolean";

                        cad=v2.valor.toString().split("");
                        cadr ="";
                        for (let i = 1; i < cad.length-1; i++) {
                            cadr += cad[i];
                        }

                        if(v1.valor.toLowerCase()=="true"){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }

                        return res;
                    case "Boolean":
                        res.tipo="Boolean";
                        if(v1.valor.toLowerCase()=="true"||v2.valor.toLowerCase()=="true"){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        return res;

                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible la operación lógica OR entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
                
            default:
                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible la operación lógica OR entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                res.tipo="error";
                res.valor="error";
                return res;
        }
    },
    opand: function(v1,v2,fila,columna){
        let res = new ResultadoOp();
        let cad,cadr,cad2,cadr2;
        
        switch(v1.tipo){
            case "Int":
                switch(v2.tipo){ 
                    case "Boolean":
                        res.tipo="Boolean";
                        res.valor="false"
                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible la operación lógica AND entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
            case "Double":
                switch(v2.tipo){
                    case "Boolean":
                        res.tipo="Boolean";
                        res.valor="false"
                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible la operación lógica AND entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
            case "Char":
                switch(v2.tipo){
                    case "Boolean":
                        res.tipo="Boolean";
                        res.valor="false"
                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible la operación lógica AND entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
            case "String":
                switch(v2.tipo){
                    case "Boolean":
                        res.tipo="Boolean";
                        res.valor="false"
                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible la operación lógica AND entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }

            case "Boolean":
                switch(v2.tipo){
                    case "Int":
                        res.tipo="Boolean";
                        res.valor="false";
                        return res;
                    case "Double":
                        res.tipo="Boolean";
                        res.valor="false";
                        return res;
                    case "Char":
                        res.tipo="Boolean";
                        res.valor="false";
                        return res;
                    case "String":
                        res.tipo="Boolean";
                        res.valor="false";
                        return res;
                    case "Boolean":
                        res.tipo="Boolean";
                        if(v1.valor.toLowerCase()=="true"&&v2.valor.toLowerCase()=="true"){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        return res;

                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible la operación lógica AND entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
                
            default:
                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible la operación lógica AND entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                res.tipo="error";
                res.valor="error";
                return res;
        }
    },
    neg: function(v1,fila,columna){
        let res = new ResultadoOp();
        let cad,cadr;
        switch(v1.tipo){
            case "Boolean":
                res.tipo="Boolean";
                res.valor=0-parseInt(v1.valor);
                if(v1.valor.toLowerCase()=="true"){
                    res.valor="false"
                }else{
                    res.valor="true"
                }
                return res;
            
            default:
                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible la negacion para: "+v1.valor,fila,columna));
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