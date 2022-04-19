var errores = require("../Errores")
var tabsim = require("../tabla_simbolos")

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
    tCharA: function(v1,fila,columna){
        let res = new ResultadoOp();
        if(v1.tipo=="String"){
            res.tipo="Lista"
            let pre = v1.valor.split("")
            let lista=""
            for (let i = 1; i < pre.length-1; i++) {
                lista+=pre[i]
            }
            res.valor=lista
            return res;
        }else{
            errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","La función \"length\" solo recibe como parámetro una expresión de tipo cadena, listas y vectores",fila,columna));
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
                let list=[]
                let valores=[]
                
                switch(v1.otro){
                    case "AsignacionV":
                        res.tipo="Int";
                        list = v1.valor.split("")

                        valores=[]
                        for (let i = 1; i < list.length-1; i++) {
                            if(list[i]!=","){
                                valores.push(list[i])
                            }
                        }
                        res.valor=valores.length
                        return res;
                    case "AsignacionV2":
                        list = v1.valor.split("")
                
                        valores=""
                        for (let i = 1; i < list.length-1; i++) {
                            valores+=list[i]
                        }

                        list = valores.split("[")
                        valores=""
                        for (let i = 0; i < list.length; i++) {
                            valores+=list[i]
                        }

                        list = valores.split("]")
                        
                        valores=""
                        let sub;
                        let lDef=[];
                        for (let i = 0; i < list.length-1; i++) {
                            sub=list[i].split(",")
                            let sub2 =[];
                            for (let j = 0; j < sub.length; j++) {
                                if(sub[j]!=""){
                                    sub2.push(sub[j])
                                }
                            }
                            lDef.push(sub2)
                        }

                        //lDef.length,lDef[0].length
                        
                        res.tipo="Int";
                        res.valor= lDef.length
                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","La función \"length\" solo recibe como parámetro una expresión de tipo cadena, listas y vectores",fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
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
    },

    incr: function(nom,v1,fila,columna){
        if(v1.tipo=="Int"){
            res.tipo="Int";
            res.valor=v1.valor
            fincr(nom,fila,columna)
            return res;
        }else if(v1=="Double"){
            res.tipo="Double";
            res.valor=v1.valor
            fincr(nom,fila,columna)
            return res;
        }
        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No se puede incrementar la variable: \""+nom+"\" por que no es de tipo numérico",fila,columna));
        res.tipo="error";
        res.valor="error";
        return res;        
    },
    decr: function(nom,v1,fila,columna){
        if(v1.tipo=="Int"){
            res.tipo="Int";
            res.valor=v1.valor
            fdecr(nom,fila,columna)
            return res;
        }else if(v1=="Double"){
            res.tipo="Double";
            res.valor=v1.valor
            fdecr(nom,fila,columna)
            return res;
        }
        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No se puede decrementar la variable: \""+nom+"\" por que no es de tipo numérico",fila,columna));
        res.tipo="error";
        res.valor="error";
        return res;        
    },
    terna: function(v1,v2,v3,fila,columna){
        console.log("Condicion "+v1.valor) 
        if(v1.tipo="Boolean"){
            if(v1.valor.toLowerCase()=="true"){
                res.tipo = v2.tipo;
                res.valor = v2.valor;
                return res;
            }else{
                res.tipo = v3.tipo;
                res.valor = v3.valor;
                return res;
            }
        }else{
            errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","El primer parámetro debe ser una condición (devolver un valor booleano)",fila,columna));
            res.tipo="error";
            res.valor="error";
            return res; 
        }      
    }
}

function fincr(nom,fila,columna){
    simbolo = tabsim.tabla.getInstancia().getSimbolo(nom);
    if(simbolo!=null){
        let tipo = simbolo.tipo2;
        if(tipo=="Double"||tipo=="Int"){
            sim = new tabsim.simbolo(nom,"Incremento",tipo,parseInt(simbolo.valor)+1,fila,columna)
        }else{
            errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No se puede incrementar la variable: \""+nom+"\" por que no es de tipo numérico",fila,columna));
        }
        if(sim!=null){
            tabsim.tabla.getInstancia().modificarSimbolo(sim)
        }
    }else{
        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No existe una variable con el identificador: \""+nom+"\"",fila,columna));
    }
}

function fdecr(nom,fila,columna){
    simbolo = tabsim.tabla.getInstancia().getSimbolo(nom);
    if(simbolo!=null){
        let tipo = simbolo.tipo2;
        if(tipo=="Double"||tipo=="Int"){
            sim = new tabsim.simbolo(nom,"Decremento",tipo,parseInt(simbolo.valor)-1,fila,columna)
        }else{
            errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No se puede incrementar la variable: \""+nom+"\" por que no es de tipo numérico",fila,columna));
        }
        if(sim!=null){
            tabsim.tabla.getInstancia().modificarSimbolo(sim)
        }
    }else{
        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No existe una variable con el identificador: \""+nom+"\"",fila,columna));
    }
}

class ResultadoOp{
    constructor(tipo,valor){
        this.tipo=tipo;
        this.valor=valor;
    }
}