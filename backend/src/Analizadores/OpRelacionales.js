var errores = require("../Errores")

module.exports = {
    igualacion: function(v1,v2,fila,columna){
        let res = new ResultadoOp();
        let cad,cadr,cad2,cadr2;
        switch(v1.tipo){
            case "Int":
                switch(v2.tipo){
                    case "Int":
                        res.tipo="Boolean";
                        if(parseInt(v1.valor)==parseInt(v2.valor)){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    case "Double":
                        res.tipo="Boolean";
                        if(parseInt(v1.valor)==parseFloat(v2.valor)){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    case "Char":
                        res.tipo="Boolean";
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

                        if(parseInt(v1.valor)==cadr.toString().charCodeAt()){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible comparar entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
            case "Double":
                switch(v2.tipo){
                    case "Int":
                        res.tipo="Boolean";
                        if(parseFloat(v1.valor)==parseInt(v2.valor)){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    case "Double":
                        res.tipo="Boolean";
                        if(parseFloat(v1.valor)==parseFloat(v2.valor)){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    case "Char":
                        res.tipo="Boolean";
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

                        if(parseFloat(v1.valor)==cadr.toString().charCodeAt()){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible comparar entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
            case "Char":
                switch(v2.tipo){
                    case "Int":
                        res.tipo="Boolean";

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

                        if(cadr.toString().charCodeAt()==parseInt(v2.valor)){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    case "Double":
                        res.tipo="Boolean";
                        
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

                        if(cadr.toString().charCodeAt()==parseFloat(v2.valor)){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    case "Char":
                        res.tipo="Boolean";
                        
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

                        cad2=v2.valor.toString().split("");
                        cadr2 ="";
                        for (let i = 1; i < cad2.length-1; i++) {
                            cadr2 += cad2[i];
                        }
                        cadr2=cadr2.replace(/\\n/g,"\n");
                        cadr2=cadr2.replace(/\\t/g,"\t");
                        cadr2=cadr2.replace(/\\r/g,"\r");
                        cadr2=cadr2.replace(/\\\\/g,"\\");
                        cadr2=cadr2.replace(/\\\"/g,"\"");
                        cadr2=cadr2.replace(/\\\'/g,"\'");

                        if(cadr.toString().charCodeAt()==cadr2.toString().charCodeAt()){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible comparar entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
            case "String":
                switch(v2.tipo){
                    case "String":
                        res.tipo="Boolean";

                        cad=v1.valor.toString().split("");
                        cadr ="";
                        for (let i = 1; i < cad.length-1; i++) {
                            cadr += cad[i];
                        }

                        cad2=v2.valor.toString().split("");
                        cadr2 ="";
                        for (let i = 1; i < cad2.length-1; i++) {
                            cadr2 += cad2[i];
                        }

                        if(cadr.toString()==cadr2.toString()){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        
                        res.anterior=v2.valor
                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible comparar entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }

            case "Boolean":
                switch(v2.tipo){
                    case "Boolean":
                        res.tipo="Boolean";

                        if(v1.valor.toLowerCase()==v2.valor.toLowerCase()){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        
                        res.anterior=v2.valor
                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible comparar entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
                
            default:
                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible comparar entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                res.tipo="error";
                res.valor="error";
                return res;
        }
    },
    diferenciacion: function(v1,v2,fila,columna){
        let res = new ResultadoOp();
        let cad,cadr,cad2,cadr2;
        switch(v1.tipo){
            case "Int":
                switch(v2.tipo){
                    case "Int":
                        res.tipo="Boolean";
                        if(parseInt(v1.valor)!=parseInt(v2.valor)){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    case "Double":
                        res.tipo="Boolean";
                        if(parseInt(v1.valor)!=parseFloat(v2.valor)){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    case "Char":
                        res.tipo="Boolean";
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

                        if(parseInt(v1.valor)!=cadr.toString().charCodeAt()){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible comparar entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
            case "Double":
                switch(v2.tipo){
                    case "Int":
                        res.tipo="Boolean";
                        if(parseFloat(v1.valor)!=parseInt(v2.valor)){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    case "Double":
                        res.tipo="Boolean";
                        if(parseFloat(v1.valor)!=parseFloat(v2.valor)){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    case "Char":
                        res.tipo="Boolean";
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

                        if(parseFloat(v1.valor)!=cadr.toString().charCodeAt()){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible comparar entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
            case "Char":
                switch(v2.tipo){
                    case "Int":
                        res.tipo="Boolean";

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

                        if(cadr.toString().charCodeAt()!=parseInt(v2.valor)){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    case "Double":
                        res.tipo="Boolean";
                        
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

                        if(cadr.toString().charCodeAt()!=parseFloat(v2.valor)){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    case "Char":
                        res.tipo="Boolean";
                        
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

                        cad2=v2.valor.toString().split("");
                        cadr2 ="";
                        for (let i = 1; i < cad2.length-1; i++) {
                            cadr2 += cad2[i];
                        }
                        cadr2=cadr2.replace(/\\n/g,"\n");
                        cadr2=cadr2.replace(/\\t/g,"\t");
                        cadr2=cadr2.replace(/\\r/g,"\r");
                        cadr2=cadr2.replace(/\\\\/g,"\\");
                        cadr2=cadr2.replace(/\\\"/g,"\"");
                        cadr2=cadr2.replace(/\\\'/g,"\'");

                        if(cadr.toString().charCodeAt()!=cadr2.toString().charCodeAt()){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible comparar entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
            case "String":
                switch(v2.tipo){
                    case "String":
                        res.tipo="Boolean";

                        cad=v1.valor.toString().split("");
                        cadr ="";
                        for (let i = 1; i < cad.length-1; i++) {
                            cadr += cad[i];
                        }

                        cad2=v2.valor.toString().split("");
                        cadr2 ="";
                        for (let i = 1; i < cad2.length-1; i++) {
                            cadr2 += cad2[i];
                        }

                        if(cadr.toString()!=cadr2.toString()){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        
                        res.anterior=v2.valor
                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible comparar entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }

            case "Boolean":
                switch(v2.tipo){
                    case "Boolean":
                        res.tipo="Boolean";

                        if(v1.valor.toLowerCase()!=v2.valor.toLowerCase()){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        
                        res.anterior=v2.valor
                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible comparar entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
                
            default:
                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible comparar entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                res.tipo="error";
                res.valor="error";
                return res;
        }
    },
    mayique: function(v1,v2,fila,columna){
        let res = new ResultadoOp();
        let cad,cadr,cad2,cadr2;
        switch(v1.tipo){
            case "Int":
                switch(v2.tipo){
                    case "Int":
                        res.tipo="Boolean";
                        if(parseInt(v1.valor)>=parseInt(v2.valor)){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    case "Double":
                        res.tipo="Boolean";
                        if(parseInt(v1.valor)>=parseFloat(v2.valor)){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    case "Char":
                        res.tipo="Boolean";
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

                        if(parseInt(v1.valor)>=cadr.toString().charCodeAt()){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible comparar entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
            case "Double":
                switch(v2.tipo){
                    case "Int":
                        res.tipo="Boolean";
                        if(parseFloat(v1.valor)>=parseInt(v2.valor)){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    case "Double":
                        res.tipo="Boolean";
                        if(parseFloat(v1.valor)>=parseFloat(v2.valor)){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    case "Char":
                        res.tipo="Boolean";
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

                        if(parseFloat(v1.valor)>=cadr.toString().charCodeAt()){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible comparar entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
            case "Char":
                switch(v2.tipo){
                    case "Int":
                        res.tipo="Boolean";

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

                        if(cadr.toString().charCodeAt()>=parseInt(v2.valor)){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    case "Double":
                        res.tipo="Boolean";
                        
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

                        if(cadr.toString().charCodeAt()>=parseFloat(v2.valor)){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    case "Char":
                        res.tipo="Boolean";
                        
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

                        cad2=v2.valor.toString().split("");
                        cadr2 ="";
                        for (let i = 1; i < cad2.length-1; i++) {
                            cadr2 += cad2[i];
                        }
                        cadr2=cadr2.replace(/\\n/g,"\n");
                        cadr2=cadr2.replace(/\\t/g,"\t");
                        cadr2=cadr2.replace(/\\r/g,"\r");
                        cadr2=cadr2.replace(/\\\\/g,"\\");
                        cadr2=cadr2.replace(/\\\"/g,"\"");
                        cadr2=cadr2.replace(/\\\'/g,"\'");

                        if(cadr.toString().charCodeAt()>=cadr2.toString().charCodeAt()){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible comparar entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
            case "String":
                switch(v2.tipo){
                    case "String":
                        res.tipo="Boolean";

                        cad=v1.valor.toString().split("");
                        cadr ="";
                        for (let i = 1; i < cad.length-1; i++) {
                            cadr += cad[i];
                        }

                        cad2=v2.valor.toString().split("");
                        cadr2 ="";
                        for (let i = 1; i < cad2.length-1; i++) {
                            cadr2 += cad2[i];
                        }

                        if(cadr.toString()>=cadr2.toString()){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        
                        res.anterior=v2.valor
                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible comparar entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }

            case "Boolean":
                switch(v2.tipo){
                    case "Boolean":
                        res.tipo="Boolean";

                        if(v1.valor.toLowerCase()>=v2.valor.toLowerCase()){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        
                        res.anterior=v2.valor
                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible comparar entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
                
            default:
                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible comparar entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                res.tipo="error";
                res.valor="error";
                return res;
        }
    },
    menique: function(v1,v2,fila,columna){
        let res = new ResultadoOp();
        let cad,cadr,cad2,cadr2;
        switch(v1.tipo){
            case "Int":
                switch(v2.tipo){
                    case "Int":
                        res.tipo="Boolean";
                        if(parseInt(v1.valor)<=parseInt(v2.valor)){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    case "Double":
                        res.tipo="Boolean";
                        if(parseInt(v1.valor)<=parseFloat(v2.valor)){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    case "Char":
                        res.tipo="Boolean";
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

                        if(parseInt(v1.valor)<=cadr.toString().charCodeAt()){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible comparar entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
            case "Double":
                switch(v2.tipo){
                    case "Int":
                        res.tipo="Boolean";
                        if(parseFloat(v1.valor)<=parseInt(v2.valor)){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    case "Double":
                        res.tipo="Boolean";
                        if(parseFloat(v1.valor)<=parseFloat(v2.valor)){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    case "Char":
                        res.tipo="Boolean";
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

                        if(parseFloat(v1.valor)<=cadr.toString().charCodeAt()){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible comparar entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
            case "Char":
                switch(v2.tipo){
                    case "Int":
                        res.tipo="Boolean";

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

                        if(cadr.toString().charCodeAt()<=parseInt(v2.valor)){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    case "Double":
                        res.tipo="Boolean";
                        
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

                        if(cadr.toString().charCodeAt()<=parseFloat(v2.valor)){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    case "Char":
                        res.tipo="Boolean";
                        
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

                        cad2=v2.valor.toString().split("");
                        cadr2 ="";
                        for (let i = 1; i < cad2.length-1; i++) {
                            cadr2 += cad2[i];
                        }
                        cadr2=cadr2.replace(/\\n/g,"\n");
                        cadr2=cadr2.replace(/\\t/g,"\t");
                        cadr2=cadr2.replace(/\\r/g,"\r");
                        cadr2=cadr2.replace(/\\\\/g,"\\");
                        cadr2=cadr2.replace(/\\\"/g,"\"");
                        cadr2=cadr2.replace(/\\\'/g,"\'");

                        if(cadr.toString().charCodeAt()<=cadr2.toString().charCodeAt()){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible comparar entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
            case "String":
                switch(v2.tipo){
                    case "String":
                        res.tipo="Boolean";

                        cad=v1.valor.toString().split("");
                        cadr ="";
                        for (let i = 1; i < cad.length-1; i++) {
                            cadr += cad[i];
                        }

                        cad2=v2.valor.toString().split("");
                        cadr2 ="";
                        for (let i = 1; i < cad2.length-1; i++) {
                            cadr2 += cad2[i];
                        }

                        if(cadr.toString()<=cadr2.toString()){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        
                        res.anterior=v2.valor
                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible comparar entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }

            case "Boolean":
                switch(v2.tipo){
                    case "Boolean":
                        res.tipo="Boolean";

                        if(v1.valor.toLowerCase()<=v2.valor.toLowerCase()){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        
                        res.anterior=v2.valor
                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible comparar entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
                
            default:
                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible comparar entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                res.tipo="error";
                res.valor="error";
                return res;
        }
    },
    mayque: function(v1,v2,fila,columna){
        let res = new ResultadoOp();
        let cad,cadr,cad2,cadr2;
        switch(v1.tipo){
            case "Int":
                switch(v2.tipo){
                    case "Int":
                        res.tipo="Boolean";
                        if(parseInt(v1.valor)>parseInt(v2.valor)){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    case "Double":
                        res.tipo="Boolean";
                        if(parseInt(v1.valor)>parseFloat(v2.valor)){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    case "Char":
                        res.tipo="Boolean";
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

                        if(parseInt(v1.valor)>cadr.toString().charCodeAt()){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible comparar entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
            case "Double":
                switch(v2.tipo){
                    case "Int":
                        res.tipo="Boolean";
                        if(parseFloat(v1.valor)>parseInt(v2.valor)){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    case "Double":
                        res.tipo="Boolean";
                        if(parseFloat(v1.valor)>parseFloat(v2.valor)){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    case "Char":
                        res.tipo="Boolean";
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

                        if(parseFloat(v1.valor)>cadr.toString().charCodeAt()){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible comparar entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
            case "Char":
                switch(v2.tipo){
                    case "Int":
                        res.tipo="Boolean";

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

                        if(cadr.toString().charCodeAt()>parseInt(v2.valor)){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    case "Double":
                        res.tipo="Boolean";
                        
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

                        if(cadr.toString().charCodeAt()>parseFloat(v2.valor)){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    case "Char":
                        res.tipo="Boolean";
                        
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

                        cad2=v2.valor.toString().split("");
                        cadr2 ="";
                        for (let i = 1; i < cad2.length-1; i++) {
                            cadr2 += cad2[i];
                        }
                        cadr2=cadr2.replace(/\\n/g,"\n");
                        cadr2=cadr2.replace(/\\t/g,"\t");
                        cadr2=cadr2.replace(/\\r/g,"\r");
                        cadr2=cadr2.replace(/\\\\/g,"\\");
                        cadr2=cadr2.replace(/\\\"/g,"\"");
                        cadr2=cadr2.replace(/\\\'/g,"\'");

                        if(cadr.toString().charCodeAt()>cadr2.toString().charCodeAt()){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible comparar entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
            case "String":
                switch(v2.tipo){
                    case "String":
                        res.tipo="Boolean";

                        cad=v1.valor.toString().split("");
                        cadr ="";
                        for (let i = 1; i < cad.length-1; i++) {
                            cadr += cad[i];
                        }

                        cad2=v2.valor.toString().split("");
                        cadr2 ="";
                        for (let i = 1; i < cad2.length-1; i++) {
                            cadr2 += cad2[i];
                        }

                        if(cadr.toString()>cadr2.toString()){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        
                        res.anterior=v2.valor
                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible comparar entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }

            case "Boolean":
                switch(v2.tipo){
                    case "Boolean":
                        res.tipo="Boolean";

                        if(v1.valor.toLowerCase()>v2.valor.toLowerCase()){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        
                        res.anterior=v2.valor
                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible comparar entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
                
            default:
                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible comparar entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                res.tipo="error";
                res.valor="error";
                return res;
        }
    },
    menque: function(v1,v2,fila,columna){
        let res = new ResultadoOp();
        let cad,cadr,cad2,cadr2;
        switch(v1.tipo){
            case "Int":
                switch(v2.tipo){
                    case "Int":
                        res.tipo="Boolean";
                        if(parseInt(v1.valor)<parseInt(v2.valor)){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    case "Double":
                        res.tipo="Boolean";
                        if(parseInt(v1.valor)<parseFloat(v2.valor)){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    case "Char":
                        res.tipo="Boolean";
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

                        if(parseInt(v1.valor)<cadr.toString().charCodeAt()){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible comparar entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
            case "Double":
                switch(v2.tipo){
                    case "Int":
                        res.tipo="Boolean";
                        if(parseFloat(v1.valor)<parseInt(v2.valor)){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    case "Double":
                        res.tipo="Boolean";
                        if(parseFloat(v1.valor)<parseFloat(v2.valor)){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    case "Char":
                        res.tipo="Boolean";
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

                        if(parseFloat(v1.valor)<cadr.toString().charCodeAt()){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible comparar entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
            case "Char":
                switch(v2.tipo){
                    case "Int":
                        res.tipo="Boolean";

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

                        if(cadr.toString().charCodeAt()<parseInt(v2.valor)){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    case "Double":
                        res.tipo="Boolean";
                        
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

                        if(cadr.toString().charCodeAt()<parseFloat(v2.valor)){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    case "Char":
                        res.tipo="Boolean";
                        
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

                        cad2=v2.valor.toString().split("");
                        cadr2 ="";
                        for (let i = 1; i < cad2.length-1; i++) {
                            cadr2 += cad2[i];
                        }
                        cadr2=cadr2.replace(/\\n/g,"\n");
                        cadr2=cadr2.replace(/\\t/g,"\t");
                        cadr2=cadr2.replace(/\\r/g,"\r");
                        cadr2=cadr2.replace(/\\\\/g,"\\");
                        cadr2=cadr2.replace(/\\\"/g,"\"");
                        cadr2=cadr2.replace(/\\\'/g,"\'");

                        if(cadr.toString().charCodeAt()<cadr2.toString().charCodeAt()){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        res.anterior=v2.valor
                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible comparar entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
            case "String":
                switch(v2.tipo){
                    case "String":
                        res.tipo="Boolean";

                        cad=v1.valor.toString().split("");
                        cadr ="";
                        for (let i = 1; i < cad.length-1; i++) {
                            cadr += cad[i];
                        }

                        cad2=v2.valor.toString().split("");
                        cadr2 ="";
                        for (let i = 1; i < cad2.length-1; i++) {
                            cadr2 += cad2[i];
                        }

                        if(cadr.toString()<cadr2.toString()){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        
                        res.anterior=v2.valor
                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible comparar entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }

            case "Boolean":
                switch(v2.tipo){
                    case "Boolean":
                        res.tipo="Boolean";

                        if(v1.valor.toLowerCase()<v2.valor.toLowerCase()){
                            res.valor="true"
                        }else{
                            res.valor="false"
                        }
                        
                        res.anterior=v2.valor
                        return res;
                    default:
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible comparar entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                        res.tipo="error";
                        res.valor="error";
                        return res;
                }
                
            default:
                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible comparar entre: "+v1.tipo +' y '+v2.tipo,fila,columna));
                res.tipo="error";
                res.valor="error";
                return res;
        }
    }
}

class ResultadoOp{
    constructor(tipo,valor,anterior){
        this.tipo=tipo;
        this.valor=valor;
        this.anterior=anterior
    }
}