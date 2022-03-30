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


//********** Expresiones **********
[0-9]+("."[0-9]+)\b  	    return 'DECIMAL';
[0-9]+\b				    return 'ENTERO';
{identificador}	            return 'IDENTIFICADOR';
{caracter}                  return 'CARACTER';
{cadena}                    return 'CADENA';


<<EOF>>				return 'EOF';
.					{ console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }

/lex

%start ini

%% /* Definición de la gramática */

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

//******************************** VECTORES *******************************
//DECLARACION
dec_vectores
    //TIPO 1
    : tipo IDENTIFICADOR CORIZQ CORDER IGUAL tipo CORIZQ expresion CORDER PTCOMA
    | tipo IDENTIFICADOR CORIZQ CORDER CORIZQ CORDER IGUAL tipo CORIZQ expresion CORDER CORIZQ expresion CORDER PTCOMA
    //TIPO 2 
    | tipo IDENTIFICADOR CORIZQ CORDER IGUAL CORIZQ lista CORDER PTCOMA
    | tipo IDENTIFICADOR CORIZQ CORDER IGUAL CORIZQ listavec CORDER PTCOMA
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

//*************************************************************************