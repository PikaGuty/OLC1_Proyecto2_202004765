var errores = require("../Errores")

module.exports = {
    suma: function(v1,v2,fila,columna){
        let res = new ResultadoOp();
        let cad,cadr;
        switch(v1.tipo){
            case "Int":
                switch(v2.tipo){
                    case "Int":
                        res.tipo="Int";
                        res.valor=parseInt(v1.valor)+parseInt(v2.valor);
                        return res;
                    case "Double":
                        res.tipo="Double";
                        res.valor=parseFloat(v1.valor)+parseFloat(v2.valor);
                        return res;
                    case "Boolean":
                        res.tipo="Int";
                        if (v2.valor.toLowerCase()=="true"){
                            res.valor=parseInt(v1.valor)+1;
                        }else{
                            res.valor=parseInt(v1.valor);
                        }
                        return res;
                    case "Char":
                        res.tipo="Int";
                        cad=v2.valor.toString().split("");
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

                        res.valor=parseInt(v1.valor)+cadr.toString().charCodeAt();
                        return res;
                    case "String":
                        res.tipo="String";
                        cad=v2.valor.toString().split("");
                        cadr ="";
                        for (let i = 1; i < cad.length-1; i++) {
                            cadr += cad[i];
                        }
                        res.valor="\""+v1.valor+cadr+"\"";
                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible sumar entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
            case "Double":
                switch(v2.tipo){
                    case "Int":
                        res.tipo="Double";
                        res.valor=parseFloat(v1.valor)+parseFloat(v2.valor);
                        return res;
                    case "Double":
                        res.tipo="Double";
                        res.valor=parseFloat(v1.valor)+parseFloat(v2.valor);
                        return res;
                    case "Boolean":
                        res.tipo="Double";
                        if (v2.valor.toLowerCase()=="true"){
                            res.valor=parseFloat(v1.valor)+1;
                        }else{
                            res.valor=parseFloat(v1.valor);
                        }
                        return res;
                    case "Char":
                        res.tipo="Double";
                        cad=v2.valor.toString().split("");
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

                        res.valor=parseFloat(v1.valor)+cadr.toString().charCodeAt();
                        return res;
                    case "String":
                        res.tipo="String";
                        cad=v2.valor.toString().split("");
                        cadr ="";
                        for (let i = 1; i < cad.length-1; i++) {
                            cadr += cad[i];
                        }
                        res.valor="\""+v1.valor+cadr+"\"";
                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible sumar entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
            case "Boolean":
                switch(v2.tipo){
                    case "Int":
                        res.tipo="Int";
                        if (v1.valor=="true"){
                            res.valor=parseInt(v2.valor)+1;
                        }else{
                            res.valor=parseInt(v2.valor);
                        }
                        return res;
                    case "Double":
                        res.tipo="Double";
                        if (v1.valor=="true"){
                            res.valor=parseFloat(v2.valor)+1;
                        }else{
                            res.valor=parseFloat(v2.valor);
                        }
                        return res;
                    case "String":
                        res.tipo="String";
                        cad=v2.valor.toString().split("");
                        cadr ="";
                        for (let i = 1; i < cad.length-1; i++) {
                            cadr += cad[i];
                        }
                        res.valor="\""+v1.valor+cadr+"\"";
                                                
                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible sumar entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
            case "Char":
                switch(v2.tipo){
                    case "Int":
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

                        res.valor=parseInt(v2.valor)+cadr.toString().charCodeAt();

                        return res;
                    case "Double":
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

                        res.valor=parseFloat(v2.valor)+cadr.toString().charCodeAt();

                        return res;
                    
                    case "Char":
                        res.tipo="String";
                        cad=v1.valor.toString().split("");
                        cadr ="";
                        for (let i = 1; i < cad.length-1; i++) {
                            cadr += cad[i];
                        }
                        res.valor="\""+cadr;
                        cad=v2.valor.toString().split("");
                        cadr ="";
                        for (let i = 1; i < cad.length-1; i++) {
                            cadr += cad[i];
                        }
                        res.valor+=cadr+"\"";
                        return res;
                    case "String":
                        res.tipo="String";
                        cad=v1.valor.toString().split("");
                        cadr ="";
                        for (let i = 1; i < cad.length-1; i++) {
                            cadr += cad[i];
                        }
                        res.valor="\""+cadr;

                        cad=v2.valor.toString().split("");
                        cadr ="";
                        for (let i = 1; i < cad.length-1; i++) {
                            cadr += cad[i];
                        }
                        res.valor+=cadr+"\"";
                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible sumar entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
            case "String":
                switch(v2.tipo){
                    case "Int":
                        res.tipo="String";
                        cad=v1.valor.toString().split("");
                        cadr ="";
                        for (let i = 1; i < cad.length-1; i++) {
                            cadr += cad[i];
                        }
                        res.valor="\""+cadr+v2.valor+"\"";
                        return res;
                    case "Double":
                        res.tipo="String";
                        cad=v1.valor.toString().split("");
                        cadr ="";
                        for (let i = 1; i < cad.length-1; i++) {
                            cadr += cad[i];
                        }
                        res.valor="\""+cadr+v2.valor+"\"";
                        return res;
                    case "Boolean":
                        res.tipo="String";
                        cad=v1.valor.toString().split("");
                        cadr ="";
                        for (let i = 1; i < cad.length-1; i++) {
                            cadr += cad[i];
                        }
                        res.valor="\""+cadr+v2.valor+"\"";
                        return res;
                    case "Char":
                        res.tipo="String";
                        cad=v1.valor.toString().split("");
                        cadr ="";
                        for (let i = 1; i < cad.length-1; i++) {
                            cadr += cad[i];
                        }
                        res.valor="\""+cadr;

                        cad=v2.valor.toString().split("");
                        cadr ="";
                        for (let i = 1; i < cad.length-1; i++) {
                            cadr += cad[i];
                        }
                        res.valor+=cadr+"\"";
                        return res;
                    case "String":
                        res.tipo="String";
                        cad=v1.valor.toString().split("");
                        cadr ="";
                        for (let i = 1; i < cad.length-1; i++) {
                            cadr += cad[i];
                        }
                        res.valor="\""+cadr;

                        cad=v2.valor.toString().split("");
                        cadr ="";
                        for (let i = 1; i < cad.length-1; i++) {
                            cadr += cad[i];
                        }
                        res.valor+=cadr+"\"";
                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible sumar entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
            default:
                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible sumar entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                res.tipo="error";
                res.valor="error";
                return res;
        }
    },

    resta: function(v1,v2,fila,columna){
        let res = new ResultadoOp();
        let cad,cadr;
        switch(v1.tipo){
            case "Int":
                switch(v2.tipo){
                    case "Int":
                        res.tipo="Int";
                        res.valor=parseInt(v1.valor)-parseInt(v2.valor);
                        return res;
                    case "Double":
                        res.tipo="Double";
                        res.valor=parseFloat(v1.valor)-parseFloat(v2.valor);
                        return res;
                    case "Boolean":
                        res.tipo="Int";
                        if (v2.valor.toLowerCase()=="true"){
                            res.valor=parseInt(v1.valor)-1;
                        }else{
                            res.valor=parseInt(v1.valor);
                        }
                        return res;
                    case "Char":
                        res.tipo="Int";
                        cad=v2.valor.toString().split("");
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

                        res.valor=parseInt(v1.valor)-cadr.toString().charCodeAt();
                        return res;
                    
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible restar entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
            case "Double":
                switch(v2.tipo){
                    case "Int":
                        res.tipo="Double";
                        res.valor=parseFloat(v1.valor)-parseFloat(v2.valor);
                        return res;
                    case "Double":
                        res.tipo="Double";
                        res.valor=parseFloat(v1.valor)-parseFloat(v2.valor);
                        return res;
                    case "Boolean":
                        res.tipo="Double";
                        if (v2.valor.toLowerCase()=="true"){
                            res.valor=parseFloat(v1.valor)-1;
                        }else{
                            res.valor=parseFloat(v1.valor);
                        }
                        return res;
                    case "Char":
                        res.tipo="Double";
                        cad=v2.valor.toString().split("");
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

                        res.valor=parseFloat(v1.valor)-cadr.toString().charCodeAt();
                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible restar entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
            case "Boolean":
                switch(v2.tipo){
                    case "Int":
                        res.tipo="Int";
                        if (v1.valor=="true"){
                            res.valor=1-parseInt(v2.valor);
                        }else{
                            res.valor=0-parseInt(v2.valor);
                        }
                        return res;
                    case "Double":
                        res.tipo="Double";
                        if (v1.valor=="true"){
                            res.valor=1-parseFloat(v2.valor);
                        }else{
                            res.valor=0-parseFloat(v2.valor);
                        }
                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible restar entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
            case "Char":
                switch(v2.tipo){
                    case "Int":
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

                        res.valor=cadr.toString().charCodeAt()-parseInt(v2.valor);

                        return res;
                    case "Double":
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

                        res.valor=cadr.toString().charCodeAt()-parseFloat(v2.valor);

                        return res;
                    
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible restar entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
                default:
                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible restar entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                    res.tipo="error";
                    res.valor="error";
                    return res;
            }
        },
    multiplicacion: function(v1,v2,fila,columna){
        let res = new ResultadoOp();
        let cad,cadr;
        switch(v1.tipo){
            case "Int":
                switch(v2.tipo){
                    case "Int":
                        res.tipo="Int";
                        res.valor=parseInt(v1.valor)*parseInt(v2.valor);
                        return res;
                    case "Double":
                        res.tipo="Double";
                        res.valor=parseFloat(v1.valor)*parseFloat(v2.valor);
                        return res;
                    case "Char":
                        res.tipo="Int";
                        cad=v2.valor.toString().split("");
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

                        res.valor=parseInt(v1.valor)*cadr.toString().charCodeAt();
                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible multiplicar entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
            case "Double":
                switch(v2.tipo){
                    case "Int":
                        res.tipo="Double";
                        res.valor=parseFloat(v1.valor)*parseFloat(v2.valor);
                        return res;
                    case "Double":
                        res.tipo="Double";
                        res.valor=parseFloat(v1.valor)*parseFloat(v2.valor);
                        return res;
                    case "Char":
                        res.tipo="Double";
                        cad=v2.valor.toString().split("");
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

                        res.valor=parseFloat(v1.valor)*cadr.toString().charCodeAt();
                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible multiplicar entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
            case "Char":
                switch(v2.tipo){
                    case "Int":
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

                        res.valor=cadr.toString().charCodeAt()*parseInt(v2.valor);

                        return res;
                    case "Double":
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

                        res.valor=cadr.toString().charCodeAt()*parseFloat(v2.valor);

                        return res;
                    
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible multiplicar entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
                default:
                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible multiplicar entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                    res.tipo="error";
                    res.valor="error";
                    return res;
            }
        },
    division: function(v1,v2,fila,columna){
        let res = new ResultadoOp();
        let cad,cadr;
        switch(v1.tipo){
            case "Int":
                switch(v2.tipo){
                    case "Int":
                        res.tipo="Double";
                        res.valor=parseInt(v1.valor)/parseInt(v2.valor);
                        return res;
                    case "Double":
                        res.tipo="Double";
                        res.valor=parseFloat(v1.valor)/parseFloat(v2.valor);
                        return res;
                    case "Char":
                        res.tipo="Double";
                        cad=v2.valor.toString().split("");
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

                        res.valor=parseInt(v1.valor)/cadr.toString().charCodeAt();
                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible dividir entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
            case "Double":
                switch(v2.tipo){
                    case "Int":
                        res.tipo="Double";
                        res.valor=parseFloat(v1.valor)/parseFloat(v2.valor);
                        return res;
                    case "Double":
                        res.tipo="Double";
                        res.valor=parseFloat(v1.valor)/parseFloat(v2.valor);
                        return res;
                    case "Char":
                        res.tipo="Double";
                        cad=v2.valor.toString().split("");
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

                        res.valor=parseFloat(v1.valor)/cadr.toString().charCodeAt();
                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible dividir entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
            case "Char":
                switch(v2.tipo){
                    case "Int":
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

                        res.valor=cadr.toString().charCodeAt()/parseInt(v2.valor);

                        return res;
                    case "Double":
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

                        res.valor=cadr.toString().charCodeAt()/parseFloat(v2.valor);

                        return res;
                    
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible dividir entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
                default:
                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible dividir entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                    res.tipo="error";
                    res.valor="error";
                    return res;
            }
        },
    Potencia: function(v1,v2,fila,columna){
        let res = new ResultadoOp();
        let cad,cadr;
        switch(v1.tipo){
            case "Int":
                switch(v2.tipo){
                    case "Int":
                        res.tipo="Int";
                        res.valor=Math.pow(parseInt(v1.valor),parseInt(v2.valor));
                        return res;
                    case "Double":
                        res.tipo="Double";
                        res.valor=Math.pow(parseFloat(v1.valor),parseFloat(v2.valor));
                        return res;
                    
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible la potencia entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
            case "Double":
                switch(v2.tipo){
                    case "Int":
                        res.tipo="Double";
                        res.valor=Math.pow(parseFloat(v1.valor),parseFloat(v2.valor));
                        return res;
                    case "Double":
                        res.tipo="Double";
                        res.valor=Math.pow(parseFloat(v1.valor),parseFloat(v2.valor));
                        return res;
                    
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible la potencia entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
            
            default:
                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible la potencia entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                res.tipo="error";
                res.valor="error";
                return res;
            }
        },
    modular: function(v1,v2,fila,columna){
        let res = new ResultadoOp();
        let cad,cadr;
        switch(v1.tipo){
            case "Int":
                switch(v2.tipo){
                    case "Int":
                        res.tipo="Double";
                        res.valor=parseFloat(v1.valor)%parseFloat(v2.valor);
                        return res;
                    case "Double":
                        res.tipo="Double";
                        res.valor=parseFloat(v1.valor)%parseFloat(v2.valor);
                        return res;
                    
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible el modular entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
            case "Double":
                switch(v2.tipo){
                    case "Int":
                        res.tipo="Double";
                        res.valor=parseFloat(v1.valor)%parseFloat(v2.valor);
                        return res;
                    case "Double":
                        res.tipo="Double";
                        res.valor=parseFloat(v1.valor)%parseFloat(v2.valor);
                        return res;
                    
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible el modular entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
            
            default:
                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible el modualar entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                res.tipo="error";
                res.valor="error";
                return res;
            }
        },
    negacion: function(v1,fila,columna){
        let res = new ResultadoOp();
        let cad,cadr;
        switch(v1.tipo){
            case "Int":
                res.tipo="Int";
                res.valor=0-parseInt(v1.valor);
                return res;
            case "Double":
                res.tipo="Double";
                res.valor=0-parseFloat(v1.valor);
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
