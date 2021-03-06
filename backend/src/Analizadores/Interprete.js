
var aritmetica = require("./OpAritmeticas")
var relacionales = require("./OpRelacionales")
var logicos = require("./OpLogicos")
var lista = require("./lista")
var fntiva = require("./FNativas")
var tabsim = require("../tabla_simbolos")
var errores = require("../Errores")

let permitir=false, brk=false,ctn=false,rtrn=false,valRtrn=null;
let codFun="";
let unicoRun=true;
let habilitarLlamada=false;

function interpretar (raiz,ambito, lugar, pasada){
    //console.log(pasada+"YYYYYYYYYYY "+lugar+" "+raiz.valor)
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
            raiz.hijos.forEach(hijo=> codigo+=interpretar(hijo,ambito,lugar,pasada))
            //console.log("AAAAA "+codigo)
            return codigo;
        case "Instrucciones":
            raiz.hijos.forEach(hijo=>{ 
                if(brk==false&&ctn==false&&rtrn==false)
                    codigo+=interpretar(hijo,ambito,lugar,pasada)

            })
            return codigo;
        case "Var":
            //console.log(ambito+" "+lugar+" "+" "+raiz.hijos[1].valor+" "+raiz.hijos[1].hijos[0].valor+" ")
            if(pasada){
                let t = raiz.hijos[0];
                //console.log(ambito+" "+lugar+" "+t.valor+" "+raiz.hijos[1].valor+" "+raiz.hijos[1].hijos[0].valor+" ")
                raiz.hijos.forEach(hijo=> variable(t.valor,hijo,ambito,lugar))
                codigo = codFun;
                codFun = ""
                return codigo;
            }else if(!pasada&&ambito!="General"){
                let t = raiz.hijos[0];
                //console.log(ambito+" "+lugar+" "+t.valor+" "+raiz.hijos[1].valor+" "+raiz.hijos[1].hijos[0].valor+" ")
                raiz.hijos.forEach(hijo=> variable(t.valor,hijo,ambito,lugar))
                codigo = codFun;
                codFun = ""
                return codigo;
            }
            break;
        case "FParametros":
            raiz.hijos.forEach(hijo=> interpretar(hijo,ambito,lugar,pasada))
            return codigo;
        case "Break":
            if(!pasada){
                if(lugar=="CSwitch"||lugar=="SWhile"||lugar=="SDoWhile"||lugar=="SFor"){
                    brk=true;
                }else{
                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No se puede colocar un break en esta parte",raiz.fila,raiz.columna));
                }
                return ""
            }
            break;
        case "SReturn":
            if(!pasada){
                if(lugar=="Funcion"){
                    res=evaluarExpresion(raiz.hijos[0],ambito);
                    rtrn=true;
                    valRtrn=res;
                }else{
                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No se puede colocar un return en esta parte",raiz.hijos[0].fila,raiz.hijos[0].columna));
                }
                return ""
            }
            break;
        case "Continue":
            if(!pasada){
                if(lugar=="SFor"||lugar=="SWhile"||lugar=="SDoWhile"){
                    ctn=true;
                }else{
                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No se puede colocar un continue en esta parte",raiz.fila,raiz.columna));
                }
                return ""
            }
            break
        case "Asig":
            if(!pasada){
                if(ambito!="General"){
                    res=evaluarExpresion(raiz.hijos[1],ambito);
                    //console.log("AQUI LLAMO A BUSCAR")
                    simbolo = tabsim.tabla.getInstancia().getSimboloP(raiz.hijos[0].valor,ambito);
                    //console.log("AAAAAA "+simbolo)
                    if(simbolo!=null){

                        if(res.otro!="Lista"){
                            let tipo = simbolo.tipo2;
                            if (tipo==res.tipo){
                                if(tipo=="Int"){
                                    if(-2147483648 <= res.valor && res.valor <= 2147483647){
                                        sim = new tabsim.simbolo(raiz.hijos[0].valor,"Asignacion",tipo,ambito,res.valor,raiz.hijos[0].fila,raiz.hijos[0].columna)

                                    }else{
                                        //console.log("ESTABA INTENTANDO METER "+res.valor)
                                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Los valores permitidos para variables de tipo entero son entre -2147483648 y 2147483647",raiz.hijos[1].fila,raiz.hijos[1].columna));
                                    }
                                }else{
                                    sim = new tabsim.simbolo(raiz.hijos[0].valor,"Asignacion",tipo,ambito,res.valor,raiz.hijos[0].fila,raiz.hijos[0].columna)
                                }
                                
                            }else if(tipo=="Double"&&res.tipo=="Int"){
                                sim = new tabsim.simbolo(raiz.hijos[0].valor,"Asignacion",tipo,ambito,res.valor,raiz.hijos[0].fila,raiz.hijos[0].columna)
                            }else if(tipo=="Int"&&res.tipo=="Boolean"){
                                if(res.valor.toString().toLowerCase()=="true"){
                                    sim = new tabsim.simbolo(raiz.hijos[0].valor,"Asignacion",tipo,ambito,1,raiz.hijos[0].fila,raiz.hijos[0].columna)
                                }else{
                                    sim = new tabsim.simbolo(raiz.hijos[0].valor,"Asignacion",tipo,ambito,0,raiz.hijos[0].fila,raiz.hijos[0].columna)
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
                }else{
                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No se puede realizar una asignaci??n en el ambito global",raiz.fila,raiz.columna));
                }
            }
            break;
        case "Incr":
            if(!pasada){
                if(ambito!="General"){
                    simbolo = tabsim.tabla.getInstancia().getSimboloP(raiz.hijos[0].hijos[0].valor,ambito);
                    if(simbolo!=null){
                        let tipo = simbolo.tipo2;
                        if(tipo=="Double"||tipo=="Int"){
                            sim = new tabsim.simbolo(raiz.hijos[0].hijos[0].valor,"Incremento",tipo,ambito,parseInt(simbolo.valor)+1,raiz.hijos[0].hijos[0].fila,raiz.hijos[0].hijos[0].columna)
                        }else{
                            errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No se puede incrementar la variable: \""+raiz.hijos[0].hijos[0].valor+"\" por que no es de tipo num??rico",raiz.hijos[0].hijos[0].fila,raiz.hijos[0].hijos[0].columna));
                        }
                        if(sim!=null){
                            tabsim.tabla.getInstancia().modificarSimboloP(sim,ambito)
                        }
                    }else{
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No existe una variable con el identificador: \""+raiz.hijos[0].hijos[0].valor+"\"",raiz.hijos[0].hijos[0].fila,raiz.hijos[0].hijos[0].columna));
                    }
                }else{
                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No se puede realizar un incremento en el ambito global",raiz.fila,raiz.columna));
                }
            }
            break;
        case "Decr":
            if(!pasada){
                if(ambito!="General"){
                    simbolo = tabsim.tabla.getInstancia().getSimboloP(raiz.hijos[0].hijos[0].valor,ambito);
                    if(simbolo!=null){
                        let tipo = simbolo.tipo2;
                        if(tipo=="Double"||tipo=="Int"){
                            sim = new tabsim.simbolo(raiz.hijos[0].hijos[0].valor,"Decremento",tipo,ambito,parseInt(simbolo.valor)-1,raiz.hijos[0].hijos[0].fila,raiz.hijos[0].hijos[0].columna)
                        }else{
                            errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No se puede decrementar la variable: \""+raiz.hijos[0].hijos[0].valor+"\" por que no es de tipo num??rico",raiz.hijos[0].hijos[0].fila,raiz.hijos[0].hijos[0].columna));
                        }
                        if(sim!=null){
                            tabsim.tabla.getInstancia().modificarSimboloP(sim,ambito)
                        }
                    }else{
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No existe una variable con el identificador: \""+raiz.hijos[0].hijos[0].valor+"\"",raiz.hijos[0].hijos[0].fila,raiz.hijos[0].hijos[0].columna));
                    }
                }else{
                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No se puede realizar un decremento en el ambito global",raiz.hijos[0].hijos[0].fila,raiz.hijos[0].hijos[0].columna));
                }
            }
            break;
        case "FPrint":
            if(!pasada){
                if(ambito!="General"){
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
                }else{
                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No se puede utilizar la funcion \"Print\" en el ambito global",raiz.fila,raiz.columna));
                }
            }
            break;
        case "FPrintln":
            if(!pasada){
                if(ambito!="General"){
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
                }else{
                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No se puede utilizar la funci??n \"Println\" en el ambito global",raiz.fila,raiz.columna));
                }
            } 
            break;
        case "DecVec1":
            if((!pasada&&ambito!="General")||(pasada&&ambito=="General")){
                vector1=null;
                if(raiz.hijos[0].valor==raiz.hijos[2].valor){
                    res=evaluarExpresion(raiz.hijos[3],ambito);
                    if(res.tipo=="Int"){
                        vector1 = new lista.listaVec(raiz.hijos[2].valor,parseInt(res.valor))
                        simbolo = tabsim.tabla.getInstancia().getSimboloP(raiz.hijos[1].valor,ambito);
                        sim = new tabsim.simbolo(raiz.hijos[1].valor,"AsignacionV",raiz.hijos[2].valor,ambito,vector1.reg(),raiz.hijos[2].fila,raiz.hijos[2].columna)
                        if(simbolo!=null){
                            if(simbolo.entorno==ambito){
                                if(simbolo.tipo1=="Asignacion"||simbolo.tipo1=="Declaracion"||simbolo.tipo1=="Incremento"||simbolo.tipo1=="Decremento"||simbolo.tipo1=="AsignacionV"||simbolo.tipo1=="AsignacionV2"){
                                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Ya existe una varible con el nombre \""+sim.nombre+"\"",raiz.hijos[0].fila,raiz.hijos[0].columna));
                                }else if(simbolo.tipo1=="Funcion"||simbolo.tipo1=="Metodo"){
                                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Ya existe una funci??n o m??todo con el nombre \""+sim.nombre+"\"",raiz.hijos[0].fila,raiz.hijos[0].columna));
                                }
                            }else{
                                tabsim.tabla.getInstancia().pushSimbolo(sim)
                            }
                        }else{
                            tabsim.tabla.getInstancia().pushSimbolo(sim)
                        }
                    }else{
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","La dimensi??n del vector debe ser de tipo Entera",raiz.hijos[3].fila,raiz.hijos[3].columna));
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
                    simbolo = tabsim.tabla.getInstancia().getSimboloP(raiz.hijos[1].valor,ambito);
                    sim = new tabsim.simbolo(raiz.hijos[1].valor,"AsignacionV",raiz.hijos[0].valor,ambito,vector1.reg(),raiz.hijos[0].fila,raiz.hijos[0].columna)
                    if(simbolo!=null){
                        if(simbolo.entorno==ambito){
                            if(simbolo.tipo1=="Asignacion"||simbolo.tipo1=="Declaracion"||simbolo.tipo1=="Incremento"||simbolo.tipo1=="Decremento"||simbolo.tipo1=="AsignacionV"||simbolo.tipo1=="AsignacionV2"){
                                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Ya existe una varible con el nombre \""+sim.nombre+"\"",raiz.hijos[1].fila,raiz.hijos[1].columna));
                            }else if(simbolo.tipo1=="Funcion"||simbolo.tipo1=="Metodo"){
                                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Ya existe una funci??n o m??todo con el nombre \""+sim.nombre+"\"",raiz.hijos[1].fila,raiz.hijos[1].columna));
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
                        
                        simbolo = tabsim.tabla.getInstancia().getSimboloP(raiz.hijos[1].valor,ambito);
                        sim = new tabsim.simbolo(raiz.hijos[1].valor,"AsignacionV",raiz.hijos[0].valor,ambito,res1.valor,raiz.hijos[0].fila,raiz.hijos[0].columna)
                        if(simbolo!=null){
                            if(simbolo.entorno==ambito){
                                if(simbolo.tipo1=="Asignacion"||simbolo.tipo1=="Declaracion"||simbolo.tipo1=="Incremento"||simbolo.tipo1=="Decremento"||simbolo.tipo1=="AsignacionV"||simbolo.tipo1=="AsignacionV2"){
                                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Ya existe una varible con el nombre \""+sim.nombre+"\"",raiz.hijos[1].fila,raiz.hijos[1].columna));
                                }else if(simbolo.tipo1=="Funcion"||simbolo.tipo1=="Metodo"){
                                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Ya existe una funci??n o m??todo con el nombre \""+sim.nombre+"\"",raiz.hijos[1].fila,raiz.hijos[1].columna));
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
                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Esta no es una forma correcta de declarar vectores de una dimensi??n",raiz.hijos[2].fila,raiz.hijos[2].columna));
                }
            }
            break;
        case "DecVec2":
            if((!pasada&&ambito!="General")||(pasada&&ambito=="General")){
                vector1=null;
                if(raiz.hijos[0].valor==raiz.hijos[2].valor){
                    res1=evaluarExpresion(raiz.hijos[3],ambito);
                    res2=evaluarExpresion(raiz.hijos[3],ambito);
                    if(res1.tipo=="Int"||res2.tipo=="Int"){
                        vector1 = new lista.listaVec2(raiz.hijos[2].valor,parseInt(res1.valor),parseInt(res2.valor))
                        simbolo = tabsim.tabla.getInstancia().getSimboloP(raiz.hijos[1].valor,ambito);
                        sim = new tabsim.simbolo(raiz.hijos[1].valor,"AsignacionV2",raiz.hijos[2].valor,ambito,vector1.reg(),raiz.hijos[2].fila,raiz.hijos[2].columna)
                        if(simbolo!=null){
                            if(simbolo.entorno==ambito){
                                if(simbolo.tipo1=="Asignacion"||simbolo.tipo1=="Declaracion"||simbolo.tipo1=="Incremento"||simbolo.tipo1=="Decremento"||simbolo.tipo1=="AsignacionV"||simbolo.tipo1=="AsignacionV2"){
                                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Ya existe una varible con el nombre \""+sim.nombre+"\"",raiz.hijos[0].fila,raiz.hijos[0].columna));
                                }else if(simbolo.tipo1=="Funcion"||simbolo.tipo1=="Metodo"){
                                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Ya existe una funci??n o m??todo con el nombre \""+sim.nombre+"\"",raiz.hijos[0].fila,raiz.hijos[0].columna));
                                }
                            }else{
                                tabsim.tabla.getInstancia().pushSimbolo(sim)
                            }
                        }else{
                            tabsim.tabla.getInstancia().pushSimbolo(sim)
                        }
                    }else{
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","La dimensi??n del vector debe ser de tipo Entera",raiz.hijos[3].fila,raiz.hijos[3].columna));
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
                    simbolo = tabsim.tabla.getInstancia().getSimboloP(raiz.hijos[1].valor,ambito);
                    sim = new tabsim.simbolo(raiz.hijos[1].valor,"AsignacionV2",raiz.hijos[0].valor,ambito,vector2.reg(),raiz.hijos[0].fila,raiz.hijos[0].columna)
                    if(simbolo!=null){
                        if(simbolo.entorno==ambito){
                            if(simbolo.tipo1=="Asignacion"||simbolo.tipo1=="Declaracion"||simbolo.tipo1=="Incremento"||simbolo.tipo1=="Decremento"||simbolo.tipo1=="AsignacionV"||simbolo.tipo1=="AsignacionV2"){
                                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Ya existe una varible con el nombre \""+sim.nombre+"\"",raiz.hijos[1].fila,raiz.hijos[1].columna));
                            }else if(simbolo.tipo1=="Funcion"||simbolo.tipo1=="Metodo"){
                                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Ya existe una funci??n o m??todo con el nombre \""+sim.nombre+"\"",raiz.hijos[1].fila,raiz.hijos[1].columna));
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
                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Esta no es una forma correcta de declarar vectores de una dimensi??n",raiz.hijos[2].fila,raiz.hijos[2].columna));
                }
            }
            break;
        case "modVec1":
            if((!pasada&&ambito!="General")||(pasada&&ambito=="General")){
                
                    res1=evaluarExpresion(raiz.hijos[1],ambito);
                    res=evaluarExpresion(raiz.hijos[2],ambito);
                    
                    simbolo = tabsim.tabla.getInstancia().getSimboloP(raiz.hijos[0].valor,ambito);
                    //console.log("RES")
                    //console.log(raiz.hijos[0].valor)
                    if(simbolo!=null){
                        let list = simbolo.valor.split("")
                        let valores=""
                        
                        for (let i = 1; i < list.length-1; i++) {
                            valores+=(list[i])
                        }
                        //console.log(valores)
                        list = valores.split(",")
                        
                        valores=list
                        
                        //console.log(valores)
                        //console.log("AAAAAAAAAAA "+valores.length)
                        let vector1 = new lista.listaVec(simbolo.tipo2,valores.length)
                        for (let i = 0; i < valores.length; i++) {
                            vector1.insertar(valores[i],i,raiz.hijos[1].fila,raiz.hijos[1].columna);
                        }
                        
                        
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
                            sim = new tabsim.simbolo(simbolo.nombre,"AsignacionV",tipo,ambito,vector1.reg(),raiz.hijos[1].fila,raiz.hijos[1].columna)
                            tabsim.tabla.getInstancia().modificarSimboloP(sim,ambito)
                        }else if(tipo=="Double"&&res.tipo=="Int"){
                            vector1.insertar(1,res1.valor,raiz.hijos[2].fila,raiz.hijos[2].columna)
                            sim = new tabsim.simbolo(simbolo.nombre,"AsignacionV",tipo,ambito,vector1.reg(),raiz.hijos[1].fila,raiz.hijos[1].columna)
                            tabsim.tabla.getInstancia().modificarSimboloP(sim,ambito)
                        }else if(tipo=="Int"&&res.tipo=="Boolean"){
                            if(res.valor.toString().toLowerCase()=="true"){
                                vector1.insertar(1,res1.valor,raiz.hijos[2].fila,raiz.hijos[2].columna)
                            }else{
                                vector1.insertar(0,res1.valor,raiz.hijos[2].fila,raiz.hijos[2].columna)
                            }
                            sim = new tabsim.simbolo(simbolo.nombre,"AsignacionV",tipo,ambito,vector1.reg(),raiz.hijos[1].fila,raiz.hijos[1].columna)
                            tabsim.tabla.getInstancia().modificarSimboloP(sim,ambito)
                        }else{
                            permitido=false;
                            //console.log("ES AUQI")
                            errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Error semantico, el dato \""+res.valor+"\" no es de tipo \""+tipo+"\"",raiz.hijos[2].fila,raiz.hijos[2].columna));
                        }
                    }else{
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No existe una variable con el identificador: \""+raiz.hijos[0].valor+"\"",raiz.hijos[0].fila,raiz.hijos[0].columna));
                    }
                
            }
            break;
        case "modVec2":
            if((!pasada&&ambito!="General")||(pasada&&ambito=="General")){
                //if(ambito!="General"){
                    res1=evaluarExpresion(raiz.hijos[1],ambito);
                    res2=evaluarExpresion(raiz.hijos[2],ambito);
                    res = evaluarExpresion(raiz.hijos[3],ambito);
                    
                    simbolo = tabsim.tabla.getInstancia().getSimboloP(raiz.hijos[0].valor,ambito);
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
                            sim = new tabsim.simbolo(simbolo.nombre,"AsignacionV2",tipo,ambito,vector2.reg(),raiz.hijos[2].fila,raiz.hijos[2].columna)
                            tabsim.tabla.getInstancia().modificarSimboloP(sim,ambito)
                        }else if(tipo=="Double"&&res.tipo=="Int"){
                            vector2.insertar(1,res1.valor,res2.valor,raiz.hijos[2].fila,raiz.hijos[2].columna)
                            sim = new tabsim.simbolo(simbolo.nombre,"AsignacionV2",tipo,ambito,vector2.reg(),raiz.hijos[2].fila,raiz.hijos[2].columna)
                            tabsim.tabla.getInstancia().modificarSimboloP(sim,ambito)
                        }else if(tipo=="Int"&&res.tipo=="Boolean"){
                            if(res.valor.toString().toLowerCase()=="true"){
                                vector2.insertar(1,res1.valor,res2.valor,raiz.hijos[2].fila,raiz.hijos[2].columna)
                            }else{
                                vector2.insertar(0,res1.valor,res2.valor,raiz.hijos[2].fila,raiz.hijos[2].columna)
                            }
                            sim = new tabsim.simbolo(simbolo.nombre,"AsignacionV2",tipo,ambito,vector2.reg(),raiz.hijos[2].fila,raiz.hijos[2].columna)
                            tabsim.tabla.getInstancia().modificarSimboloP(sim,ambito)
                        }else{
                            permitido=false;
                            errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Error semantico, el dato \""+res.valor+"\" no es de tipo \""+tipo+"\"",raiz.hijos[2].fila,raiz.hijos[2].columna));
                        }

                    }else{
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No existe una variable con el identificador: \""+raiz.hijos[0].valor+"\"",raiz.hijos[0].fila,raiz.hijos[0].columna));
                        
                    }
                //}else{
                    //errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No se puede modificar un vector en el ambito global",raiz.fila,raiz.columna));
            }
            
            break;
        case "CIf":
            if(!pasada){
                if(ambito!="General"){
                    condicion = evaluarExpresion(raiz.hijos[0],ambito);
                    if (condicion.tipo=="Boolean"){
                        if (condicion.valor.toLowerCase()=="true"){
                            codigo+=interpretar(raiz.hijos[1],ambito,lugar,pasada)
                            return codigo;
                        }else{
                            if(raiz.hijos[2]!=null){
                                codigo+=interpretar(raiz.hijos[2].hijos[0],ambito,lugar,pasada)
                                return codigo;
                            }
                            return codigo;
                        }
                        //
                    }else{
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","La condici??n debe devolver un valor Booleano (true o false)",raiz.fila,raiz.columna));
                        return null;
                    }
                }else{
                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No se puede utilizar la sentencia \"If\" en el ambito global",raiz.fila,raiz.columna));
                }
            }
            break;
        case "CSwitch":
            if(!pasada){
                if(ambito!="General"){
                    res = evaluarExpresion(raiz.hijos[0],ambito);
                    
                    let cases = evaluarLCase(res,raiz.hijos[1],ambito,pasada)
                    if(brk){
                        brk=false;
                        return cases.codigo
                    }
                    if(raiz.hijos[2]!=null){
                        if(!cases.salida){
                            cases.codigo+=interpretar(raiz.hijos[2].hijos[0],ambito,"CSwitch",pasada)
                        }
                    }
                    return cases.codigo;
                }else{
                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No se puede utilizar la sentencia \"Switch\" en el ambito global",raiz.fila,raiz.columna));
                }
            }
            break;
        case "SWhile":
            if(!pasada){
                if(ambito!="General"){
                    res = evaluarExpresion(raiz.hijos[0],ambito);
                    if(res.tipo=="Boolean"){
                        if(res.valor.toLowerCase()=="true"){
                            codigo+=interpretar(raiz.hijos[1],ambito,"SWhile",pasada)
                            if(brk){
                                brk=false;
                                return codigo;
                            }
                            if(ctn){
                                ctn=false;
                            }
                            res = evaluarExpresion(raiz.hijos[0],ambito);
                            if(res.valor.toLowerCase()=="true"){
                                codigo+=interpretar(raiz,ambito,"SWhile",pasada);
                                return codigo
                            }
                            return codigo;
                        }else{
                            return codigo
                        }
                    }else{
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","La condici??n debe devolver un valor Booleano (true o false)",raiz.hijos[0].hijos[0].fila,raiz.hijos[0].hijos[0].columna));
                        return null;
                    }
                }else{
                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No se puede utilizar la sentencia \"While\" en el ambito global",raiz.fila,raiz.columna));
                }
            }
            break;
        case "SDoWhile":
            if(!pasada){
                if(ambito!="General"){
                    codigo+=interpretar(raiz.hijos[0],ambito,"SDoWhile",pasada)
                    if(brk){
                        brk=false;
                        return codigo;
                    }

                    if(ctn){
                        ctn=false;
                        res = evaluarExpresion(raiz.hijos[1],ambito);
                        if(res.tipo=="Boolean"){
                            if(res.valor.toLowerCase()=="true"){
                                codigo+=interpretar(raiz,ambito,"SDoWhile",pasada);
                                return codigo;
                            }else{
                                return codigo
                            }
                        }else{
                            errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","La condici??n debe devolver un valor Booleano (true o false)",raiz.hijos[1].hijos[0].fila,raiz.hijos[1].hijos[0].columna));
                            return null;
                        }
                    }
                    res = evaluarExpresion(raiz.hijos[1],ambito);
                    if(res.tipo=="Boolean"){
                        if(res.valor.toLowerCase()=="true"){
                            codigo+=interpretar(raiz,ambito,"SDoWhile",pasada);
                            return codigo;
                        }else{
                            return codigo
                        }
                    }else{
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","La condici??n debe devolver un valor Booleano (true o false)",raiz.hijos[1].hijos[0].fila,raiz.hijos[1].hijos[0].columna));
                        return null;
                    }
                }else{
                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No se puede utilizar la sentencia \"Do While\" en el ambito global",raiz.fila,raiz.columna));
                }
            }
            break
        case "SFor":
            if(!pasada){
                if(ambito!="General"){
                    //console.log("EMPEZANDO FOR "+pasada)
                    codigo+=funFor(raiz.hijos[1],raiz.hijos[2],raiz.hijos[3],ambito,true,raiz.hijos[0],pasada)
                    return codigo
                }else{
                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No se puede utilizar la sentencia \"For\" en el ambito global",raiz.fila,raiz.columna));
                }
            }
            break
        case "FRun":
            if(!pasada){
                if(ambito=="General"){
                    if(unicoRun){
                        habilitarLlamada=true;
                        codigo+=interpretar(raiz.hijos[0],ambito,lugar,pasada)
                        habilitarLlamada=false;
                        unicoRun=false;
                        return codigo;
                    }else{
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No puede existir mas de una sentiencia Run",raiz.fila,raiz.columna));
                        return ""
                    }
                }else{
                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No se puede utilizar la funci??n \"Run\" en el ambito "+ambito,raiz.fila,raiz.columna));
                }
            }
            break;
        case "SLlamada":
            if(!pasada){
                if(ambito!="General"||habilitarLlamada){
                    id = raiz.hijos[0].valor;
                    //console.log("ID "+id)
                    simbolo = tabsim.tabla.getInstancia().getSimboloP(id,ambito);
                    ambitoa=ambito
                    ambito = id
                    if(simbolo.tipo1=="Funcion"){
                        if(simbolo.parametros.length>raiz.hijos[1].hijos.length){
                            errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","La funcion posee mas parametros que la llamada",raiz.hijos[0].fila,raiz.hijos[0].columna));
                        }else if(simbolo.parametros.length<raiz.hijos[1].hijos.length){
                            errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","La llamada posee mas parametros que la funci??n",raiz.hijos[0].fila,raiz.hijos[0].columna));
                        }else{
                            bien = true;
                            for (i=0; i<simbolo.parametros.length;i++){
                                res = evaluarExpresion(raiz.hijos[1].hijos[i],ambitoa);
                                let Sact = tabsim.tabla.getInstancia().getSimboloP(simbolo.parametros[i],id);
                                //********** COMPARACION **********
                                //console.log(res.valor+" "+res.tipo)
                                //console.log(Sact.valor+" "+Sact.tipo2)
                                //*********************************
                                tipo = Sact.tipo2;
                                if (tipo==res.tipo){
                                    
                                    if(tipo=="Int"){
                                        if(-2147483648 <= res.valor && res.valor <= 2147483647){
                                            sim = new tabsim.simbolo(Sact.nombre,"Asignacion",tipo,ambito,res.valor,raiz.hijos[1].fila,raiz.hijos[1].columna)
                                        }else{
                                            bien = false;
                                            errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","os valores permitidos para variables de tipo entero son entre -2147483648 y 2147483647",raiz.hijos[1].fila,raiz.hijos[1].columna));
                                        }
                                    }else{
                                        sim = new tabsim.simbolo(Sact.nombre,"Asignacion",tipo,ambito,res.valor,raiz.hijos[1].hijos[i].fila,raiz.hijos[1].hijos[i].columna)
                                    }
                                    //console.log(sim.nombre+" A "+sim.valor)
                                    if(sim!=null){
                                        tabsim.tabla.getInstancia().modificarSimboloP(sim,ambito)
                                    }
                                    
                                }else if(tipo=="Double"&&res.tipo=="Int"){
                                    sim = new tabsim.simbolo(Sact.nombre,"Asignacion",tipo,ambito,res.valor,raiz.hijos[1].hijos[i].fila,raiz.hijos[1].hijos[i].columna)
                                    if(sim!=null){
                                        tabsim.tabla.getInstancia().modificarSimboloP(sim,ambito)
                                    }
                                }else if(tipo=="Int"&&res.tipo=="Boolean"){
                                    if(res.valor.toString().toLowerCase()=="true"){
                                        sim = new tabsim.simbolo(Sact.nombre,"Asignacion",tipo,ambito,1,raiz.hijos[1].hijos[i].fila,raiz.hijos[1].hijos[i].columna)
                                    }else{
                                        sim = new tabsim.simbolo(Sact.nombre,"Asignacion",tipo,ambito,0,raiz.hijos[1].hijos[i].fila,raiz.hijos[1].hijos[i].columna)
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
                            codigo+=interpretar(simbolo.valor,id,"Funcion",pasada)
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
                                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","La funci??n debe devolver un valor de tipo "+simbolo.tipo2,raiz.hijos[0].fila,raiz.hijos[0].columna));
                                    return ""
                                }
                                
                            }else{
                                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","La funci??n debe devolver un valor de tipo "+simbolo.tipo2,raiz.hijos[0].fila,raiz.hijos[0].columna));
                                return ""
                            }
                            //console.log(codigo)
                            
                        }
                    }else if(simbolo.tipo1=="Metodo"){
                        
                        if(simbolo.parametros.length>raiz.hijos[1].hijos.length){
                            errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","El m??todo posee mas parametros que la llamada",raiz.hijos[0].fila,raiz.hijos[0].columna));
                        }else if(simbolo.parametros.length<raiz.hijos[1].hijos.length){
                            errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","La llamada posee mas parametros que el m??todo",raiz.hijos[0].fila,raiz.hijos[0].columna));
                        }else{
                            
                            bien = true;
                            for (i=0; i<simbolo.parametros.length;i++){
                                //console.log("aa "+raiz.hijos[1].hijos[i].hijos[0].valor)
                                res = evaluarExpresion(raiz.hijos[1].hijos[i],ambitoa);
                                //console.log(res)
                                let Sact = tabsim.tabla.getInstancia().getSimboloP(simbolo.parametros[i],id);
                                //********** COMPARACION **********
                                //console.log(res.valor+" "+res.tipo)
                                //console.log(Sact.valor+" "+Sact.tipo2)
                                //*********************************
                                tipo = Sact.tipo2;
                                if (tipo==res.tipo){
                                    
                                    if(tipo=="Int"){
                                        if(-2147483648 <= res.valor && res.valor <= 2147483647){
                                            sim = new tabsim.simbolo(Sact.nombre,"Asignacion",tipo,ambito,res.valor,raiz.hijos[1].hijos[i].fila,raiz.hijos[1].hijos[i].columna)
                                        }else{
                                            bien = false;
                                            errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Los valores permitidos para variables de tipo entero son entre -2147483648 y 2147483647",raiz.hijos[1].fila,raiz.hijos[1].columna));
                                        }
                                    }else{
                                        sim = new tabsim.simbolo(Sact.nombre,"Asignacion",tipo,ambito,res.valor,raiz.hijos[1].hijos[i].fila,raiz.hijos[1].hijos[i].columna)
                                    }
                                    //console.log(sim.nombre+" A "+sim.valor)
                                    if(sim!=null){
                                        //console.log(sim)
                                        tabsim.tabla.getInstancia().modificarSimboloP(sim,ambito)
                                    }
                                    
                                }else if(tipo=="Double"&&res.tipo=="Int"){
                                    sim = new tabsim.simbolo(Sact.nombre,"Asignacion",tipo,ambito,res.valor,raiz.hijos[1].hijos[i].fila,raiz.hijos[1].hijos[i].columna)
                                    if(sim!=null){
                                        tabsim.tabla.getInstancia().modificarSimboloP(sim,ambito)
                                    }
                                }else if(tipo=="Int"&&res.tipo=="Boolean"){
                                    if(res.valor.toString().toLowerCase()=="true"){
                                        sim = new tabsim.simbolo(Sact.nombre,"Asignacion",tipo,ambito,1,raiz.hijos[1].hijos[i].fila,raiz.hijos[1].hijos[i].columna)
                                    }else{
                                        sim = new tabsim.simbolo(Sact.nombre,"Asignacion",tipo,ambito,0,raiz.hijos[1].hijos[i].fila,raiz.hijos[1].hijos[i].columna)
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
                            codigo+=interpretar(simbolo.valor,id,"Metodo",pasada)
                            return codigo
                            //console.log(codigo)
                        }
                    }
                    return "";
                }else{
                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No se pueden llamar m??todos o funciones en el ambito global",raiz.fila,raiz.columna));
                }
            }
            break
        case "SFuncion":
            if(ambito=="General"){
                if(pasada){
                    id = raiz.hijos[0].valor;
                    LParametros = [];
                    interpretar(raiz.hijos[1],id,"Funcion",false)
                    sim= new tabsim.simbolo(id,"Funcion",raiz.hijos[2].valor,"General",raiz.hijos[3],raiz.hijos[0].fila,raiz.hijos[0].columna)
                    for(i=0;i<raiz.hijos[1].hijos.length;i++){
                        LParametros.push(raiz.hijos[1].hijos[i].hijos[1].hijos[0].valor)
                    }
                    sim.parametros=LParametros
                    
                    if(sim!=null){
                        let simbolo = tabsim.tabla.getInstancia().getSimboloP(id,ambito);
                        if(simbolo!=null){
                            if(simbolo.entorno=="General"){
                                if(simbolo.tipo1=="Asignacion"||simbolo.tipo1=="Declaracion"||simbolo.tipo1=="Incremento"||simbolo.tipo1=="Decremento"||simbolo.tipo1=="AsignacionV"||simbolo.tipo1=="AsignacionV2"){
                                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Ya existe una varible con el nombre \""+sim.nombre+"\"",raiz.fila,raiz.columna));
                                }else if(simbolo.tipo1=="Funcion"||simbolo.tipo1=="Metodo"){
                                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Ya existe una funci??n o m??todo con el nombre "+sim.nombre,raiz.fila,raiz.columna));
                                }
                            }else{
                                tabsim.tabla.getInstancia().pushSimbolo(sim)
                            }
                        }else{
                            tabsim.tabla.getInstancia().pushSimbolo(sim)
                        }
                        
                    }
                }
            }else{
                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No se pueden crear funciones en el ambito "+ambito,raiz.hijos[0].fila,raiz.hijos[0].columna));
            }
            break;
        case "SMetodo":
            if(ambito=="General"){
                if(pasada){
                    id = raiz.hijos[0].valor;
                    LParametros = [];
                    interpretar(raiz.hijos[1],id,"Metodo",false)
                    sim= new tabsim.simbolo(id,"Metodo","void","General",raiz.hijos[2],raiz.hijos[0].fila,raiz.hijos[0].columna)
                    for(i=0;i<raiz.hijos[1].hijos.length;i++){
                        LParametros.push(raiz.hijos[1].hijos[i].hijos[1].hijos[0].valor)
                    }
                    sim.parametros=LParametros
                    
                    if(sim!=null){
                        let simbolo = tabsim.tabla.getInstancia().getSimboloP(id,ambito);
                        if(simbolo!=null){
                            if(simbolo.entorno=="General"){
                                if(simbolo.tipo1=="Asignacion"||simbolo.tipo1=="Declaracion"||simbolo.tipo1=="Incremento"||simbolo.tipo1=="Decremento"||simbolo.tipo1=="AsignacionV"||simbolo.tipo1=="AsignacionV2"){
                                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Ya existe una varible con el nombre \""+sim.nombre+"\"",raiz.fila,raiz.columna));
                                }else if(simbolo.tipo1=="Funcion"||simbolo.tipo1=="Metodo"){
                                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Ya existe una funci??n o m??todo con el nombre "+sim.nombre,raiz.fila,raiz.columna));
                                }
                            }else{
                                tabsim.tabla.getInstancia().pushSimbolo(sim)
                            }
                        }else{
                            tabsim.tabla.getInstancia().pushSimbolo(sim)
                        }
                        
                    }
                }
            }else{
                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","No se pueden crear m??todos en el ambito "+ambito,raiz.hijos[0].fila,raiz.hijos[0].columna));
            }
            break;

    }
    return codigo;
}

function funFor(cond,actualizacion,raiz,ambito,primero,ini,pasada){
    let codigo=""
    if(primero){
        permitir=true;
        //console.log("VOY A INICIAR "+pasada)
        codigo+=interpretar(ini,ambito,"SFor",pasada)

    }
    
    condicion=evaluarExpresion(cond,ambito);

    if(condicion.tipo=="Boolean"){
        if(condicion.valor.toLowerCase()=="true"){
            
            codigo+=interpretar(raiz,ambito,"SFor",pasada)
            if(brk){
                brk=false
                return codigo;
            }else if(ctn){
                ctn=false
                interpretar(actualizacion,ambito,"SFor",pasada)
                codigo+=funFor(cond,actualizacion,raiz,ambito,false,ini,pasada)
            }else{
                interpretar(actualizacion,ambito,"SFor",pasada)
                codigo+=funFor(cond,actualizacion,raiz,ambito,false,ini,pasada)
            }
            
            return codigo;
        }else{
            //interpretar(actualizacion,ambito,"Normal")
            return codigo
        }
    }else{
        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","La condici??n debe devolver un valor Booleano (true o false)",raiz.hijos[0].hijos[0].fila,raiz.hijos[0].hijos[0].columna));
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
        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","La condici??n debe devolver un valor Booleano (true o false)",raiz.hijos[0].fila,raiz.hijos[0].columna));
        return "";
    }*/

}

function tabla (){
    console.log("\nTabla de simbolos")
    console.log(tabsim.tabla.getInstancia().getsimbolos());
    console.log("Tabla de errores\n")
    console.log(errores.ListaErrores.getInstance().getErrores())
}

function evaluarLCase(exp,raiz,ambito,pasada){
    let analiz = new analizao()
    //console.log(raiz.hijos[raiz.hijos.length-1])
    for (let i = 0; i < raiz.hijos.length; i++) {
        res = evaluarExpresion(raiz.hijos[i].hijos[0],ambito);
        let condicion = relacionales.igualacion(exp,res,raiz.hijos[i].hijos[0].fila,raiz.hijos[i].hijos[0].columna)
        
        if(condicion.valor=="true"){
            analiz.codigo += interpretar(raiz.hijos[i].hijos[1],ambito,"CSwitch",pasada)
            if(brk){
                return analiz;
            }
            if(raiz.hijos[i].hijos[2]!=null){
                analiz.salida = true;
                return analiz;
            }
        }
    }
    return analiz;
}

function variable(tipo,raiz,ambito,lugar){
    let sim;
    let valo;
    
    switch(raiz.etiqueta){
        case "Dec":
            raiz.hijos.forEach(hijo=> variable(tipo,hijo,ambito,lugar))
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
                let simbolo = tabsim.tabla.getInstancia().getSimboloP(sim.nombre,ambito);
                if(simbolo!=null){
                    if(simbolo.entorno==ambito){
                        if(!permitir){
                            if(simbolo.tipo1=="Asignacion"||simbolo.tipo1=="Declaracion"||simbolo.tipo1=="Incremento"||simbolo.tipo1=="Decremento"||simbolo.tipo1=="AsignacionV"||simbolo.tipo1=="AsignacionV2"){
                                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Ya existe una varible con el nombre \""+sim.nombre+"\"",raiz.fila,raiz.columna));
                            }else if(simbolo.tipo1=="Funcion"||simbolo.tipo1=="Metodo"){
                                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Ya existe una funci??n o m??todo con el nombre "+sim.nombre,raiz.fila,raiz.columna));
                            }
                        }else if(lugar=="SFor"){
                            tabsim.tabla.getInstancia().modificarSimboloP(sim,ambito)
                        }else{
                            tabsim.tabla.getInstancia().modificarSimboloP(sim,ambito)
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
            //console.log("ANDO EN ASIG "+lugar+" ")
            //console.log(raiz.hijos[0])
            if (tipo==res.tipo){
                if(tipo=="Int"){
                    if(-2147483648 <= res.valor && res.valor <= 2147483647){
                        sim = new tabsim.simbolo(raiz.hijos[0].valor,"Asignacion",tipo,ambito,res.valor,raiz.hijos[1].fila,raiz.hijos[1].columna)
                    }else{
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Los valores permitidos para variables de tipo entero son entre -2147483648 y 2147483647",raiz.hijos[1].fila,raiz.hijos[1].columna));
                    }
                }else{
                    sim = new tabsim.simbolo(raiz.hijos[0].valor,"Asignacion",tipo,ambito,res.valor,raiz.hijos[1].fila,raiz.hijos[1].columna)
                }
                
            }else if(tipo=="Double"&&res.tipo=="Int"){
                sim = new tabsim.simbolo(raiz.hijos[0].valor,"Asignacion",tipo,ambito,res.valor,raiz.hijos[1].fila,raiz.hijos[1].columna)
            }else if(tipo=="Int"&&res.tipo=="Boolean"){
                if(res.valor.toString().toLowerCase()=="true"){
                    sim = new tabsim.simbolo(raiz.hijos[0].valor,"Asignacion",tipo,ambito,1,raiz.hijos[1].fila,raiz.hijos[1].columna)
                }else{
                    sim = new tabsim.simbolo(raiz.hijos[0].valor,"Asignacion",tipo,ambito,0,raiz.hijos[1].fila,raiz.hijos[1].columna)
                }
                
            }else{
                errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Error semantico, el dato \""+res.valor+"\" no es de tipo \""+tipo+"\"",raiz.hijos[1].fila,raiz.hijos[1].columna));
            }
            //console.log(lugar)
            if(sim!=null){
                if(res.otro!="Lista"){
                    let simbolo = tabsim.tabla.getInstancia().getSimboloP(sim.nombre,ambito);
                    if(simbolo!=null){
                        if(simbolo.entorno==ambito){
                            if(!permitir){
                                if(simbolo.tipo1=="Asignacion"||simbolo.tipo1=="Declaracion"||simbolo.tipo1=="Incremento"||simbolo.tipo1=="Decremento"||simbolo.tipo1=="AsignacionV"||simbolo.tipo1=="AsignacionV2"){
                                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Ya existe una varible con el nombre \""+sim.nombre+"\"",raiz.hijos[0].fila,raiz.hijos[0].columna));
                                }else if(simbolo.tipo1=="Funcion"||simbolo.tipo1=="Metodo"){
                                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Ya existe una funci??n o m??todo con el nombre \""+sim.nombre+"\"",raiz.hijos[0].fila,raiz.hijos[0].columna));
                                }
                            }else if(lugar=="SFor"){
                                tabsim.tabla.getInstancia().modificarSimboloP(sim,ambito)
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
            simbolo = tabsim.tabla.getInstancia().getSimboloP(raiz.hijos[0].valor,ambi);
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
            simbolo = tabsim.tabla.getInstancia().getSimboloP(raiz.hijos[0].valor,ambi);
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
                simbolo = tabsim.tabla.getInstancia().getSimboloP(id,ambi);
                ambito=id
                if(simbolo.tipo1=="Funcion"){
                    if(simbolo.parametros.length>raiz.hijos[1].hijos.length){
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","La funcion posee mas parametros que la llamada",raiz.hijos[0].fila,raiz.hijos[0].columna));
                    }else if(simbolo.parametros.length<raiz.hijos[1].hijos.length){
                        errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","La llamada posee mas parametros que la funci??n",raiz.hijos[0].fila,raiz.hijos[0].columna));
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
                        codigo+=interpretar(simbolo.valor,id,"Funcion",false)
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
                            errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","La funci??n debe devolver un valor de tipo "+simbolo.tipo2,raiz.hijos[0].fila,raiz.hijos[0].columna));
                            res.tipo="error"
                            res.valor="error"
                            return res
                        }
                    }
                }else if(simbolo.tipo1=="Metodo"){
                    errores.ListaErrores.getInstance().pushError(new errores.error("Semantico","Un m??todo no devuelve ningun valor ",raiz.hijos[0].fila,raiz.hijos[0].columna));
                    res.tipo="error"
                    res.valor="error"
                    return res
                }
                res.tipo="error"
                res.valor="error"
                return res
        case "id":
            res = new ResultadoOp();
            simbolo = tabsim.tabla.getInstancia().getSimboloP(raiz.valor,ambi);
            //console.log("buscando "+raiz.valor+" en "+ambi)
            if(simbolo!=null){
                res.tipo=simbolo.tipo2;
                res.valor=simbolo.valor;
                res.otro=simbolo.tipo1;

                //console.log(raiz.valor+" DE VOY A REOTRNAR "+simbolo.tipo2+" "+simbolo.valor+" "+simbolo.tipo1)
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

module.exports={interpretar,tabla,permitir,brk,ctn,rtrn,valRtrn,codFun,unicoRun,habilitarLlamada}

/*let permitir=false, brk=false,ctn=false,rtrn=false,valRtrn=null;
let codFun="";
let unicoRun=true;
let habilitarLlamada=false;*/