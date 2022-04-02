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
    funcion nodo(etiqueta, valor, fila, columna){
        this.etiqueta=etiqueta;
        this.valor=valor;
        this.fila=fila;
        this.columna=columna;

        this.hijos=[];
        this.addHijos=addHijos();
        this.getHijos=getHijos();

        function addHijos(){
            for(var i=0; i<arguments.length;i++){
                this.hijos.push(arguments[i]);
                if(arguments[i]!=null){
                    arguments[i].padre=this;
                }
            }
        }

        funcion getHijos(pos){
            if (pos>this.hijos.length-1) return null;
            return this.hijos[pos]
        }
    }
}

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
    : instrucciones EOF
    | EOF
;

instrucciones
    : instrucciones instruccion
    | instruccion
    | error { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); } 
;

//############### INSTRUCCIONES ###############
instruccion
    : declaracion
    | inc_dec
    | dec_vectores
    | mod_vectores
    | sen_if
    | asig_solo
    | sen_switch
    | sen_while
    | sen_for
    | sen_dowhile
    | sen_return
    | R_BREAK PTCOMA
    | R_CONTINUE PTCOMA
    | metodos
    | funcion
    | llamada
    | fprint
    | fprintln
    | frun
    | 
;
//#############################################

//TIPOS DE DATOS
tipo 
    : R_INT
    | R_DOUBLE
    | R_BOOLEAN
    | R_CHAR
    | R_STRING
;


//POSIBLES VALORES PARA LOS TIPOS
expresion
    : ENTERO
    | DECIMAL
    | R_TRUE
    | R_FALSE
    | CADENA
    | CARACTER
    | IDENTIFICADOR //PA ABAJO OTRAS COMBINACIONES
    | acs_vectores
    | casteo
    | ftolower
    | ftoupper
    | fround
    | flength
    | ftypeof
    | ftostring
    | ftochararray
    | llamada_sin
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
    : tipo dec PTCOMA 
;

dec
    : dec COMA asig
    | asig
;

asig
    : IDENTIFICADOR IGUAL expresion {console.log($1+' = '+$3)}
    | IDENTIFICADOR {console.log($1+' = 0')}
;

asig_solo
    : IDENTIFICADOR IGUAL expresion PTCOMA {console.log($1+' = '+$3)}
;

//********************************* CASTEO ********************************
casteo
    : PARIZQ tipo PARDER expresion {$$=$1+""+$2+""+$3+""+$4}
;

//************************ INCREMENTO Y DECREMENTO ************************
inc_dec
    : expresion MAS MAS PTCOMA{console.log($1+""+$2+""+$3)}
    | expresion MENOS MENOS PTCOMA{console.log($1+""+$2+""+$3)}
;

inc_decf
    : expresion MAS MAS{console.log($1+""+$2+""+$3)}
    | expresion MENOS MENOS{console.log($1+""+$2+""+$3)}
;

//******************************** VECTORES *******************************
//DECLARACION
dec_vectores
    //TIPO 1
    : tipo IDENTIFICADOR CORIZQ CORDER IGUAL tipo CORIZQ expresion CORDER PTCOMA
    | tipo IDENTIFICADOR CORIZQ CORDER CORIZQ CORDER IGUAL tipo CORIZQ expresion CORDER CORIZQ expresion CORDER PTCOMA
    //TIPO 2 
    | tipo IDENTIFICADOR CORIZQ CORDER IGUAL CORIZQ lista CORDER PTCOMA
    | tipo IDENTIFICADOR CORIZQ CORDER CORIZQ CORDER IGUAL CORIZQ listavec CORDER PTCOMA
    
    | tipo IDENTIFICADOR CORIZQ CORDER IGUAL expresion PTCOMA
    | tipo IDENTIFICADOR CORIZQ CORDER CORIZQ CORDER IGUAL CORIZQ lista CORDER PTCOMA
;

//ACCESO
acs_vectores
    : IDENTIFICADOR CORIZQ ENTERO CORDER
    | IDENTIFICADOR CORIZQ ENTERO CORDER CORIZQ ENTERO CORDER
;

//MODIFICAR
mod_vectores
    : IDENTIFICADOR CORIZQ ENTERO CORDER IGUAL expresion PTCOMA
    | IDENTIFICADOR CORIZQ ENTERO CORDER CORIZQ ENTERO CORDER IGUAL expresion PTCOMA
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
    : R_FOR PARIZQ declaracion expresion PTCOMA inc_decf PARDER LLAVIZQ instrucciones LLAVDER
    | R_FOR PARIZQ asig_solo expresion PTCOMA inc_decf PARDER LLAVIZQ instrucciones LLAVDER
    
;

//************************* SENTENCIA CICLICA DO WHILE ************************
sen_dowhile
    : R_DO LLAVIZQ instrucciones LLAVDER R_WHILE PARIZQ expresion PARDER PTCOMA
;

//************************* SENTENCIA RETURN ************************
sen_return
    : R_RETURN expresion PTCOMA
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
    : IDENTIFICADOR PARIZQ parametros_llamada PARDER PTCOMA
    | IDENTIFICADOR PARIZQ PARDER PTCOMA
;

llamada_sin
    : IDENTIFICADOR PARIZQ parametros_llamada PARDER 
    | IDENTIFICADOR PARIZQ PARDER
;

parametros_llamada
    : parametros_llamada COMA expresion
    | expresion
;

//************************* PRINT ************************
fprint
    : R_PRINT PARIZQ expresion PARDER PTCOMA
;
//************************* PRINT LN ************************
fprintln
    : R_PRINTLN PARIZQ expresion PARDER PTCOMA
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
    : R_RUN IDENTIFICADOR PARIZQ parametros_llamada PARDER PTCOMA
    | R_RUN IDENTIFICADOR PARIZQ PARDER PTCOMA
;
//*************************************************************************
