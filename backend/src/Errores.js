class error{
    constructor(tipo, descripcion, fila, columna){
        this.tipo=tipo;
        this.descripcion=descripcion;
        this.fila=fila;
        this.columna=columna;
        this.siguiente=null;
        this.anterior=null;
    }
}

var ListaErrores = (function(){
    class Lista{
        constructor(){
            this.inicial=null;
            this.final=null;
        }
    
        pushError(error){
            if(this.inicial==null){
                this.inicial=error;
                this.final=error;
                return;
            }
            this.final.siguiente=error;
            error.anterior=this.final;
            this.final=error;
        }
    
        getError(){
    
        }
    
        borrarErrores(){
            this.inicial=null;
            this.final=null;
        }
    }

    function CrearInstancia(){
        return new Lista();
    }

    return{
        getInstance:function(){
            if(!instancia){
                instancia=CrearInstancia();
            }
            return instancia;
        }
    }
}());
