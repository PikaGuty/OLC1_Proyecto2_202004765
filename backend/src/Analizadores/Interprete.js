
var aritmetica = require("./OpAritmeticas")
var relacionales = require("./OpRelacionales")
var logicos = require("./OpLogicos")
var lista = require("./lista")
var fntiva = require("./FNativas")
var tabsim = require("../tabla_simbolos")
var errores = require("../Errores")

let permitir=false, brk=false,ctn=false,rtrn=false,valRtrn=null;
let codFun="";

function interpretar (raiz,ambito, lugar){

    let op;
    let res;
    let codigo=""
    let sim;
    let simbolo;
    let vector1, vector2;
    let condicion;
    if(raiz===undefined || raiz===null)return;

    switch(raiz.etiqueta){
        case "Raiz":
            raiz.hijos.forEach(hijo=> codigo+=interpretar(hijo,ambito,lugar))
            return codigo;
        case "Instrucciones":
            raiz.hijos.forEach(hijo=>{ 
                if(brk==false&&ctn==false&&rtrn==false)
                    codigo+=interpretar(hijo,ambito,lugar)

            })
            return codigo;
        case "Var":
            let t = raiz.hijos[0];
            raiz.hijos.forEach(hijo=> variable(t.valor,hijo,ambito))
            codigo = codFun;
            codFun = ""
            return codigo;
        
        case "FParametros":
            
            raiz.hijos.forEach(hijo=> interpretar(hijo,ambito,lugar))
            return codigo;
        
        case "Break":
            if(lugar=="CSwitch"||lugar=="SWhile"||lugar=="SDoWhile"||lugar=="SFor"){
                brk=true;
            }else{
                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No se puede colocar un break en esta parte",raiz.fila,raiz.columna));
            }
            return ""
        case "SReturn":
            if(lugar=="Funcion"){
                res=evaluarExpresion(raiz.hijos[0],ambito);
                rtrn=true;
                valRtrn=res;
            }else{
                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No se puede colocar un return en esta parte",raiz.hijos[0].fila,raiz.hijos[0].columna));
            }
            return ""
        case "Continue":
            if(lugar=="SFor"||lugar=="SWhile"||lugar=="SDoWhile"){
                ctn=true;
            }else{
                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No se puede colocar un continue en esta parte",raiz.fila,raiz.columna));
            }
            return ""
        case "Asig":
            res=evaluarExpresion(raiz.hijos[1],ambito);
            simbolo = tabsim.tabla.getInstancia().getSimbolo(raiz.hijos[0].valor);
            if(simbolo!=null){
                if(res.otro!="Lista"){
                    let tipo = simbolo.tipo2;
                    if (tipo==res.tipo){
                        if(tipo=="Int"){
                            if(-2147483648 <= res.valor && res.valor <= 2147483647){
                                sim = new tabsim.simbolo(raiz.hijos[0].valor,"Asignacion",tipo,ambito,res.valor,raiz.fila,raiz.columna)
                            }else{
                                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Los valores permitidos para variables de tipo entero son entre -2147483648 y 2147483647",raiz.hijos[1].fila,raiz.hijos[1].columna));
                            }
                        }else{
                            sim = new tabsim.simbolo(raiz.hijos[0].valor,"Asignacion",tipo,ambito,res.valor,raiz.fila,raiz.columna)
                        }
                        
                    }else if(tipo=="Double"&&res.tipo=="Int"){
                        sim = new tabsim.simbolo(raiz.hijos[0].valor,"Asignacion",tipo,ambito,res.valor,raiz.fila,raiz.columna)
                    }else if(tipo=="Int"&&res.tipo=="Boolean"){
                        if(res.valor.toString().toLowerCase()=="true"){
                            sim = new tabsim.simbolo(raiz.hijos[0].valor,"Asignacion",tipo,ambito,1,raiz.fila,raiz.columna)
                        }else{
                            sim = new tabsim.simbolo(raiz.hijos[0].valor,"Asignacion",tipo,ambito,0,raiz.fila,raiz.columna)
                        }
                        
                    }else{
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Error semantico, el dato \""+res.valor+"\" no es de tipo \""+tipo+"\"",raiz.hijos[0].fila,raiz.hijos[0].columna));
                    }

                    if(sim!=null){
                        tabsim.tabla.getInstancia().modificarSimboloP(sim,ambito)
                    }
                }else{
                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible asignar un vectror",raiz.hijos[0].fila,raiz.hijos[0].columna));
                }
            }else{
                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No existe una variable con el identificador: \""+raiz.hijos[0].valor+"\"",raiz.hijos[0].fila,raiz.hijos[0].columna));
            }
            codigo = codFun;
            codFun = ""
            return codigo;
            
        case "Incr":
            simbolo = tabsim.tabla.getInstancia().getSimbolo(raiz.hijos[0].hijos[0].valor);
            if(simbolo!=null){
                let tipo = simbolo.tipo2;
                if(tipo=="Double"||tipo=="Int"){
                    sim = new tabsim.simbolo(raiz.hijos[0].hijos[0].valor,"Incremento",tipo,ambito,parseInt(simbolo.valor)+1,raiz.hijos[0].hijos[0].fila,raiz.hijos[0].hijos[0].columna)
                }else{
                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No se puede incrementar la variable: \""+raiz.hijos[0].hijos[0].valor+"\" por que no es de tipo numérico",raiz.hijos[0].hijos[0].fila,raiz.hijos[0].hijos[0].columna));
                }
                if(sim!=null){
                    tabsim.tabla.getInstancia().modificarSimboloP(sim,ambito)
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
                    sim = new tabsim.simbolo(raiz.hijos[0].hijos[0].valor,"Decremento",tipo,ambito,parseInt(simbolo.valor)-1,raiz.hijos[0].hijos[0].fila,raiz.hijos[0].hijos[0].columna)
                }else{
                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No se puede decrementar la variable: \""+raiz.hijos[0].hijos[0].valor+"\" por que no es de tipo numérico",raiz.hijos[0].hijos[0].fila,raiz.hijos[0].hijos[0].columna));
                }
                if(sim!=null){
                    tabsim.tabla.getInstancia().modificarSimboloP(sim,ambito)
                }
            }else{
                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No existe una variable con el identificador: \""+raiz.hijos[0].hijos[0].valor+"\"",raiz.hijos[0].hijos[0].fila,raiz.hijos[0].hijos[0].columna));
            }
            break;
        case "FPrint":
            res = evaluarExpresion(raiz.hijos[0],ambito);
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
            res = evaluarExpresion(raiz.hijos[0],ambito);
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
                res=evaluarExpresion(raiz.hijos[3],ambito);
                if(res.tipo=="Int"){
                    vector1 = new lista.listaVec(raiz.hijos[2].valor,parseInt(res.valor))
                    simbolo = tabsim.tabla.getInstancia().getSimbolo(raiz.hijos[1].valor);
                    sim = new tabsim.simbolo(raiz.hijos[1].valor,"AsignacionV",raiz.hijos[2].valor,ambito,vector1.reg(),raiz.fila,raiz.columna)
                    if(simbolo!=null){
                        if(simbolo.entorno==ambito){
                            if(simbolo.tipo1=="Asignacion"||simbolo.tipo1=="Declaracion"||simbolo.tipo1=="Incremento"||simbolo.tipo1=="Decremento"||simbolo.tipo1=="AsignacionV"||simbolo.tipo1=="AsignacionV2"){
                                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Ya existe una varible con el nombre \""+sim.nombre+"\"",raiz.hijos[0].fila,raiz.hijos[0].columna));
                            }else if(simbolo.tipo1=="Funcion"||simbolo.tipo1=="Metodo"){
                                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Ya existe una función o método con el nombre \""+sim.nombre+"\"",raiz.hijos[0].fila,raiz.hijos[0].columna));
                            }
                        }else{
                            tabsim.tabla.getInstancia().pushSimbolo(sim)
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
                    res=evaluarExpresion(raiz.hijos[2].hijos[i],ambito);

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
                        vector1.insertar(res.valor,res1.valor,raiz.hijos[2].fila,raiz.hijos[2].columna)
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
                sim = new tabsim.simbolo(raiz.hijos[1].valor,"AsignacionV",raiz.hijos[0].valor,ambito,vector1.reg(),raiz.fila,raiz.columna)
                if(simbolo!=null){
                    if(simbolo.entorno==ambito){
                        if(simbolo.tipo1=="Asignacion"||simbolo.tipo1=="Declaracion"||simbolo.tipo1=="Incremento"||simbolo.tipo1=="Decremento"||simbolo.tipo1=="AsignacionV"||simbolo.tipo1=="AsignacionV2"){
                            errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Ya existe una varible con el nombre \""+sim.nombre+"\"",raiz.hijos[1].fila,raiz.hijos[1].columna));
                        }else if(simbolo.tipo1=="Funcion"||simbolo.tipo1=="Metodo"){
                            errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Ya existe una función o método con el nombre \""+sim.nombre+"\"",raiz.hijos[1].fila,raiz.hijos[1].columna));
                        }
                    }else{
                        if(permitido)
                            tabsim.tabla.getInstancia().pushSimbolo(sim)
                    }
                }else{
                    if(permitido)
                        tabsim.tabla.getInstancia().pushSimbolo(sim)
                }
            }else if(raiz.hijos[2].valor=="FToCharArray"){
                tipo = raiz.hijos[0].valor;
                if(tipo =="Char"){
                    res2 = evaluarExpresion(raiz.hijos[2].hijos[0],ambito)
                    res1=fntiva.tCharA(res2,raiz.hijos[2].hijos[0].fila,raiz.hijos[2].hijos[0].columna)
                    
                    let les= res1.valor.split("")
                    
                    vector1 = new lista.listaVec(tipo,les.length)
                    
                    simbolo = tabsim.tabla.getInstancia().getSimbolo(raiz.hijos[1].valor);
                    sim = new tabsim.simbolo(raiz.hijos[1].valor,"AsignacionV",raiz.hijos[0].valor,ambito,res1.valor,raiz.fila,raiz.columna)
                    if(simbolo!=null){
                        if(simbolo.entorno==ambito){
                            if(simbolo.tipo1=="Asignacion"||simbolo.tipo1=="Declaracion"||simbolo.tipo1=="Incremento"||simbolo.tipo1=="Decremento"||simbolo.tipo1=="AsignacionV"||simbolo.tipo1=="AsignacionV2"){
                                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Ya existe una varible con el nombre \""+sim.nombre+"\"",raiz.hijos[1].fila,raiz.hijos[1].columna));
                            }else if(simbolo.tipo1=="Funcion"||simbolo.tipo1=="Metodo"){
                                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Ya existe una función o método con el nombre \""+sim.nombre+"\"",raiz.hijos[1].fila,raiz.hijos[1].columna));
                            }
                        }else{
                            tabsim.tabla.getInstancia().pushSimbolo(sim)
                        }
                    }else{
                        tabsim.tabla.getInstancia().pushSimbolo(sim)
                    }
                }else{
                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Para utilizar \"toCharArray\" la variable debe ser de tipo \"Char\"",raiz.hijos[2].fila,raiz.hijos[2].columna));
                }
                
            }else{
                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Esta no es una forma correcta de declarar vectores de una dimensión",raiz.hijos[2].fila,raiz.hijos[2].columna));
            }
            break;
        case "DecVec2":
            vector1=null;
            if(raiz.hijos[0].valor==raiz.hijos[2].valor){
                res1=evaluarExpresion(raiz.hijos[3],ambito);
                res2=evaluarExpresion(raiz.hijos[3],ambito);
                if(res1.tipo=="Int"||res2.tipo=="Int"){
                    vector1 = new lista.listaVec2(raiz.hijos[2].valor,parseInt(res1.valor),parseInt(res2.valor))
                    simbolo = tabsim.tabla.getInstancia().getSimbolo(raiz.hijos[1].valor);
                    sim = new tabsim.simbolo(raiz.hijos[1].valor,"AsignacionV2",raiz.hijos[2].valor,ambito,vector1.reg(),raiz.fila,raiz.columna)
                    if(simbolo!=null){
                        if(simbolo.entorno==ambito){
                            if(simbolo.tipo1=="Asignacion"||simbolo.tipo1=="Declaracion"||simbolo.tipo1=="Incremento"||simbolo.tipo1=="Decremento"||simbolo.tipo1=="AsignacionV"||simbolo.tipo1=="AsignacionV2"){
                                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Ya existe una varible con el nombre \""+sim.nombre+"\"",raiz.hijos[0].fila,raiz.hijos[0].columna));
                            }else if(simbolo.tipo1=="Funcion"||simbolo.tipo1=="Metodo"){
                                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Ya existe una función o método con el nombre \""+sim.nombre+"\"",raiz.hijos[0].fila,raiz.hijos[0].columna));
                            }
                        }else{
                            tabsim.tabla.getInstancia().pushSimbolo(sim)
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
                        res=evaluarExpresion(raiz.hijos[2].hijos[i].hijos[j],ambito);

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
                            vector2.insertar(res.valor,i,j,raiz.hijos[2].hijos[i].hijos[j].fila,raiz.hijos[2].hijos[i].hijos[j].columna);
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
                sim = new tabsim.simbolo(raiz.hijos[1].valor,"AsignacionV2",raiz.hijos[0].valor,ambito,vector2.reg(),raiz.fila,raiz.columna)
                if(simbolo!=null){
                    if(simbolo.entorno==ambito){
                        if(simbolo.tipo1=="Asignacion"||simbolo.tipo1=="Declaracion"||simbolo.tipo1=="Incremento"||simbolo.tipo1=="Decremento"||simbolo.tipo1=="AsignacionV"||simbolo.tipo1=="AsignacionV2"){
                            errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Ya existe una varible con el nombre \""+sim.nombre+"\"",raiz.hijos[1].fila,raiz.hijos[1].columna));
                        }else if(simbolo.tipo1=="Funcion"||simbolo.tipo1=="Metodo"){
                            errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Ya existe una función o método con el nombre \""+sim.nombre+"\"",raiz.hijos[1].fila,raiz.hijos[1].columna));
                        }
                    }else{
                        if(permitido)
                            tabsim.tabla.getInstancia().pushSimbolo(sim)
                    }
                }else{
                    if(permitido)
                        tabsim.tabla.getInstancia().pushSimbolo(sim)
                }
            }else{
                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Esta no es una forma correcta de declarar vectores de una dimensión",raiz.hijos[2].fila,raiz.hijos[2].columna));
            }
            break;
        case "modVec1":
            res = new ResultadoOp();
            
            res1=evaluarExpresion(raiz.hijos[1],ambito);
            simbolo = tabsim.tabla.getInstancia().getSimbolo(raiz.hijos[0].valor);
            //console.log("RES")
            if(simbolo!=null){
                let list = simbolo.valor.split("")
                let valores=[]
                
                for (let i = 1; i < list.length-1; i++) {
                    if(list[i]!=","){
                        valores.push(list[i])
                    }
                }
                let vector1 = new lista.listaVec(simbolo.tipo2,valores.length)
                
                for (let i = 0; i < valores.length; i++) {
                    vector1.insertar(valores[i],i,raiz.hijos[1].fila,raiz.hijos[1].columna);
                }
                res=evaluarExpresion(raiz.hijos[2],ambito);
                
                let tipo = simbolo.tipo2
                if (tipo==res.tipo){
                    if(tipo=="Int"){
                        if(-2147483648 <= res.valor && res.valor <= 2147483647){
                            vector1.insertar(res.valor,res1.valor,raiz.hijos[2].fila,raiz.hijos[2].columna)
                        }else{
                            permitido=false;
                            errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Los valores permitidos para variables de tipo entero son entre -2147483648 y 2147483647",raiz.hijos[2].fila,raiz.hijos[2].columna));
                        }
                    }else{
                        vector1.insertar(res.valor,res1.valor,raiz.hijos[2].fila,raiz.hijos[2].columna)
                    }
                    sim = new tabsim.simbolo(simbolo.nombre,"AsignacionV",tipo,ambito,vector1.reg(),raiz.fila,raiz.columna)
                    tabsim.tabla.getInstancia().modificarSimboloP(sim,ambito)
                }else if(tipo=="Double"&&res.tipo=="Int"){
                    vector1.insertar(1,res1.valor,raiz.hijos[2].fila,raiz.hijos[2].columna)
                    sim = new tabsim.simbolo(simbolo.nombre,"AsignacionV",tipo,ambito,vector1.reg(),raiz.fila,raiz.columna)
                    tabsim.tabla.getInstancia().modificarSimboloP(sim,ambito)
                }else if(tipo=="Int"&&res.tipo=="Boolean"){
                    if(res.valor.toString().toLowerCase()=="true"){
                        vector1.insertar(1,res1.valor,raiz.hijos[2].fila,raiz.hijos[2].columna)
                    }else{
                        vector1.insertar(0,res1.valor,raiz.hijos[2].fila,raiz.hijos[2].columna)
                    }
                    sim = new tabsim.simbolo(simbolo.nombre,"AsignacionV",tipo,ambito,vector1.reg(),raiz.fila,raiz.columna)
                    tabsim.tabla.getInstancia().modificarSimboloP(sim,ambito)
                }else{
                    permitido=false;
                    //console.log("ES AUQI")
                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Error semantico, el dato \""+res.valor+"\" no es de tipo \""+tipo+"\"",raiz.hijos[2].fila,raiz.hijos[2].columna));
                }
            }else{
                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No existe una variable con el identificador: \""+raiz.hijos[0].valor+"\"",raiz.hijos[0].fila,raiz.hijos[0].columna));
            }
            break;
        case "modVec2":
            res1=evaluarExpresion(raiz.hijos[1],ambito);
            res2=evaluarExpresion(raiz.hijos[2],ambito);
            res = evaluarExpresion(raiz.hijos[3],ambito);
            
            simbolo = tabsim.tabla.getInstancia().getSimbolo(raiz.hijos[0].valor);
            if(simbolo!=null){
                let list = simbolo.valor.split("")
                
                let valores=""
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
                
                let vector2 = new lista.listaVec2(simbolo.tipo2,lDef.length,lDef[0].length)
                for (let i = 0; i < lDef.length; i++) {
                    for (let j = 0; j < lDef[i].length; j++) {
                        vector2.insertar(lDef[i][j],i,j,raiz.hijos[1].fila,raiz.hijos[1].columna);
                    }
                }
                //
                let tipo = simbolo.tipo2
                if (tipo==res.tipo){
                    if(tipo=="Int"){
                        if(-2147483648 <= res.valor && res.valor <= 2147483647){
                            vector2.insertar(res.valor,res1.valor,res2.valor,raiz.hijos[2].fila,raiz.hijos[2].columna)
                        }else{
                            permitido=false;
                            errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Los valores permitidos para variables de tipo entero son entre -2147483648 y 2147483647",raiz.hijos[2].fila,raiz.hijos[2].columna));
                        }
                    }else{
                        vector2.insertar(res.valor,res1.valor,res2.valor,raiz.hijos[2].fila,raiz.hijos[2].columna)
                    }
                    sim = new tabsim.simbolo(simbolo.nombre,"AsignacionV2",tipo,ambito,vector2.reg(),raiz.fila,raiz.columna)
                    tabsim.tabla.getInstancia().modificarSimboloP(sim,ambito)
                }else if(tipo=="Double"&&res.tipo=="Int"){
                    vector2.insertar(1,res1.valor,res2.valor,raiz.hijos[2].fila,raiz.hijos[2].columna)
                    sim = new tabsim.simbolo(simbolo.nombre,"AsignacionV2",tipo,ambito,vector2.reg(),raiz.fila,raiz.columna)
                    tabsim.tabla.getInstancia().modificarSimboloP(sim,ambito)
                }else if(tipo=="Int"&&res.tipo=="Boolean"){
                    if(res.valor.toString().toLowerCase()=="true"){
                        vector2.insertar(1,res1.valor,res2.valor,raiz.hijos[2].fila,raiz.hijos[2].columna)
                    }else{
                        vector2.insertar(0,res1.valor,res2.valor,raiz.hijos[2].fila,raiz.hijos[2].columna)
                    }
                    sim = new tabsim.simbolo(simbolo.nombre,"AsignacionV2",tipo,ambito,vector2.reg(),raiz.fila,raiz.columna)
                    tabsim.tabla.getInstancia().modificarSimboloP(sim,ambito)
                }else{
                    permitido=false;
                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Error semantico, el dato \""+res.valor+"\" no es de tipo \""+tipo+"\"",raiz.hijos[2].fila,raiz.hijos[2].columna));
                }

            }else{
                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No existe una variable con el identificador: \""+raiz.hijos[0].valor+"\"",raiz.hijos[0].fila,raiz.hijos[0].columna));
                
            }
            break;
        case "CIf":
            condicion = evaluarExpresion(raiz.hijos[0],ambito);
            if (condicion.tipo=="Boolean"){
                if (condicion.valor.toLowerCase()=="true"){
                    codigo+=interpretar(raiz.hijos[1],ambito,lugar)
                    return codigo;
                }else{
                    if(raiz.hijos[2]!=null){
                        codigo+=interpretar(raiz.hijos[2].hijos[0],ambito,lugar)
                        return codigo;
                    }
                    return codigo;
                }
                //
            }else{
                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","La condición debe devolver un valor Booleano (true o false)",raiz.hijos[0].fila,raiz.hijos[0].columna));
                return null;
            }
        case "CSwitch":
            res = evaluarExpresion(raiz.hijos[0],ambito);
            
            let cases = evaluarLCase(res,raiz.hijos[1],ambito)
            if(raiz.hijos[2]!=null){
                if(!cases.salida){
                    cases.codigo+=interpretar(raiz.hijos[2].hijos[0],ambito,"CSwitch")
                }
            }
            return cases.codigo;
        case "SWhile":
            res = evaluarExpresion(raiz.hijos[0],ambito);
            if(res.tipo=="Boolean"){
                if(res.valor.toLowerCase()=="true"){
                    codigo+=interpretar(raiz.hijos[1],ambito,"SWhile")
                    if(brk){
                        brk=false;
                        return codigo;
                    }
                    if(ctn){
                        ctn=false;
                    }
                    res = evaluarExpresion(raiz.hijos[0],ambito);
                    if(res.valor.toLowerCase()=="true"){
                        codigo+=interpretar(raiz,ambito,"SWhile");
                        return codigo
                    }
                    return codigo;
                }else{
                    return codigo
                }
            }else{
                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","La condición debe devolver un valor Booleano (true o false)",raiz.hijos[0].fila,raiz.hijos[0].columna));
                return null;
            }
        case "SDoWhile":
            codigo+=interpretar(raiz.hijos[0],ambito,"SDoWhile")
            if(brk){
                brk=false;
                return codigo;
            }

            if(ctn){
                ctn=false;
                res = evaluarExpresion(raiz.hijos[1],ambito);
                if(res.tipo=="Boolean"){
                    if(res.valor.toLowerCase()=="true"){
                        codigo+=interpretar(raiz,ambito,"SDoWhile");
                        return codigo;
                    }else{
                        return codigo
                    }
                }else{
                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","La condición debe devolver un valor Booleano (true o false)",raiz.hijos[0].fila,raiz.hijos[0].columna));
                    return null;
                }
            }
            res = evaluarExpresion(raiz.hijos[1],ambito);
            if(res.tipo=="Boolean"){
                if(res.valor.toLowerCase()=="true"){
                    codigo+=interpretar(raiz,ambito,"SDoWhile");
                    return codigo;
                }else{
                    return codigo
                }
            }else{
                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","La condición debe devolver un valor Booleano (true o false)",raiz.hijos[0].fila,raiz.hijos[0].columna));
                return null;
            }
        case "SFor":
            //console.log("ANDO EN "+raiz.hijos[2].hijos[0].hijos[0].valor)
            codigo+=funFor(raiz.hijos[1],raiz.hijos[2],raiz.hijos[3],ambito,true,raiz.hijos[0],ambito,raiz.hijos[0])

            return codigo
        case "FRun":
            codigo+=interpretar(raiz.hijos[0],ambito,lugar)
            return codigo;
        case "SLlamada":
            id = raiz.hijos[0].valor;
            simbolo = tabsim.tabla.getInstancia().getSimbolo(id);
            ambito = id
            if(simbolo.tipo1=="Funcion"){
                if(simbolo.parametros.length>raiz.hijos[1].hijos.length){
                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","La funcion posee mas parametros que la llamada",raiz.hijos[0].fila,raiz.hijos[0].columna));
                }else if(simbolo.parametros.length<raiz.hijos[1].hijos.length){
                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","La llamada posee mas parametros que la función",raiz.hijos[0].fila,raiz.hijos[0].columna));
                }else{
                    bien = true;
                    for (i=0; i<simbolo.parametros.length;i++){
                        res = evaluarExpresion(raiz.hijos[1].hijos[i],ambito);
                        let Sact = tabsim.tabla.getInstancia().getSimboloP(simbolo.parametros[i],id);
                        //********** COMPARACION **********
                        //console.log(res.valor+" "+res.tipo)
                        //console.log(Sact.valor+" "+Sact.tipo2)
                        //*********************************
                        tipo = Sact.tipo2;
                        if (tipo==res.tipo){
                            
                            if(tipo=="Int"){
                                if(-2147483648 <= res.valor && res.valor <= 2147483647){
                                    sim = new tabsim.simbolo(Sact.nombre,"Asignacion",tipo,ambito,res.valor,raiz.hijos[0].fila,raiz.hijos[0].columna)
                                }else{
                                    bien = false;
                                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","os valores permitidos para variables de tipo entero son entre -2147483648 y 2147483647",raiz.hijos[1].fila,raiz.hijos[1].columna));
                                }
                            }else{
                                sim = new tabsim.simbolo(Sact.nombre,"Asignacion",tipo,ambito,res.valor,raiz.hijos[0].fila,raiz.hijos[0].columna)
                            }
                            //console.log(sim.nombre+" A "+sim.valor)
                            if(sim!=null){
                                tabsim.tabla.getInstancia().modificarSimboloP(sim,ambito)
                            }
                            
                        }else if(tipo=="Double"&&res.tipo=="Int"){
                            sim = new tabsim.simbolo(Sact.nombre,"Asignacion",tipo,ambito,res.valor,raiz.hijos[0].fila,raiz.hijos[0].columna)
                            if(sim!=null){
                                tabsim.tabla.getInstancia().modificarSimboloP(sim,ambito)
                            }
                        }else if(tipo=="Int"&&res.tipo=="Boolean"){
                            if(res.valor.toString().toLowerCase()=="true"){
                                sim = new tabsim.simbolo(Sact.nombre,"Asignacion",tipo,ambito,1,raiz.hijos[0].fila,raiz.hijos[0].columna)
                            }else{
                                sim = new tabsim.simbolo(Sact.nombre,"Asignacion",tipo,ambito,0,raiz.hijos[0].fila,raiz.hijos[0].columna)
                            }
                            if(sim!=null){
                                tabsim.tabla.getInstancia().modificarSimboloP(sim,ambito)
                            }
                        }else{
                            bien = false;
                            errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Error semantico, el dato \""+res.valor+"\" no es de tipo \""+tipo+"\"",raiz.hijos[1].fila,raiz.hijos[1].columna));
                        }
                        tabsim.tabla.getInstancia().modificarSimboloP(sim,ambito)
                    }
                    //console.log(raiz.hijos[1].valor)
                    codigo+=interpretar(simbolo.valor,id,"Funcion")
                    if(rtrn){
                        rtrn=false;
                        
                        if (valRtrn.tipo==simbolo.tipo2){
                            valRtrn=null
                            return codigo
                        }else if(simbolo.tipo2=="Double"&&valRtrn.tipo=="Int"){
                            valRtrn=null
                            return codigo
                        }else if(simbolo.tipo2=="Int"&&valRtrn.tipo=="Boolean"){
                            valRtrn=null
                            return codigo
                        }else{
                            errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","La función debe devolver un valor de tipo "+simbolo.tipo2,raiz.hijos[0].fila,raiz.hijos[0].columna));
                            return ""
                        }
                        
                    }else{
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","La función debe devolver un valor de tipo "+simbolo.tipo2,raiz.hijos[0].fila,raiz.hijos[0].columna));
                        return ""
                    }
                    //console.log(codigo)
                    
                }
            }else if(simbolo.tipo1=="Metodo"){
                
                if(simbolo.parametros.length>raiz.hijos[1].hijos.length){
                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","El método posee mas parametros que la llamada",raiz.hijos[0].fila,raiz.hijos[0].columna));
                }else if(simbolo.parametros.length<raiz.hijos[1].hijos.length){
                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","La llamada posee mas parametros que el método",raiz.hijos[0].fila,raiz.hijos[0].columna));
                }else{
                    
                    bien = true;
                    for (i=0; i<simbolo.parametros.length;i++){
                        res = evaluarExpresion(raiz.hijos[1].hijos[i],ambito);
                        let Sact = tabsim.tabla.getInstancia().getSimboloP(simbolo.parametros[i],id);
                        //********** COMPARACION **********
                        //console.log(res.valor+" "+res.tipo)
                        //console.log(Sact.valor+" "+Sact.tipo2)
                        //*********************************
                        tipo = Sact.tipo2;
                        if (tipo==res.tipo){
                            
                            if(tipo=="Int"){
                                if(-2147483648 <= res.valor && res.valor <= 2147483647){
                                    sim = new tabsim.simbolo(Sact.nombre,"Asignacion",tipo,ambito,res.valor,raiz.hijos[0].fila,raiz.hijos[0].columna)
                                }else{
                                    bien = false;
                                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Los valores permitidos para variables de tipo entero son entre -2147483648 y 2147483647",raiz.hijos[1].fila,raiz.hijos[1].columna));
                                }
                            }else{
                                sim = new tabsim.simbolo(Sact.nombre,"Asignacion",tipo,ambito,res.valor,raiz.hijos[0].fila,raiz.hijos[0].columna)
                            }
                            //console.log(sim.nombre+" A "+sim.valor)
                            if(sim!=null){
                                //console.log(sim)
                                tabsim.tabla.getInstancia().modificarSimboloP(sim,ambito)
                            }
                            
                        }else if(tipo=="Double"&&res.tipo=="Int"){
                            sim = new tabsim.simbolo(Sact.nombre,"Asignacion",tipo,ambito,res.valor,raiz.hijos[0].fila,raiz.hijos[0].columna)
                            if(sim!=null){
                                tabsim.tabla.getInstancia().modificarSimboloP(sim,ambito)
                            }
                        }else if(tipo=="Int"&&res.tipo=="Boolean"){
                            if(res.valor.toString().toLowerCase()=="true"){
                                sim = new tabsim.simbolo(Sact.nombre,"Asignacion",tipo,ambito,1,raiz.hijos[0].fila,raiz.hijos[0].columna)
                            }else{
                                sim = new tabsim.simbolo(Sact.nombre,"Asignacion",tipo,ambito,0,raiz.hijos[0].fila,raiz.hijos[0].columna)
                            }
                            if(sim!=null){
                                tabsim.tabla.getInstancia().modificarSimboloP(sim,ambito)
                            }
                        }else{
                            bien = false;
                            errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Error semantico, el dato \""+res.valor+"\" no es de tipo \""+tipo+"\"",raiz.hijos[1].fila,raiz.hijos[1].columna));
                        }
                        tabsim.tabla.getInstancia().modificarSimboloP(sim,ambito)
                    }
                    
                    //console.log(raiz.hijos[1].valor)
                    codigo+=interpretar(simbolo.valor,id,"Metodo")
                    return codigo
                    //console.log(codigo)
                }
            }
            return "";
        case "SFuncion":
            id = raiz.hijos[0].valor;
            LParametros = [];
            interpretar(raiz.hijos[1],id,"Funcion")
            sim= new tabsim.simbolo(id,"Funcion",raiz.hijos[2].valor,"General",raiz.hijos[3],id.flia,id.columna)
            for(i=0;i<raiz.hijos[1].hijos.length;i++){
                LParametros.push(raiz.hijos[1].hijos[i].hijos[1].hijos[0].valor)
            }
            sim.parametros=LParametros
            
            if(sim!=null){
                let simbolo = tabsim.tabla.getInstancia().getSimbolo(id);
                if(simbolo!=null){
                    if(simbolo.entorno=="General"){
                        if(simbolo.tipo1=="Asignacion"||simbolo.tipo1=="Declaracion"||simbolo.tipo1=="Incremento"||simbolo.tipo1=="Decremento"||simbolo.tipo1=="AsignacionV"||simbolo.tipo1=="AsignacionV2"){
                            errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Ya existe una varible con el nombre \""+sim.nombre+"\"",raiz.fila,raiz.columna));
                        }else if(simbolo.tipo1=="Funcion"||simbolo.tipo1=="Metodo"){
                            errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Ya existe una función o método con el nombre "+sim.nombre,raiz.fila,raiz.columna));
                        }
                    }else{
                        tabsim.tabla.getInstancia().pushSimbolo(sim)
                    }
                }else{
                    tabsim.tabla.getInstancia().pushSimbolo(sim)
                }
                
            }
            break;
        case "SMetodo":
            id = raiz.hijos[0].valor;
            LParametros = [];
            interpretar(raiz.hijos[1],id,"Metodo")
            sim= new tabsim.simbolo(id,"Metodo","","General",raiz.hijos[2],id.flia,id.columna)
            for(i=0;i<raiz.hijos[1].hijos.length;i++){
                LParametros.push(raiz.hijos[1].hijos[i].hijos[1].hijos[0].valor)
            }
            sim.parametros=LParametros
            
            if(sim!=null){
                let simbolo = tabsim.tabla.getInstancia().getSimbolo(id);
                if(simbolo!=null){
                    if(simbolo.entorno=="General"){
                        if(simbolo.tipo1=="Asignacion"||simbolo.tipo1=="Declaracion"||simbolo.tipo1=="Incremento"||simbolo.tipo1=="Decremento"||simbolo.tipo1=="AsignacionV"||simbolo.tipo1=="AsignacionV2"){
                            errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Ya existe una varible con el nombre \""+sim.nombre+"\"",raiz.fila,raiz.columna));
                        }else if(simbolo.tipo1=="Funcion"||simbolo.tipo1=="Metodo"){
                            errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Ya existe una función o método con el nombre "+sim.nombre,raiz.fila,raiz.columna));
                        }
                    }else{
                        tabsim.tabla.getInstancia().pushSimbolo(sim)
                    }
                }else{
                    tabsim.tabla.getInstancia().pushSimbolo(sim)
                }
                
            }
            break;

    }
    return codigo;
}

function funFor(cond,actualizacion,raiz,ambito,primero,ini){
    let codigo=""
    if(primero){
        permitir=true;
        codigo+=interpretar(ini,ambito,"SFor")
    }
    
    condicion=evaluarExpresion(cond,ambito);

    if(condicion.tipo=="Boolean"){
        if(condicion.valor.toLowerCase()=="true"){
            
            codigo+=interpretar(raiz,ambito,"SFor")
            if(brk){
                brk=false
                return codigo;
            }else if(ctn){
                ctn=false
                interpretar(actualizacion,ambito,"Normal")
                codigo+=funFor(cond,actualizacion,raiz,ambito,false,ini)
            }else{
                interpretar(actualizacion,ambito,"Normal")
                codigo+=funFor(cond,actualizacion,raiz,ambito,false,ini)
            }
            
            return codigo;
        }else{
            //interpretar(actualizacion,ambito,"Normal")
            return codigo
        }
    }else{
        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","La condición debe devolver un valor Booleano (true o false)",raiz.hijos[0].fila,raiz.hijos[0].columna));
        return "";
    }

    /*if(condicion.tipo=="Boolean"){
        if(condicion.valor.toLowerCase()=="true"){
            codigo+=funFor(cond,actualizacion,raiz,primero,ambito)
            interpretar(actualizacion)
            return codigo;
        }else{
            interpretar(actualizacion)
            return codigo
        }
    }else{
        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","La condición debe devolver un valor Booleano (true o false)",raiz.hijos[0].fila,raiz.hijos[0].columna));
        return "";
    }*/

}

function tabla (){
    console.log("\nTabla de simbolos")
    console.log(tabsim.tabla.getInstancia().getsimbolos());
    console.log("Tabla de errores\n")
    console.log(errores.ListaErrores.getInstance().getErrores())
}

function evaluarLCase(exp,raiz,ambito){
    let analiz = new analizao()
    for (let i = 0; i < raiz.hijos.length; i++) {
        res = evaluarExpresion(raiz.hijos[i].hijos[0],ambito);
        let condicion = relacionales.igualacion(exp,res,raiz.hijos[i].hijos[0].fila,raiz.hijos[i].hijos[0].columna)
        
        if(condicion.valor=="true"){
            analiz.codigo += interpretar(raiz.hijos[i].hijos[1],ambito,"CSwitch")
            if(raiz.hijos[i].hijos[2]!=null){
                analiz.salida = true;
                return analiz;
            }
        }
    }
    return analiz;
}

function variable(tipo,raiz,ambito){
    let sim;
    let valo;
    
    switch(raiz.etiqueta){
        case "Dec":
            raiz.hijos.forEach(hijo=> variable(tipo,hijo,ambito))
            break;
        case "id":
            //(nombre,tipo1,tipo2,valor,linea,columna)
            switch(tipo){
                case "Int":
                    sim= new tabsim.simbolo(raiz.valor,"Declaracion",tipo,ambito,0,raiz.fila,raiz.columna)
                    break;
                case "Double":
                    sim= new tabsim.simbolo(raiz.valor,"Declaracion",tipo,ambito,0.0,raiz.fila,raiz.columna)
                    break;
                case "Boolean":
                    sim= new tabsim.simbolo(raiz.valor,"Declaracion",tipo,ambito,true,raiz.fila,raiz.columna)
                    break;
                case "Char":
                    sim= new tabsim.simbolo(raiz.valor,"Declaracion",tipo,ambito,'0',raiz.fila,raiz.columna)
                    break;
                case "String":
                    sim= new tabsim.simbolo(raiz.valor,"Declaracion",tipo,ambito,"\"\"",raiz.fila,raiz.columna)
                    break;
            }
            if(sim!=null){
                let simbolo = tabsim.tabla.getInstancia().getSimbolo(sim.nombre);
                if(simbolo!=null){
                    if(simbolo.entorno==ambito){
                        if(simbolo.tipo1=="Asignacion"||simbolo.tipo1=="Declaracion"||simbolo.tipo1=="Incremento"||simbolo.tipo1=="Decremento"||simbolo.tipo1=="AsignacionV"||simbolo.tipo1=="AsignacionV2"){
                            errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Ya existe una varible con el nombre \""+sim.nombre+"\"",raiz.fila,raiz.columna));
                        }else if(simbolo.tipo1=="Funcion"||simbolo.tipo1=="Metodo"){
                            errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Ya existe una función o método con el nombre "+sim.nombre,raiz.fila,raiz.columna));
                        }
                    }else{
                        tabsim.tabla.getInstancia().pushSimbolo(sim)
                    }
                }else{
                    tabsim.tabla.getInstancia().pushSimbolo(sim)
                }
                
            }
            break;
        case "Asig":
            res=evaluarExpresion(raiz.hijos[1],ambito);
            
            if (tipo==res.tipo){
                if(tipo=="Int"){
                    if(-2147483648 <= res.valor && res.valor <= 2147483647){
                        sim = new tabsim.simbolo(raiz.hijos[0].valor,"Asignacion",tipo,ambito,res.valor,raiz.fila,raiz.columna)
                    }else{
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","os valores permitidos para variables de tipo entero son entre -2147483648 y 2147483647",raiz.hijos[1].fila,raiz.hijos[1].columna));
                    }
                }else{
                    sim = new tabsim.simbolo(raiz.hijos[0].valor,"Asignacion",tipo,ambito,res.valor,raiz.fila,raiz.columna)
                }
                
            }else if(tipo=="Double"&&res.tipo=="Int"){
                sim = new tabsim.simbolo(raiz.hijos[0].valor,"Asignacion",tipo,ambito,res.valor,raiz.fila,raiz.columna)
            }else if(tipo=="Int"&&res.tipo=="Boolean"){
                if(res.valor.toString().toLowerCase()=="true"){
                    sim = new tabsim.simbolo(raiz.hijos[0].valor,"Asignacion",tipo,ambito,1,raiz.fila,raiz.columna)
                }else{
                    sim = new tabsim.simbolo(raiz.hijos[0].valor,"Asignacion",tipo,ambito,0,raiz.fila,raiz.columna)
                }
                
            }else{
                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Error semantico, el dato \""+res.valor+"\" no es de tipo \""+tipo+"\"",raiz.hijos[1].fila,raiz.hijos[1].columna));
            }
            if(sim!=null){
                if(res.otro!="Lista"){
                    let simbolo = tabsim.tabla.getInstancia().getSimbolo(sim.nombre);
                    if(simbolo!=null){
                        if(simbolo.entorno==ambito){
                            if(!permitir){
                                if(simbolo.tipo1=="Asignacion"||simbolo.tipo1=="Declaracion"||simbolo.tipo1=="Incremento"||simbolo.tipo1=="Decremento"||simbolo.tipo1=="AsignacionV"||simbolo.tipo1=="AsignacionV2"){
                                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Ya existe una varible con el nombre \""+sim.nombre+"\"",raiz.hijos[0].fila,raiz.hijos[0].columna));
                                }else if(simbolo.tipo1=="Funcion"||simbolo.tipo1=="Metodo"){
                                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Ya existe una función o método con el nombre \""+sim.nombre+"\"",raiz.hijos[0].fila,raiz.hijos[0].columna));
                                }
                            }else{
                                tabsim.tabla.getInstancia().modificarSimboloP(sim,ambito)
                            }
                            
                        }else{
                            tabsim.tabla.getInstancia().pushSimbolo(sim)
                        }
                    }else{
                        tabsim.tabla.getInstancia().pushSimbolo(sim)
                    }
                }else{
                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No es posible asignar un vector",raiz.hijos[0].fila,raiz.hijos[0].columna));
                }
            }
            break;
    }
}

function evaluarExpresion(raiz,ambi){
    let res1 = null;
    let res2 = null;
    let res3 = null;
    let res = null;
    let simbolo=null;
    switch (raiz.etiqueta) {
        case "Expresion":
            if (raiz.hijos.length==3) {
                res1 = evaluarExpresion(raiz.hijos[0],ambi);
                res2 = evaluarExpresion(raiz.hijos[2],ambi);

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
                res1 = evaluarExpresion(raiz.hijos[1],ambi);

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
                return evaluarExpresion(raiz.hijos[0],ambi);
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
        case "acsVec1":
            res = new ResultadoOp();
            res1=evaluarExpresion(raiz.hijos[1],ambi);
            simbolo = tabsim.tabla.getInstancia().getSimbolo(raiz.hijos[0].valor);
            if(simbolo!=null){
                let list = simbolo.valor.split("")
                
                valors=""
                for (let i = 1; i < list.length-1; i++) {
                    valors+=list[i]
                }
                let valores=valors.split(",")

                let vector1 = new lista.listaVec(simbolo.tipo2,valores.length)
                //console.log(valors)
                for (let i = 0; i < valores.length; i++) {
                    vector1.insertar(valores[i],i,raiz.hijos[1].fila,raiz.hijos[1].columna);
                }
                let va = vector1.obtener(res1.valor)
                if(va!=null){
                    res.tipo=va.tipo;
                    res.otro="Vec1";
                    if(va.tipo=="Double"){
                        res.valor=parseFloat(va.dato);
                    }else if(va.tipo=="Int"){
                        res.valor=parseInt(va.dato);
                    }else{
                        res.valor=va.dato;
                    }
                }
                return res;
            }else{
                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No existe una variable con el identificador: \""+raiz.hijos[0].valor+"\"",raiz.hijos[0].fila,raiz.hijos[0].columna));
                res.tipo="Error";
                res.valor="Error";
                return res;
            }
        case "acsVec2":
            res = new ResultadoOp();
            
            res1=evaluarExpresion(raiz.hijos[1],ambi);
            res2=evaluarExpresion(raiz.hijos[2],ambi);
            simbolo = tabsim.tabla.getInstancia().getSimbolo(raiz.hijos[0].valor);
            if(simbolo!=null){
                let list = simbolo.valor.split("")
                
                let valores=""
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
                
                let vector2 = new lista.listaVec2(simbolo.tipo2,lDef.length,lDef[0].length)
                for (let i = 0; i < lDef.length; i++) {
                    for (let j = 0; j < lDef[i].length; j++) {
                        vector2.insertar(lDef[i][j],i,j,raiz.hijos[1].fila,raiz.hijos[1].columna);
                    }
                }

                let va = vector2.obtener(res1.valor,res2.valor)
                if(va!=null){
                    res.tipo=va.tipo;
                    res.otro="Vec2";
                    if(va.tipo=="Double"){
                        res.valor=parseFloat(va.dato);
                    }else if(va.tipo=="Int"){
                        res.valor=parseInt(va.dato);
                    }else{
                        res.valor=va.dato;
                    }
                }
                return res;
            }else{
                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No existe una variable con el identificador: \""+raiz.hijos[0].valor+"\"",raiz.hijos[0].fila,raiz.hijos[0].columna));
                res.tipo="Error";
                res.valor="Error";
                return res;
            }
            case "SLlamada":
                res = new ResultadoOp()

                id = raiz.hijos[0].valor;
                simbolo = tabsim.tabla.getInstancia().getSimbolo(id);
                ambito=id
                if(simbolo.tipo1=="Funcion"){
                    if(simbolo.parametros.length>raiz.hijos[1].hijos.length){
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","La funcion posee mas parametros que la llamada",raiz.hijos[0].fila,raiz.hijos[0].columna));
                    }else if(simbolo.parametros.length<raiz.hijos[1].hijos.length){
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","La llamada posee mas parametros que la función",raiz.hijos[0].fila,raiz.hijos[0].columna));
                    }else{
                        bien = true;
                        codigo=""
                        for (i=0; i<simbolo.parametros.length;i++){
                            res = evaluarExpresion(raiz.hijos[1].hijos[i],ambi);
                            let Sact = tabsim.tabla.getInstancia().getSimboloP(simbolo.parametros[i],id);
                            //********** COMPARACION **********
                            //console.log(res.valor+" "+res.tipo)
                            //console.log(Sact.valor+" "+Sact.tipo2)
                            //*********************************
                            tipo = Sact.tipo2;
                            if (tipo==res.tipo){
                                
                                if(tipo=="Int"){
                                    if(-2147483648 <= res.valor && res.valor <= 2147483647){
                                        sim = new tabsim.simbolo(Sact.nombre,"Asignacion",tipo,ambito,res.valor,raiz.hijos[0].fila,raiz.hijos[0].columna)
                                    }else{
                                        bien = false;
                                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","os valores permitidos para variables de tipo entero son entre -2147483648 y 2147483647",raiz.hijos[1].fila,raiz.hijos[1].columna));
                                    }
                                }else{
                                    sim = new tabsim.simbolo(Sact.nombre,"Asignacion",tipo,ambito,res.valor,raiz.hijos[0].fila,raiz.hijos[0].columna)
                                }
                                //console.log(sim.nombre+" A "+sim.valor)
                                if(sim!=null){
                                    tabsim.tabla.getInstancia().modificarSimboloP(sim,ambito)
                                }
                                
                            }else if(tipo=="Double"&&res.tipo=="Int"){
                                sim = new tabsim.simbolo(Sact.nombre,"Asignacion",tipo,ambito,res.valor,raiz.hijos[0].fila,raiz.hijos[0].columna)
                                if(sim!=null){
                                    tabsim.tabla.getInstancia().modificarSimboloP(sim,ambito)
                                }
                            }else if(tipo=="Int"&&res.tipo=="Boolean"){
                                if(res.valor.toString().toLowerCase()=="true"){
                                    sim = new tabsim.simbolo(Sact.nombre,"Asignacion",tipo,ambito,1,raiz.hijos[0].fila,raiz.hijos[0].columna)
                                }else{
                                    sim = new tabsim.simbolo(Sact.nombre,"Asignacion",tipo,ambito,0,raiz.hijos[0].fila,raiz.hijos[0].columna)
                                }
                                if(sim!=null){
                                    tabsim.tabla.getInstancia().modificarSimboloP(sim,ambito)
                                }
                            }else{
                                bien = false;
                                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Error semantico, el dato \""+res.valor+"\" no es de tipo \""+tipo+"\"",raiz.hijos[0].fila,raiz.hijos[0].columna));
                            }
                            tabsim.tabla.getInstancia().modificarSimboloP(sim,ambito)
                        }
                        //console.log(raiz.hijos[1].valor)
                        codigo+=interpretar(simbolo.valor,id,"Funcion")
                        if(rtrn){
                            rtrn=false;
                            
                            if (valRtrn.tipo==simbolo.tipo2){
                                codFun+=codigo;
                                res.tipo=valRtrn.tipo
                                res.valor=valRtrn.valor
                                valRtrn=null
                                return res                         
                            }else if(simbolo.tipo2=="Double"&&valRtrn.tipo=="Int"){
                                codFun+=codigo;
                                res.tipo=valRtrn.tipo
                                res.valor=valRtrn.valor
                                valRtrn=null
                                return res
                            }else if(simbolo.tipo2=="Int"&&valRtrn.tipo=="Boolean"){
                                codFun+=codigo;
                                res.tipo=valRtrn.tipo
                                res.valor=valRtrn.valor
                                valRtrn=null
                                return res
                            }else{
                                bien = false;
                                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Error semantico, el dato \""+res.valor+"\" no es de tipo \""+tipo+"\"",raiz.hijos[0].fila,raiz.hijos[0].columna));
                            }
                            
                        }else{
                            errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","La función debe devolver un valor de tipo "+simbolo.tipo2,raiz.hijos[0].fila,raiz.hijos[0].columna));
                            res.tipo="error"
                            res.valor="error"
                            return res
                        }
                    }
                }else if(simbolo.tipo1=="Metodo"){
                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Un método no devuelve ningun valor ",raiz.hijos[0].fila,raiz.hijos[0].columna));
                    res.tipo="error"
                    res.valor="error"
                    return res
                }
                res.tipo="error"
                res.valor="error"
                return res
        case "id":
            res = new ResultadoOp();
            simbolo = tabsim.tabla.getInstancia().getSimbolo(raiz.valor);
            if(simbolo!=null){
                res.tipo=simbolo.tipo2;
                res.valor=simbolo.valor;
                res.otro=simbolo.tipo1;
                return res;
            }else{
                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No existe una variable con el identificador: \""+raiz.valor+"\"",raiz.fila,raiz.columna));
                res.tipo="Error";
                res.valor="Error";
                return res;
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
            res1 = evaluarExpresion(raiz.hijos[0],ambi);
            return fntiva.tLower(res1,raiz.hijos[0].fila,raiz.hijos[0].columna)
        case "FToUpper":
            res1 = evaluarExpresion(raiz.hijos[0],ambi);
            return fntiva.tUpper(res1,raiz.hijos[0].fila,raiz.hijos[0].columna)
        case "FRound":
            res1 = evaluarExpresion(raiz.hijos[0],ambi);
            return fntiva.round(res1,raiz.hijos[0].fila,raiz.hijos[0].columna)
        case "FLength":
            res1 = evaluarExpresion(raiz.hijos[0],ambi);
            return fntiva.Flength(res1,raiz.hijos[0].fila,raiz.hijos[0].columna)
        case "FTypeOf":
            res1 = evaluarExpresion(raiz.hijos[0],ambi);
            return fntiva.typof(res1,raiz.hijos[0].fila,raiz.hijos[0].columna)
        case "FToString":
            res1 = evaluarExpresion(raiz.hijos[0],ambi);
            return fntiva.tstring(res1,raiz.hijos[0].fila,raiz.hijos[0].columna)
        case "FToCharArray":
            res1 = evaluarExpresion(raiz.hijos[0],ambi);
            return fntiva.tCharA(res1,raiz.hijos[0].fila,raiz.hijos[0].columna)
        case "Cast":
            tipo = raiz.hijos[0].valor
            res1 = evaluarExpresion(raiz.hijos[1],ambi);
            return fntiva.cast(tipo,res1,raiz.hijos[0].fila,raiz.hijos[0].columna)
        case "Incr":
            res1 = evaluarExpresion(raiz.hijos[0],ambi);
            return fntiva.incr(raiz.hijos[0].hijos[0].valor,res1,raiz.hijos[0].fila,raiz.hijos[0].columna,ambi)
        case "Decr":
            res1 = evaluarExpresion(raiz.hijos[0],ambi);
            return fntiva.decr(raiz.hijos[0].hijos[0].valor,res1,raiz.hijos[0].fila,raiz.hijos[0].columna,ambi)
        case "Terna":
            res1 = evaluarExpresion(raiz.hijos[0],ambi)
            res2 = evaluarExpresion(raiz.hijos[1],ambi)
            res3 = evaluarExpresion(raiz.hijos[2],ambi)
            return fntiva.terna(res1,res2,res3,raiz.hijos[0].fila,raiz.hijos[0].columna)
    }
}

class ResultadoOp{
    constructor(tipo,valor,otro){
        this.tipo=tipo;
        this.valor=valor;
        this.otro=otro;
    }
}

class analizao{
    constructor(){
        this.codigo="";
        this.salida=false;
    }
}

module.exports={interpretar,tabla}
