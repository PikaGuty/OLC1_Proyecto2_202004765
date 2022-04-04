var fs = require('fs'); 
var parser = require('./gramatica');


fs.readFile('./entrada.txt', (err, data) => {
    if (err) throw err;
    resultado=parser.parse(data.toString());
    console.log(imprimir(resultado));
});

function imprimir(raiz){
    var texto ="";
    var contador=1;
    texto+="digraph G{";
    texto+="Node0[label=\"" + escapar(raiz.etiqueta +" | "+raiz.valor) + "\"];\n";
  
    recorrido("Node0",raiz);
  
    texto+= "}";
  
    return texto;
  
    function recorrido(padre,hijs){
        if(hijs === undefined || hijs === null) return;
    
        //console.log(typeof hijs);
    
        if(typeof hijs=="string")return;
        hijs.hijos.forEach(nodo=> {
          if(typeof nodo.etiqueta=="undefined")return;
          let nombrehijo="Node"+contador;
          texto+=nombrehijo+"[label=\"" + escapar(nodo.etiqueta) +" | "+escapar(nodo.valor) + "\"];\n";
          texto+=padre+"->"+nombrehijo+";\n";
          contador++;
          recorrido(nombrehijo,nodo);
        })
    
    }
  
    function escapar(cadena) {
        cadena = cadena.replace(/\\/g, "\\\\");
        cadena = cadena.replace(/\"/g, "\\\"");
        return cadena;
    }
}