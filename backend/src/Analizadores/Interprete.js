
var aritmetica = require("./OpAritmeticas")
var relacionales = require("./OpRelacionales")
var logicos = require("./OpLogicos")
var lista = require("./lista")
var fntiva = require("./FNativas")
var tabsim = require("../tabla_simbolos")
var errores = require("../Errores")

module.exports = {

    interpretar: function(raiz){

        let op;
        let res;
        let codigo=""
        let sim;
        let simbolo;
        let vector1, vector2;
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
            case "Asig":
                res=evaluarExpresion(raiz.hijos[1]);
                simbolo = tabsim.tabla.getInstancia().getSimbolo(raiz.hijos[0].valor);
                if(simbolo!=null){
                    let tipo = simbolo.tipo2;
                    if (tipo==res.tipo){
                        if(tipo=="Int"){
                            if(-2147483648 <= res.valor && res.valor <= 2147483647){
                                sim = new tabsim.simbolo(raiz.hijos[0].valor,"Asignacion",tipo,res.valor,raiz.fila,raiz.columna)
                            }else{
                                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Los valores permitidos para variables de tipo entero son entre -2147483648 y 2147483647",raiz.hijos[1].fila,raiz.hijos[1].columna));
                            }
                        }else{
                            sim = new tabsim.simbolo(raiz.hijos[0].valor,"Asignacion",tipo,res.valor,raiz.fila,raiz.columna)
                        }
                        
                    }else if(tipo=="Double"&&res.tipo=="Int"){
                        sim = new tabsim.simbolo(raiz.hijos[0].valor,"Asignacion",tipo,res.valor,raiz.fila,raiz.columna)
                    }else if(tipo=="Int"&&res.tipo=="Boolean"){
                        if(res.valor.toString().toLowerCase()=="true"){
                            sim = new tabsim.simbolo(raiz.hijos[0].valor,"Asignacion",tipo,1,raiz.fila,raiz.columna)
                        }else{
                            sim = new tabsim.simbolo(raiz.hijos[0].valor,"Asignacion",tipo,0,raiz.fila,raiz.columna)
                        }
                        
                    }else{
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Error semantico, el dato \""+res.valor+"\" no es de tipo \""+tipo+"\"",raiz.hijos[1].fila,raiz.hijos[1].columna));
                    }

                    if(sim!=null){
                        tabsim.tabla.getInstancia().modificarSimbolo(sim)
                    }
                }else{
                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No existe una variable con el identificador: \""+raiz.hijos[0].valor+"\"",raiz.hijos[1].fila,raiz.hijos[1].columna));
                }
                
                break;
            case "Incr":
                simbolo = tabsim.tabla.getInstancia().getSimbolo(raiz.hijos[0].hijos[0].valor);
                if(simbolo!=null){
                    let tipo = simbolo.tipo2;
                    if(tipo=="Double"||tipo=="Int"){
                        sim = new tabsim.simbolo(raiz.hijos[0].hijos[0].valor,"Incremento",tipo,parseInt(simbolo.valor)+1,raiz.hijos[0].hijos[0].fila,raiz.hijos[0].hijos[0].columna)
                    }else{
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No se puede incrementar la variable: \""+raiz.hijos[0].hijos[0].valor+"\" por que no es de tipo numérico",raiz.hijos[0].hijos[0].fila,raiz.hijos[0].hijos[0].columna));
                    }
                    if(sim!=null){
                        tabsim.tabla.getInstancia().modificarSimbolo(sim)
                    }
                }else{
                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No existe una variable con el identificador: \""+raiz.hijos[0].hijos[0].valor+"\"",raiz.hijos[0].hijos[0].fila,raiz.hijos[0].hijos[0].columna));
                }
                break;
            case "Decr":
                simbolo = tabsim.tabla.getInstancia().getSimbolo(raiz.hijos[0].hijos[0].valor);
                if(simbolo!=null){
                    let tipo = simbolo.tipo2;
                    if(tipo=="Double"||tipo=="Int"){
                        sim = new tabsim.simbolo(raiz.hijos[0].hijos[0].valor,"Decremento",tipo,parseInt(simbolo.valor)-1,raiz.hijos[0].hijos[0].fila,raiz.hijos[0].hijos[0].columna)
                    }else{
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No se puede decrementar la variable: \""+raiz.hijos[0].hijos[0].valor+"\" por que no es de tipo numérico",raiz.hijos[0].hijos[0].fila,raiz.hijos[0].hijos[0].columna));
                    }
                    if(sim!=null){
                        tabsim.tabla.getInstancia().modificarSimbolo(sim)
                    }
                }else{
                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No existe una variable con el identificador: \""+raiz.hijos[0].hijos[0].valor+"\"",raiz.hijos[0].hijos[0].fila,raiz.hijos[0].hijos[0].columna));
                }
                break;
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
            case "DecVec1":
                vector1=null;
                if(raiz.hijos[0].valor==raiz.hijos[2].valor){
                    res=evaluarExpresion(raiz.hijos[3]);
                    if(res.tipo=="Int"){
                        vector1 = new lista.listaVec(raiz.hijos[2].valor,parseInt(res.valor))
                        simbolo = tabsim.tabla.getInstancia().getSimbolo(raiz.hijos[1].valor);
                        sim = new tabsim.simbolo(raiz.hijos[1].valor,"AsignacionV",raiz.hijos[2].valor,vector1.reg(),raiz.fila,raiz.columna)
                        if(simbolo!=null){
                            if(simbolo.tipo1=="Asignacion"||simbolo.tipo1=="Declaracion"||simbolo.tipo1=="Incremento"||simbolo.tipo1=="Decremento"||simbolo.tipo1=="AsignacionV"||simbolo.tipo1=="AsignacionV2"){
                                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Ya existe una varible con el nombre \""+sim.nombre+"\"",raiz.hijos[0].fila,raiz.hijos[0].columna));
                            }else if(simbolo.tipo=="Funcion"||simbolo.tipo=="Metodo"){
                                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Ya existe una función o método con el nombre \""+sim.nombre+"\"",raiz.hijos[0].fila,raiz.hijos[0].columna));
                            }
                        }else{
                            tabsim.tabla.getInstancia().pushSimbolo(sim)
                        }
                    }else{
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","La dimensión del vector debe ser de tipo Entera",raiz.hijos[3].fila,raiz.hijos[3].columna));
                    }
                    
                }else if(raiz.hijos[2].valor=="ListVec1"){
                    tipo = raiz.hijos[0].valor;
                    vector1 = new lista.listaVec(tipo,raiz.hijos[2].hijos.length)
                    let permitido = true;
                    for (let i = 0; i < raiz.hijos[2].hijos.length; i++) {
                        res=evaluarExpresion(raiz.hijos[2].hijos[i]);

                        if (tipo==res.tipo){
                            if(tipo=="Int"){
                                if(-2147483648 <= res.valor && res.valor <= 2147483647){
                                    vector1.insertar(res.valor,i,raiz.hijos[2].hijos[i].fila,raiz.hijos[2].hijos[i].columna);
                                }else{
                                    permitido=false;
                                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Los valores permitidos para variables de tipo entero son entre -2147483648 y 2147483647",raiz.hijos[2].hijos[i].fila,raiz.hijos[2].hijos[i].columna));
                                }
                            }else{
                                vector1.insertar(res.valor,i,raiz.hijos[2].hijos[i].fila,raiz.hijos[2].hijos[i].columna);
                            }
                            
                        }else if(tipo=="Double"&&res.tipo=="Int"){
                            sim = new tabsim.simbolo(raiz.hijos[0].valor,"Asignacion",tipo,res.valor,raiz.fila,raiz.columna)
                        }else if(tipo=="Int"&&res.tipo=="Boolean"){
                            if(res.valor.toString().toLowerCase()=="true"){
                                vector1.insertar(1,i,raiz.hijos[2].hijos[i].fila,raiz.hijos[2].hijos[i].columna);
                            }else{
                                vector1.insertar(0,i,raiz.hijos[2].hijos[i].fila,raiz.hijos[2].hijos[i].columna);
                            }
                            
                        }else{
                            permitido=false;
                            errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Error semantico, el dato \""+res.valor+"\" no es de tipo \""+tipo+"\"",raiz.hijos[2].hijos[i].fila,raiz.hijos[2].hijos[i].columna));
                        }

                    }
                    simbolo = tabsim.tabla.getInstancia().getSimbolo(raiz.hijos[1].valor);
                    sim = new tabsim.simbolo(raiz.hijos[1].valor,"AsignacionV",raiz.hijos[0].valor,vector1.reg(),raiz.fila,raiz.columna)
                    if(simbolo!=null){
                        if(simbolo.tipo1=="Asignacion"||simbolo.tipo1=="Declaracion"||simbolo.tipo1=="Incremento"||simbolo.tipo1=="Decremento"||simbolo.tipo1=="AsignacionV"||simbolo.tipo1=="AsignacionV2"){
                            errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Ya existe una varible con el nombre \""+sim.nombre+"\"",raiz.hijos[1].fila,raiz.hijos[1].columna));
                        }else if(simbolo.tipo=="Funcion"||simbolo.tipo=="Metodo"){
                            errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Ya existe una función o método con el nombre \""+sim.nombre+"\"",raiz.hijos[1].fila,raiz.hijos[1].columna));
                        }
                    }else{
                        if(permitido)
                            tabsim.tabla.getInstancia().pushSimbolo(sim)
                    }
                }else{
                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Esta no es una forma correcta de declarar vectores de una dimensión",raiz.hijos[2].fila,raiz.hijos[2].columna));
                }
                break;
            case "DecVec2":
                vector1=null;
                if(raiz.hijos[0].valor==raiz.hijos[2].valor){
                    res1=evaluarExpresion(raiz.hijos[3]);
                    res2=evaluarExpresion(raiz.hijos[3]);
                    if(res1.tipo=="Int"||res2.tipo=="Int"){
                        vector1 = new lista.listaVec2(raiz.hijos[2].valor,parseInt(res1.valor),parseInt(res2.valor))
                        simbolo = tabsim.tabla.getInstancia().getSimbolo(raiz.hijos[1].valor);
                        sim = new tabsim.simbolo(raiz.hijos[1].valor,"AsignacionV2",raiz.hijos[2].valor,vector1.reg(),raiz.fila,raiz.columna)
                        if(simbolo!=null){
                            if(simbolo.tipo1=="Asignacion"||simbolo.tipo1=="Declaracion"||simbolo.tipo1=="Incremento"||simbolo.tipo1=="Decremento"||simbolo.tipo1=="AsignacionV"||simbolo.tipo1=="AsignacionV2"){
                                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Ya existe una varible con el nombre \""+sim.nombre+"\"",raiz.hijos[0].fila,raiz.hijos[0].columna));
                            }else if(simbolo.tipo=="Funcion"||simbolo.tipo=="Metodo"){
                                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Ya existe una función o método con el nombre \""+sim.nombre+"\"",raiz.hijos[0].fila,raiz.hijos[0].columna));
                            }
                        }else{
                            tabsim.tabla.getInstancia().pushSimbolo(sim)
                        }
                    }else{
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","La dimensión del vector debe ser de tipo Entera",raiz.hijos[3].fila,raiz.hijos[3].columna));
                    }
                    
                }else if(raiz.hijos[2].valor=="ListVec2"){
                    tipo = raiz.hijos[0].valor;
                    let dim2=0; 
                    for (let i = 0; i < raiz.hijos[2].hijos.length; i++) {
                        if(raiz.hijos[2].hijos[i].hijos.length>dim2){
                            dim2=raiz.hijos[2].hijos[i].hijos.length
                        }
                    }
                    vector2 = new lista.listaVec2(tipo,raiz.hijos[2].hijos.length,dim2)
                    let permitido = true;
                    for (let i = 0; i < raiz.hijos[2].hijos.length; i++) {
                        for (let j = 0; j < raiz.hijos[2].hijos[i].hijos.length; j++) {
                            res=evaluarExpresion(raiz.hijos[2].hijos[i].hijos[j]);

                            if (tipo==res.tipo){
                                if(tipo=="Int"){
                                    if(-2147483648 <= res.valor && res.valor <= 2147483647){
                                        vector2.insertar(res.valor,i,j,raiz.hijos[2].hijos[i].hijos[j].fila,raiz.hijos[2].hijos[i].hijos[j].columna);
                                    }else{
                                        permitido=false;
                                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Los valores permitidos para variables de tipo entero son entre -2147483648 y 2147483647",raiz.hijos[2].hijos[i].fila,raiz.hijos[2].hijos[i].columna));
                                    }
                                }else{
                                    vector2.insertar(res.valor,i,j,raiz.hijos[2].hijos[i].hijos[j].fila,raiz.hijos[2].hijos[i].hijos[j].columna);
                                }
                                
                            }else if(tipo=="Double"&&res.tipo=="Int"){
                                sim = new tabsim.simbolo(raiz.hijos[0].valor,"Asignacion",tipo,res.valor,raiz.fila,raiz.columna)
                            }else if(tipo=="Int"&&res.tipo=="Boolean"){
                                if(res.valor.toString().toLowerCase()=="true"){
                                    vector2.insertar(1,i,j,raiz.hijos[2].hijos[i].hijos[j].fila,raiz.hijos[2].hijos[i].hijos[j].columna);
                                }else{
                                    vector2.insertar(0,i,j,raiz.hijos[2].hijos[i].hijos[j].fila,raiz.hijos[2].hijos[i].hijos[j].columna);
                                }
                                
                            }else{
                                permitido=false;
                                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Error semantico, el dato \""+res.valor+"\" no es de tipo \""+tipo+"\"",raiz.hijos[2].hijos[i].fila,raiz.hijos[2].hijos[i].columna));
                            }
                        }
                    }
                    simbolo = tabsim.tabla.getInstancia().getSimbolo(raiz.hijos[1].valor);
                    sim = new tabsim.simbolo(raiz.hijos[1].valor,"AsignacionV",raiz.hijos[0].valor,vector2.reg(),raiz.fila,raiz.columna)
                    if(simbolo!=null){
                        if(simbolo.tipo1=="Asignacion"||simbolo.tipo1=="Declaracion"||simbolo.tipo1=="Incremento"||simbolo.tipo1=="Decremento"||simbolo.tipo1=="AsignacionV"||simbolo.tipo1=="AsignacionV2"){
                            errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Ya existe una varible con el nombre \""+sim.nombre+"\"",raiz.hijos[1].fila,raiz.hijos[1].columna));
                        }else if(simbolo.tipo=="Funcion"||simbolo.tipo=="Metodo"){
                            errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Ya existe una función o método con el nombre \""+sim.nombre+"\"",raiz.hijos[1].fila,raiz.hijos[1].columna));
                        }
                    }else{
                        if(permitido)
                            tabsim.tabla.getInstancia().pushSimbolo(sim)
                    }
                }else{
                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Esta no es una forma correcta de declarar vectores de una dimensión",raiz.hijos[2].fila,raiz.hijos[2].columna));
                }
                break;
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
                    sim= new tabsim.simbolo(raiz.valor,"Declaracion",tipo,0,raiz.fila,raiz.columna)
                    break;
                case "Double":
                    sim= new tabsim.simbolo(raiz.valor,"Declaracion",tipo,0.0,raiz.fila,raiz.columna)
                    break;
                case "Boolean":
                    sim= new tabsim.simbolo(raiz.valor,"Declaracion",tipo,true,raiz.fila,raiz.columna)
                    break;
                case "Char":
                    sim= new tabsim.simbolo(raiz.valor,"Declaracion",tipo,'0',raiz.fila,raiz.columna)
                    break;
                case "String":
                    sim= new tabsim.simbolo(raiz.valor,"Declaracion",tipo,"\"\"",raiz.fila,raiz.columna)
                    break;
            }
            if(sim!=null){
                let simbolo = tabsim.tabla.getInstancia().getSimbolo(sim.nombre);
                if(simbolo!=null){
                    if(simbolo.tipo1=="Asignacion"||simbolo.tipo1=="Declaracion"||simbolo.tipo1=="Incremento"||simbolo.tipo1=="Decremento"||simbolo.tipo1=="AsignacionV"||simbolo.tipo1=="AsignacionV2"){
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Ya existe una varible con el nombre \""+sim.nombre+"\"",raiz.fila,raiz.columna));
                    }else if(simbolo.tipo=="Funcion"||simbolo.tipo=="Metodo"){
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Ya existe una función o método con el nombre "+sim.nombre,raiz.fila,raiz.columna));
                    }
                }else{
                    tabsim.tabla.getInstancia().pushSimbolo(sim)
                }
                
            }
            break;
        case "Asig":
            res=evaluarExpresion(raiz.hijos[1]);
            
            if (tipo==res.tipo){
                if(tipo=="Int"){
                    if(-2147483648 <= res.valor && res.valor <= 2147483647){
                        sim = new tabsim.simbolo(raiz.hijos[0].valor,"Asignacion",tipo,res.valor,raiz.fila,raiz.columna)
                    }else{
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","os valores permitidos para variables de tipo entero son entre -2147483648 y 2147483647",raiz.hijos[1].fila,raiz.hijos[1].columna));
                    }
                }else{
                    sim = new tabsim.simbolo(raiz.hijos[0].valor,"Asignacion",tipo,res.valor,raiz.fila,raiz.columna)
                }
                
            }else if(tipo=="Double"&&res.tipo=="Int"){
                sim = new tabsim.simbolo(raiz.hijos[0].valor,"Asignacion",tipo,res.valor,raiz.fila,raiz.columna)
            }else if(tipo=="Int"&&res.tipo=="Boolean"){
                if(res.valor.toString().toLowerCase()=="true"){
                    sim = new tabsim.simbolo(raiz.hijos[0].valor,"Asignacion",tipo,1,raiz.fila,raiz.columna)
                }else{
                    sim = new tabsim.simbolo(raiz.hijos[0].valor,"Asignacion",tipo,0,raiz.fila,raiz.columna)
                }
                
            }else{
                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Error semantico, el dato \""+res.valor+"\" no es de tipo \""+tipo+"\"",raiz.hijos[1].fila,raiz.hijos[1].columna));
            }
            if(sim!=null){
                let simbolo = tabsim.tabla.getInstancia().getSimbolo(sim.nombre);
                if(simbolo!=null){
                    if(simbolo.tipo1=="Asignacion"||simbolo.tipo1=="Declaracion"||simbolo.tipo1=="Incremento"||simbolo.tipo1=="Decremento"||simbolo.tipo1=="AsignacionV"||simbolo.tipo1=="AsignacionV2"){
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Ya existe una varible con el nombre \""+sim.nombre+"\"",raiz.hijos[0].fila,raiz.hijos[0].columna));
                    }else if(simbolo.tipo=="Funcion"||simbolo.tipo=="Metodo"){
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Ya existe una función o método con el nombre \""+sim.nombre+"\"",raiz.hijos[0].fila,raiz.hijos[0].columna));
                    }
                }else{
                    tabsim.tabla.getInstancia().pushSimbolo(sim)
                }
                
            }
            break;
        
    }
}

function evaluarExpresion(raiz){
    let res1 = null;
    let res2 = null;
    let res3 = null;
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
            let simbolo = tabsim.tabla.getInstancia().getSimbolo(raiz.valor);
            if(simbolo!=null){
                res.tipo=simbolo.tipo2;
                res.valor=simbolo.valor;
                return res;
            }else{
                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No existe una variable con el identificador: \""+raiz.valor+"\"",raiz.fila,raiz.columna));
            }
            
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
        case "Cast":
            tipo = raiz.hijos[0].valor
            res1 = evaluarExpresion(raiz.hijos[1]);
            return fntiva.cast(tipo,res1,raiz.hijos[0].fila,raiz.hijos[0].columna)
        case "Incr":
            res1 = evaluarExpresion(raiz.hijos[0]);
            return fntiva.incr(raiz.hijos[0].hijos[0].valor,res1,raiz.hijos[0].fila,raiz.hijos[0].columna)
        case "Decr":
            res1 = evaluarExpresion(raiz.hijos[0]);
            return fntiva.decr(raiz.hijos[0].hijos[0].valor,res1,raiz.hijos[0].fila,raiz.hijos[0].columna)
        case "Terna":
            res1 = evaluarExpresion(raiz.hijos[0])
            res2 = evaluarExpresion(raiz.hijos[1])
            res3 = evaluarExpresion(raiz.hijos[2])
            return fntiva.terna(res1,res2,res3,raiz.hijos[0].fila,raiz.hijos[0].columna)

    }
}

class ResultadoOp{
    constructor(tipo,valor){
        this.tipo=tipo;
        this.valor=valor;
    }
}


