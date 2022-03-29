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

//********** Caracteres **********
":"					        return 'DOSPTS';
";"					        return 'PTCOMA';
"{"					        return 'LLAVIZQ';
"}"					        return 'LLAVDER';
"("					        return 'PARIZQ';
")"					        return 'PARDER';
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



"imprimir"			return 'RIMPRIMIR';



<<EOF>>				return 'EOF';
.					{ console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }

/lex

%start ini

%% /* Definición de la gramática */

ini
    : instrucciones EOF
    
;

instrucciones
    : instrucciones instruccion
    | instruccion
    | error { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); } 
;

instruccion
    : declaracion
    | inc_dec
    | EOF
;

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
    | IDENTIFICADOR IGUAL casteo {console.log($1+' = '+$3)}
    | IDENTIFICADOR {console.log($1+' = 0')}
;
//*************************************************************************

//********************************* CASTEO ********************************
casteo
    : PARIZQ tipo PARDER expresion {$$=$1+""+$2+""+$3+""+$4}
;
//*************************************************************************

//************************ INCREMENTO Y DECREMENTO ************************
inc_dec
    : expresion MAS MAS PTCOMA{console.log($1+""+$2+""+$3)}
    | expresion MENOS MENOS PTCOMA{console.log($1+""+$2+""+$3)}
;
//*************************************************************************