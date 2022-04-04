/* Definición Léxica */
%lex

%options case-insensitive

cescape                             [\'\"\\bfnrtv]
escape                              \\{cescape}

char_unico                          [^\'\\]
char_vario                          [^\"\\]+

string_vario                       {escape}|{char_vario}
string_unico                       {escape}|{char_unico}

cadena                              \"{string_vario}*\"
caracter                            \'{string_unico}\'

identificador                       ([a-zA-Z])[a-zA-Z0-9_]*

%%

[ \r\t\n\s]+         					    // se ignoran espacios en blanco
[/][/].*									// comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]			// comentario multiple líneas

//********** Tipos de datos **********
"int"                       return 'R_INT'
"double"                    return 'R_DOUBLE'
"boolean"                   return 'R_BOOLEAN'
"char"                      return 'R_CHAR'
"string"                    return 'R_STRING'

//********** RESERVADAS **********
"true"                      return 'R_TRUE'
"false"                     return 'R_FALSE'
"new"                       return 'R_NEW'
"if"                        return 'R_IF'
"else"                      return 'R_ELSE'
"switch"                    return 'R_SWITCH'
"case"                      return 'R_CASE'
"default"                   return 'R_DEFAULT'
"while"                     return 'R_WHILE'
"for"                       return 'R_FOR'
"do"                        return 'R_DO'
"break"                     return 'R_BREAK'
"continue"                  return 'R_CONTINUE'
"return"                    return 'R_RETURN'
"void"                      return 'R_VOID'
"print"			            return 'R_PRINT';
"println"			        return 'R_PRINTLN';
"tolower"			        return 'R_TOLOWER';
"toupper"			        return 'R_TOUPPER';
"round"			            return 'R_ROUND';
"length"			        return 'R_LENGTH';
"typeof"			        return 'R_TYPEOF';
"tostring"			        return 'R_TOSTRING';
"tochararray"			    return 'R_TOCHARARRAY';
"run"			            return 'R_RUN';


//********** Caracteres **********
":"					        return 'DOSPTS';
";"					        return 'PTCOMA';
"{"					        return 'LLAVIZQ';
"}"					        return 'LLAVDER';
"("					        return 'PARIZQ';
")"					        return 'PARDER';
"["					        return 'CORIZQ';
"]"					        return 'CORDER';
","					        return 'COMA';

//********** OPERANDOS **********
"+"					        return 'MAS';
"-"					        return 'MENOS';
"*"					        return 'POR';
"/"					        return 'DIV';
"^"					        return 'POTENCIA';
"%"					        return 'MODULO';
"="					        return 'IGUAL';

//********** Operadores Relacionales **********
"=="					    return 'IGUALACION';
"!="					    return 'DIFERENCIACION';
"<"					        return 'MENORQ';
"<="					    return 'MENIGUALQ';
">"					        return 'MAYORQ';
">="					    return 'MAYIGUALQ';
"!"					        return 'DIF';
"||"					    return 'OR';
"&&"					    return 'AND';


//********** Expresiones **********
[0-9]+("."[0-9]+)\b  	    return 'DECIMAL';
[0-9]+\b				    return 'ENTERO';
{identificador}	            return 'IDENTIFICADOR';
{caracter}                  return 'CARACTER';
{cadena}                    return 'CADENA';


<<EOF>>				return 'EOF';
.					{ console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }

/lex

%{
    function nodo(etiqueta, valor, fila, columna){
        this.etiqueta=etiqueta;
        this.valor=valor;
        this.fila=fila;
        this.columna=columna;
        this.hijos=[];
        this.addHijos=addHijos;
        this.getHijos=getHijos;

        function addHijos(){
            for(var i=0; i<arguments.length;i++){
                this.hijos.push(arguments[i]);
                if(arguments[i]!=null){
                    arguments[i].padre=this;
                }
            }
        }
        function getHijos(pos){
            if (pos >(this.hijos.length-1)) return null;
            return this.hijos[pos]
        }
    }
%}

//PRECEDENCIA
%left 'OR'
%left 'AND'
%right 'DIF'
%left 'IGUALACION' 'DIFERENCIACION' 'MENORQ' 'MENIGUALQ' 'MAYORQ' 'MAYIGUALQ'
%left 'MAS' 'MENOS'
%left 'DIV' 'POR' 'MODULO'
%nonassoc 'POTENCIA'
%right 'MENOS' UMINUS
%left 'PARIZQ' 'PARDER'

%start ini

%% 
/* Definición de la gramática */
ini
    : instrucciones EOF {$$=new nodo("Raiz","Raiz",this.$first_line,@1.last_column); $$.addHijos($1); return $$;} 
    | EOF
;
instrucciones
    : instrucciones instruccion {$1.addHijos($2); $$=$1;}
    | instruccion {$$= new nodo("Instrucciones","Instrucciones",this._$.first_line,@1.last_column); $$.addHijos($1);}
    | error { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); } 
;
//############### INSTRUCCIONES ###############
instruccion
    : declaracion PTCOMA {$$=$1}
    | inc_dec PTCOMA {$$=$1}
    | dec_vectores PTCOMA {$$=$1}
    | mod_vectores PTCOMA {$$=$1}
    | sen_if {$$=$1}
    | asig_solo PTCOMA {$$=$1}
    | sen_switch {$$=$1}
    | sen_while {$$=$1}
    | sen_for {$$=$1}
    | sen_dowhile PTCOMA {$$=$1}
    | sen_return PTCOMA {$$=$1}
    | R_BREAK PTCOMA {$$=$1}
    | R_CONTINUE PTCOMA {$$=$1}
    | metodos {$$=$1}
    | funcion {$$=$1}
    | llamada PTCOMA {$$=$1}
    | fprint PTCOMA {$$=$1}
    | fprintln PTCOMA {$$=$1}
    | frun PTCOMA {$$=$1}
    | 
;
//#############################################
//TIPOS DE DATOS
tipo 
    : R_INT  {$$= new nodo("Int","Int",this._$.first_line,@1.last_column);}
    | R_DOUBLE {$$= new nodo("Double","Double",this._$.first_line,@1.last_column);}
    | R_BOOLEAN {$$= new nodo("Boolean","Boolean",this._$.first_line,@1.last_column);}
    | R_CHAR {$$= new nodo("Char","Char",this._$.first_line,@1.last_column);}
    | R_STRING {$$= new nodo("String","String",this._$.first_line,@1.last_column);}
;

//POSIBLES VALORES PARA LOS TIPOS
expresion
    : expresion POTENCIA expresion {$$= new nodo("Expresion","Expresion",this._$.first_line,@2.last_column);$$.addHijos($1,new nodo("op",$2,this._$.first_line,@2.last_column),$3);}
    | expresion MAS expresion {$$= new nodo("Expresion","Expresion",this._$.first_line,@2.last_column);$$.addHijos($1,new nodo("op",$2,this._$.first_line,@2.last_column),$3);}
    | expresion MENOS expresion {$$= new nodo("Expresion","Expresion",this._$.first_line,@2.last_column);$$.addHijos($1,new nodo("op",$2,this._$.first_line,@2.last_column),$3);}
    | expresion POR expresion {$$= new nodo("Expresion","Expresion",this._$.first_line,@2.last_column);$$.addHijos($1,new nodo("op",$2,this._$.first_line,@2.last_column),$3);}
    | expresion DIV expresion {$$= new nodo("Expresion","Expresion",this._$.first_line,@2.last_column);$$.addHijos($1,new nodo("op",$2,this._$.first_line,@2.last_column),$3);}
    | expresion MODULO expresion {$$= new nodo("Expresion","Expresion",this._$.first_line,@2.last_column);$$.addHijos($1,new nodo("op",$2,this._$.first_line,@2.last_column),$3);}
    | MENOS expresion %prec UMINUS {$$= new nodo("Expresion","Expresion",this._$.first_line,@2.last_column);$$.addHijos(new nodo("op",$1,this._$.first_line,@2.last_column),$2);}
    | PARIZQ expresion PARDER {$$=$2}
    | DIF expresion {$$= new nodo("Expresion","Expresion",this._$.first_line,@2.last_column);$$.addHijos(new nodo("op_log",$1,this._$.first_line,@2.last_column),$2);}
    | expresion IGUALACION expresion {$$= new nodo("Expresion","Expresion",this._$.first_line,@2.last_column);$$.addHijos($1,new nodo("op_rel",$2,this._$.first_line,@2.last_column),$3);}
    | expresion DIFERENCIACION expresion {$$= new nodo("Expresion","Expresion",this._$.first_line,@2.last_column);$$.addHijos($1,new nodo("op_rel",$2,this._$.first_line,@2.last_column),$3);}
    | expresion MENIGUALQ expresion {$$= new nodo("Expresion","Expresion",this._$.first_line,@2.last_column);$$.addHijos($1,new nodo("op_rel",$2,this._$.first_line,@2.last_column),$3);}
    | expresion MAYIGUALQ expresion {$$= new nodo("Expresion","Expresion",this._$.first_line,@2.last_column);$$.addHijos($1,new nodo("op_rel",$2,this._$.first_line,@2.last_column),$3);}
    | expresion MENORQ expresion {$$= new nodo("Expresion","Expresion",this._$.first_line,@2.last_column);$$.addHijos($1,new nodo("op_rel",$2,this._$.first_line,@2.last_column),$3);}
    | expresion MAYORQ expresion {$$= new nodo("Expresion","Expresion",this._$.first_line,@2.last_column);$$.addHijos($1,new nodo("op_rel",$2,this._$.first_line,@2.last_column),$3);}
    | expresion OR expresion {$$= new nodo("Expresion","Expresion",this._$.first_line,@2.last_column);$$.addHijos($1,new nodo("op_log",$2,this._$.first_line,@2.last_column),$3);}
    | expresion AND expresion {$$= new nodo("Expresion","Expresion",this._$.first_line,@2.last_column);$$.addHijos($1,new nodo("op_log",$2,this._$.first_line,@2.last_column),$3);}
    //PA ABAJO DATOS EN SI
    | ENTERO {$$= new nodo("Expresion","Expresion",this._$.first_line,@1.last_column);$$.addHijos(new nodo("entero",$1,this._$.first_line,@1.last_column));}
    | DECIMAL {$$= new nodo("Expresion","Expresion",this._$.first_line,@1.last_column);$$.addHijos(new nodo("decimal",$1,this._$.first_line,@1.last_column));}
    | R_TRUE {$$= new nodo("Expresion","Expresion",this._$.first_line,@1.last_column);$$.addHijos(new nodo("true",$1,this._$.first_line,@1.last_column));}
    | R_FALSE {$$= new nodo("Expresion","Expresion",this._$.first_line,@1.last_column);$$.addHijos(new nodo("false",$1,this._$.first_line,@1.last_column));}
    | CADENA {$$= new nodo("Expresion","Expresion",this._$.first_line,@1.last_column);
    var cad= $1.substr(0,$1.length);
    cad=cad.replace(/\\n/g,"\n");
    cad=cad.replace(/\\t/g,"\t");
    cad=cad.replace(/\\r/g,"\r");
    cad=cad.replace(/\\\\/g,"\\");
    cad=cad.replace(/\\\"/g,"\"");
    cad=cad.replace(/\\\'/g,"\'");
    $$.addHijos(new nodo("cadena",cad,this._$.first_line,@1.last_column));}
    | CARACTER {$$= new nodo("Expresion","Expresion",this._$.first_line,@1.last_column);$$.addHijos(new nodo("caracter",$1,this._$.first_line,@1.last_column));}
    | IDENTIFICADOR {$$= new nodo("Expresion","Expresion",this._$.first_line,@1.last_column);$$.addHijos(new nodo("id",$1,this._$.first_line,@1.last_column));}
    //PA ABAJO OTRAS COMBINACIONES
    | acs_vectores {$$=$1}
    | casteo {$$=$1}
    | ftolower {$$=$1}
    | ftoupper {$$=$1}
    | fround {$$=$1}
    | flength {$$=$1}
    | ftypeof {$$=$1}
    | ftostring {$$=$1}
    | ftochararray {$$=$1}
    | llamada {$$=$1}
;
//LISTA DE VALORES
lista 
    : lista COMA expresion
    | expresion
;
listavec
    : listavec COMA CORIZQ lista CORDER
    | COMA CORIZQ lista CORDER
;
//***************** Declaración y asignación de variables *****************
declaracion
    : tipo dec {$$= new nodo("Var","Var",this._$.first_line,@1.last_column); $$.addHijos($1,$2);}
;
dec
    : dec COMA asig {$1.addHijos($3); $$=$1;}
    | asig {$$= new nodo("Dec","Dec"); $$.addHijos($1)}
;
asig
    : IDENTIFICADOR IGUAL expresion {$$= new nodo("Asig","Asig"); $$.addHijos(new nodo("id",$1,this._$.first_line,@1.last_column),$3)}
    | IDENTIFICADOR {$$=new nodo("id",$1,this._$.first_line,@1.last_column)}
;
asig_solo
    : IDENTIFICADOR IGUAL expresion  {console.log($1+' = '+$3)}
;
//********************************* CASTEO ********************************
casteo
    : PARIZQ tipo PARDER expresion {$$=$1+""+$2+""+$3+""+$4}
;
//************************ INCREMENTO Y DECREMENTO ************************
inc_dec
    : expresion MAS MAS {console.log($1+""+$2+""+$3)}
    | expresion MENOS MENOS {console.log($1+""+$2+""+$3)}
;
inc_decf
    : expresion MAS MAS{console.log($1+""+$2+""+$3)}
    | expresion MENOS MENOS{console.log($1+""+$2+""+$3)}
;
//******************************** VECTORES *******************************
//DECLARACION
dec_vectores
    //TIPO 1
    : tipo IDENTIFICADOR CORIZQ CORDER IGUAL tipo CORIZQ expresion CORDER 
    | tipo IDENTIFICADOR CORIZQ CORDER CORIZQ CORDER IGUAL tipo CORIZQ expresion CORDER CORIZQ expresion CORDER 
    //TIPO 2 
    | tipo IDENTIFICADOR CORIZQ CORDER IGUAL CORIZQ lista CORDER 
    | tipo IDENTIFICADOR CORIZQ CORDER CORIZQ CORDER IGUAL CORIZQ listavec CORDER 
    
    | tipo IDENTIFICADOR CORIZQ CORDER IGUAL expresion 
    | tipo IDENTIFICADOR CORIZQ CORDER CORIZQ CORDER IGUAL CORIZQ lista CORDER 
;
//ACCESO
acs_vectores
    : IDENTIFICADOR CORIZQ ENTERO CORDER
    | IDENTIFICADOR CORIZQ ENTERO CORDER CORIZQ ENTERO CORDER
;
//MODIFICAR
mod_vectores
    : IDENTIFICADOR CORIZQ ENTERO CORDER IGUAL expresion 
    | IDENTIFICADOR CORIZQ ENTERO CORDER CORIZQ ENTERO CORDER IGUAL expresion 
;
//************************* SENTENCIA DE CONTRO IF ************************
sen_if
    : R_IF PARIZQ expresion PARDER LLAVIZQ instrucciones LLAVDER
    | R_IF PARIZQ expresion PARDER LLAVIZQ instrucciones LLAVDER R_ELSE LLAVIZQ instrucciones LLAVDER
    | R_IF PARIZQ expresion PARDER LLAVIZQ instrucciones LLAVDER R_ELSE sen_if
;
//************************* SENTENCIA DE CONTROL SWITCH ************************
sen_switch
    : R_SWITCH PARIZQ expresion PARDER LLAVIZQ list_case s_default  LLAVDER 
    | R_SWITCH PARIZQ expresion PARDER LLAVIZQ list_case LLAVDER
    | R_SWITCH PARIZQ expresion PARDER LLAVIZQ s_default LLAVDER
;
list_case
    : list_case s_case
    | s_case
;
s_case
    : R_CASE expresion DOSPTS instrucciones
;
s_default
    : R_DEFAULT DOSPTS instrucciones
;
//************************* SENTENCIA CICLICA WHILE ************************
sen_while
    : R_WHILE PARIZQ expresion PARDER LLAVIZQ instrucciones LLAVDER
;
//************************* SENTENCIA CICLICA FOR ************************
sen_for
    : R_FOR PARIZQ declaracion PTCOMA expresion PTCOMA inc_decf PARDER LLAVIZQ instrucciones LLAVDER
    | R_FOR PARIZQ asig_solo PTCOMA expresion PTCOMA inc_decf PARDER LLAVIZQ instrucciones LLAVDER
    
;
//************************* SENTENCIA CICLICA DO WHILE ************************
sen_dowhile
    : R_DO LLAVIZQ instrucciones LLAVDER R_WHILE PARIZQ expresion PARDER 
;
//************************* SENTENCIA RETURN ************************
sen_return
    : R_RETURN expresion 
;
//************************* FUNCIONES ************************
funcion
    : IDENTIFICADOR PARIZQ parametros PARDER DOSPTS tipo LLAVIZQ instrucciones LLAVDER
    | IDENTIFICADOR PARIZQ PARDER DOSPTS tipo LLAVIZQ instrucciones LLAVDER
;
parametros 
    : parametros COMA tipo IDENTIFICADOR
    | tipo IDENTIFICADOR
    | 
;
//************************* METODOS ************************
metodos
    : IDENTIFICADOR PARIZQ parametros PARDER LLAVIZQ instrucciones LLAVDER
    | IDENTIFICADOR PARIZQ parametros PARDER DOSPTS R_VOID LLAVIZQ instrucciones LLAVDER
    | IDENTIFICADOR PARIZQ PARDER LLAVIZQ instrucciones LLAVDER
    | IDENTIFICADOR PARIZQ PARDER DOSPTS R_VOID LLAVIZQ instrucciones LLAVDER
;
llamada
    : IDENTIFICADOR PARIZQ parametros_llamada PARDER 
    | IDENTIFICADOR PARIZQ PARDER 
;
parametros_llamada
    : parametros_llamada COMA expresion
    | expresion
;
//************************* PRINT ************************
fprint
    : R_PRINT PARIZQ expresion PARDER 
;
//************************* PRINT LN ************************
fprintln
    : R_PRINTLN PARIZQ expresion PARDER 
;
//************************* TO LOWER ************************
ftolower
    : R_TOLOWER PARIZQ expresion PARDER 
;
//************************* TO UPPER ************************
ftoupper
    : R_TOUPPER PARIZQ expresion PARDER 
;
//************************* ROUND ************************
fround
    : R_ROUND PARIZQ DECIMAL PARDER 
;
//************************* LENGTH ************************
flength
    : R_LENGTH PARIZQ expresion PARDER 
;
//************************* TYPEOF ************************
ftypeof
    : R_TYPEOF PARIZQ expresion PARDER 
;
//************************* TO STRING ************************
ftostring
    : R_TOSTRING PARIZQ expresion PARDER
;
//************************* TO CHAR ARRAY ************************
ftochararray
    : R_TOCHARARRAY PARIZQ expresion PARDER
;
//************************* RUN ************************
frun
    : R_RUN IDENTIFICADOR PARIZQ parametros_llamada PARDER 
    | R_RUN IDENTIFICADOR PARIZQ PARDER 
;
//*************************************************************************