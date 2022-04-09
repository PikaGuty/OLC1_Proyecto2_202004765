var Tsimbolos = require("../tabla_simbolos");

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
                raiz.hijos.forEach(hijo=> codigo+=variable(t.valor,hijo))
                return codigo;
        }
        return codigo;
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
                    sim= new simbolo(raiz.valor,"variable",tipo,0,raiz.fila,raiz.columna)
                    break;
                case "Double":
                    sim= new simbolo(raiz.valor,"variable",tipo,0.0,raiz.fila,raiz.columna)
                    break;
                case "Boolean":
                    sim= new simbolo(raiz.valor,"variable",tipo,true,raiz.fila,raiz.columna)
                    break;
                case "Char":
                    sim= new simbolo(raiz.valor,"variable",tipo,'0',raiz.fila,raiz.columna)
                    break;
                case "String":
                    sim= new simbolo(raiz.valor,"variable",tipo,"",raiz.fila,raiz.columna)
                    break;
            }
            tabla.getInstancia().pushSimbolo(sim)
            break;
        case "Asig":
            switch(tipo){
                case "Int":
                    valo=parseInt(raiz.hijos[1].hijos[0].valor)
                    console.log(tipo+" "+typeof(valo)+" "+valo)

                    if(!isNaN(valo)){
                        sim = new simbolo(raiz.hijos[0].valor,"variable",tipo,valo,raiz.fila,raiz.columna)
                        console.log("Se asignó")
                    }else{
                        console.log("Error semantico")
                    }
                    break;
                case "Double":
                    valo=parseFloat(raiz.hijos[1].hijos[0].valor)
                    console.log(tipo+" "+typeof(valo)+" "+valo)

                    if(!isNaN(valo)){
                        sim = new simbolo(raiz.hijos[0].valor,"variable",tipo,valo,raiz.fila,raiz.columna)
                        console.log("Se asignó")
                    }else{
                        console.log("Error semantico")
                    }
                    break;
                case "Boolean":
                    valo=raiz.hijos[1].hijos[0].valor.toLowerCase() 
                    console.log(tipo+" "+typeof(valo)+" "+valo)

                    if(valo=="true"||valo=="false"){
                        sim = new simbolo(raiz.hijos[0].valor,"variable",tipo,raiz.hijos[1].hijos[0].valor,raiz.fila,raiz.columna)
                        console.log("Se asignó")
                    }else{
                        console.log("Error semantico")
                    }
                    break;
                case "Char":
                    valo=raiz.hijos[1].hijos[0].valor
                    console.log(tipo+" "+typeof(valo)+" "+valo)
                    valo = valo.split("")
                    
                    if(valo[0]=="'"&&valo[valo.length-1]=="'"){
                        let rest=""
                        for (let i = 1; i < valo.length-1; i++) {
                            rest+=valo[i];
                        }
                        console.log(rest)
                        sim = new simbolo(raiz.hijos[0].valor,"variable",tipo,rest,raiz.fila,raiz.columna)
                        console.log("Se asignó")
                    }else{
                        console.log("Error semantico")
                    }
                    break;
                case "String":
                    valo=raiz.hijos[1].hijos[0].valor
                    console.log(tipo+" "+typeof(valo)+" "+valo)
                    valo = valo.split("")
                    
                    if(valo[0]=="\""&&valo[valo.length-1]=="\""){
                        let rest=""
                        for (let i = 1; i < valo.length-1; i++) {
                            rest+=valo[i];
                        }
                        console.log(rest)
                        sim = new simbolo(raiz.hijos[0].valor,"variable",tipo,rest,raiz.fila,raiz.columna)
                        console.log("Se asignó")
                    }else{
                        console.log("Error semantico")
                    }
                    break;
            }
            tabla.getInstancia().pushSimbolo(sim)
            break
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

var tabla = (function(){
    var instancia;

    class tabla{
        constructor(){
            this.simbolos=[];
        }

        pushSimbolo(simbolos){
            this.simbolos.push(simbolos);
        }

        borrarTabla(){
            this.simbolos=[];
        }

        getSimbolo(nombre){
            let res=null;
            this.simbolos.forEach(simbolo=>{
                if(simbolo.nombre==nombre){
                    res=simbolo;
                }
            })
            return res;
        }

        modificarSimbolo(simb){
            this.simbolos.forEach(simbolo=>{
                if(simb.nombre==simbolo.nombre){
                    simbolo.valor=simb.valor;
                    simbolo.tipo=simb.tipo;
                }
            })
        }
    }

    function CrearInstancia(){
        return new tabla();
    }

    return {
        getInstancia:function(){
            if(!instancia){
                instancia=CrearInstancia();
            }
            return instancia;
        }
    }
}());
