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

        getsimbolos(){
            var texto="\n";

            var cuenta=1;
            this.simbolos.forEach(simbolo =>{
                try{
                    texto+=" -- "+cuenta
                    texto+=" -- "+simbolo.nombre
                    texto+=" -- "+simbolo.tipo1
                    texto+=" -- "+simbolo.tipo2
                    texto+=" -- "+simbolo.valor+"\n";
                    cuenta++;
                }catch(e){

                }
                
            })
             return texto;
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

module.exports={tabla,simbolo}

