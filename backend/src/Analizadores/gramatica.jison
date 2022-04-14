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



//********** Operadores Relacionales **********
"=="					    return 'IGUALACION';
"!="					    return 'DIFERENCIACION';
"<="					    return 'MENIGUALQ';
">="					    return 'MAYIGUALQ';
"<"					        return 'MENORQ';
">"					        return 'MAYORQ';
"!"					        return 'DIF';
"||"					    return 'OR';
"&&"					    return 'AND';

//********** OPERANDOS **********
"?"					        return 'INTERROG';
"++"					    return 'INCRE';
"--"					    return 'DECRE';
"+"					        return 'MAS';
"-"					        return 'MENOS';
"*"					        return 'POR';
"/"					        return 'DIV';
"^"					        return 'POTENCIA';
"%"					        return 'MODULO';
"="					        return 'IGUAL';


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
%left 'INTERROG' 'DOSPTS'
%left 'OR'
%left 'AND'
%right 'DIF'
%left 'IGUALACION' 'DIFERENCIACION' 'MENORQ' 'MENIGUALQ' 'MAYORQ' 'MAYIGUALQ'
%left 'MAS' 'MENOS'
%left 'DIV' 'POR' 'MODULO'
%nonassoc 'POTENCIA'
%right UMINUS
%left 'PARIZQ' 'PARDER'
%right 'INCRE' 'DECRE'

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
    | R_BREAK PTCOMA {$$= new nodo("Break",$1,this._$.first_line,@1.last_column);}
    | R_CONTINUE PTCOMA {$$= new nodo("Continue",$1,this._$.first_line,@1.last_column);}
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
    : R_INT  {$$= new nodo("Tipo","Int",this._$.first_line,@1.last_column);}
    | R_DOUBLE {$$= new nodo("Tipo","Double",this._$.first_line,@1.last_column);}
    | R_BOOLEAN {$$= new nodo("Tipo","Boolean",this._$.first_line,@1.last_column);}
    | R_CHAR {$$= new nodo("Tipo","Char",this._$.first_line,@1.last_column);}
    | R_STRING {$$= new nodo("Tipo","String",this._$.first_line,@1.last_column);}
;

//POSIBLES VALORES PARA LOS TIPOS
expresion
    //Expresiones 
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
    //PA ABAJO TIPOS DE DATOS EN SI
    | ENTERO {$$= new nodo("Expresion","Expresion",this._$.first_line,@1.last_column);$$.addHijos(new nodo("entero",$1,this._$.first_line,@1.last_column));}
    | DECIMAL {$$= new nodo("Expresion","Expresion",this._$.first_line,@1.last_column);$$.addHijos(new nodo("decimal",$1,this._$.first_line,@1.last_column));}
    | R_TRUE {$$= new nodo("Expresion","Expresion",this._$.first_line,@1.last_column);$$.addHijos(new nodo("true",$1,this._$.first_line,@1.last_column));}
    | R_FALSE {$$= new nodo("Expresion","Expresion",this._$.first_line,@1.last_column);$$.addHijos(new nodo("false",$1,this._$.first_line,@1.last_column));}
    | IDENTIFICADOR {$$= new nodo("Expresion","Expresion",this._$.first_line,@1.last_column);$$.addHijos(new nodo("id",$1,this._$.first_line,@1.last_column));}
    | CARACTER {$$= new nodo("Expresion","Expresion",this._$.first_line,@1.last_column);$$.addHijos(new nodo("caracter",$1,this._$.first_line,@1.last_column));}
    | CADENA {$$= new nodo("Expresion","Expresion",this._$.first_line,@1.last_column);
    var cad= $1.substr(0,$1.length);
    cad=cad.replace(/\\n/g,"\n");
    cad=cad.replace(/\\t/g,"\t");
    cad=cad.replace(/\\r/g,"\r");
    cad=cad.replace(/\\\\/g,"\\");
    cad=cad.replace(/\\\"/g,"\"");
    cad=cad.replace(/\\\'/g,"\'");
    $$.addHijos(new nodo("cadena",cad,this._$.first_line,@1.last_column));}
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
    | inc_dec {$$=$1}
    | terna {$$=$1}
;
//LISTA DE VALORES
lista 
    : lista COMA expresion {$1.addHijos($3); $$=$1;}
    | expresion {$$= new nodo("ListVec1","ListVec1",this._$.first_line,@1.last_column); $$.addHijos($1);}
;
listavec
    : listavec COMA CORIZQ lista CORDER {$1.addHijos($4); $$=$1;}
    | CORIZQ lista CORDER {$$= new nodo("ListVec2","ListVec2",this._$.first_line,@1.last_column); $$.addHijos($2);}
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
    : IDENTIFICADOR IGUAL expresion  {$$= new nodo("Asig","Asig"); $$.addHijos(new nodo("id",$1,this._$.first_line,@1.last_column),$3)}
;
//********************************* CASTEO ********************************
casteo
    : PARIZQ tipo PARDER expresion {$$= new nodo("Cast","Cast"); $$.addHijos($2,$4)}
;
//************************ INCREMENTO Y DECREMENTO ************************
inc_dec
    : expresion INCRE {$$= new nodo("Incr","Incr"); $$.addHijos($1)}
    | expresion DECRE {$$= new nodo("Decr","Decr"); $$.addHijos($1)}
;

//******************************** VECTORES *******************************
//DECLARACION
dec_vectores
    //TIPO 1
    : tipo IDENTIFICADOR CORIZQ CORDER IGUAL R_NEW tipo CORIZQ expresion CORDER {$$= new nodo("DecVec1","DecVec1"); $$.addHijos($1,new nodo("id",$2,this._$.first_line,@1.last_column),$7,$9)}
    | tipo IDENTIFICADOR CORIZQ CORDER CORIZQ CORDER IGUAL R_NEW tipo CORIZQ expresion CORDER CORIZQ expresion CORDER {$$= new nodo("DecVec2","DecVec2"); $$.addHijos($1,new nodo("id",$2,this._$.first_line,@1.last_column),$9,$11,$14)}
    //TIPO 2 
    | tipo IDENTIFICADOR CORIZQ CORDER IGUAL CORIZQ lista CORDER {$$= new nodo("DecVec1","DecVec1"); $$.addHijos($1,new nodo("id",$2,this._$.first_line,@1.last_column),$7)}
    | tipo IDENTIFICADOR CORIZQ CORDER CORIZQ CORDER IGUAL CORIZQ listavec CORDER {$$= new nodo("DecVec2","DecVec2"); $$.addHijos($1,new nodo("id",$2,this._$.first_line,@1.last_column),$9)}
    
    | tipo IDENTIFICADOR CORIZQ CORDER IGUAL expresion {$$= new nodo("DecVec1","DecVec1"); $$.addHijos($1,new nodo("id",$2,this._$.first_line,@1.last_column),$6)}
    | tipo IDENTIFICADOR CORIZQ CORDER CORIZQ CORDER IGUAL CORIZQ lista CORDER {$$= new nodo("DecVec1","DecVec1"); $$.addHijos($1,new nodo("id",$2,this._$.first_line,@1.last_column),$9)}
;
//ACCESO
acs_vectores
    : IDENTIFICADOR CORIZQ ENTERO CORDER {$$= new nodo("acsVec1","acsVec1"); $$.addHijos(new nodo("id",$1,this._$.first_line,@1.last_column),$3)}
    | IDENTIFICADOR CORIZQ ENTERO CORDER CORIZQ ENTERO CORDER {$$= new nodo("acsVec2","acsVec2"); $$.addHijos(new nodo("id",$1,this._$.first_line,@1.last_column),$3,$6)}
;
//MODIFICAR
mod_vectores
    : IDENTIFICADOR CORIZQ ENTERO CORDER IGUAL expresion {$$= new nodo("modVec1","modVec1"); $$.addHijos(new nodo("id",$1,this._$.first_line,@1.last_column),$3,$6)}
    | IDENTIFICADOR CORIZQ ENTERO CORDER CORIZQ ENTERO CORDER IGUAL expresion {$$= new nodo("modVec2","modVec2"); $$.addHijos(new nodo("id",$1,this._$.first_line,@1.last_column),$3,$6,$9)}
;
//************************* OPERADOR TERNARIO ************************
terna
    : expresion INTERROG expresion DOSPTS expresion {$$= new nodo("Terna","Terna"); $$.addHijos($1,$3,$5)}
;
//************************* SENTENCIA DE CONTRO IF ************************
sen_if
    : R_IF PARIZQ expresion PARDER LLAVIZQ instrucciones LLAVDER {$$= new nodo("CIf","CIf"); $$.addHijos($3,$6)}
    | R_IF PARIZQ expresion PARDER LLAVIZQ instrucciones LLAVDER R_ELSE LLAVIZQ instrucciones LLAVDER {$$= new nodo("CIf","CIf"); $8=new nodo("CElse","CElse"); $$.addHijos($3,$6,$8); $8.addHijos($10);}
    | R_IF PARIZQ expresion PARDER LLAVIZQ instrucciones LLAVDER R_ELSE sen_if {$$= new nodo("CIf","CIf"); $8=new nodo("CElse","CElse"); $$.addHijos($3,$6,$8); $8.addHijos($9);}
;
//************************* SENTENCIA DE CONTROL SWITCH ************************
sen_switch
    : R_SWITCH PARIZQ expresion PARDER LLAVIZQ list_case s_default  LLAVDER {$$= new nodo("CSwitch","CSwitch"); $$.addHijos($3,$6,$7)}
    | R_SWITCH PARIZQ expresion PARDER LLAVIZQ list_case LLAVDER {$$= new nodo("CSwitch","CSwitch"); $$.addHijos($3,$6)}
    | R_SWITCH PARIZQ expresion PARDER LLAVIZQ s_default LLAVDER {$$= new nodo("CSwitch","CSwitch"); $$.addHijos($3,$6)}
;
list_case
    : list_case s_case {$1.addHijos($2); $$=$1;}
    | s_case {$$= new nodo("ListCase","ListCase",this._$.first_line,@1.last_column); $$.addHijos($1);}
;
s_case
    : R_CASE expresion DOSPTS instrucciones {$$= new nodo("SCase","SCase"); $$.addHijos($2,$4)}
;
s_default
    : R_DEFAULT DOSPTS instrucciones {$$= new nodo("SDefault","SDefault"); $$.addHijos($3);}
;
//************************* SENTENCIA CICLICA WHILE ************************
sen_while
    : R_WHILE PARIZQ expresion PARDER LLAVIZQ instrucciones LLAVDER {$$= new nodo("SWhile","SWhile"); $$.addHijos($3,$6);}
;
//************************* SENTENCIA CICLICA FOR ************************
sen_for
    : R_FOR PARIZQ declaracion PTCOMA expresion PTCOMA inc_dec PARDER LLAVIZQ instrucciones LLAVDER {$$= new nodo("SFor","SFor"); $$.addHijos($3,$5,$7,$10);}
    | R_FOR PARIZQ asig_solo PTCOMA expresion PTCOMA inc_dec PARDER LLAVIZQ instrucciones LLAVDER {$$= new nodo("SFor","SFor"); $$.addHijos($3,$5,$7,$10);}
;
//************************* SENTENCIA CICLICA DO WHILE ************************
sen_dowhile
    : R_DO LLAVIZQ instrucciones LLAVDER R_WHILE PARIZQ expresion PARDER {$$= new nodo("SDoWhile","SDoWhile"); $$.addHijos($3,$7);}
;
//************************* SENTENCIA RETURN ************************
sen_return
    : R_RETURN expresion {$$= new nodo("SReturn","SReturn"); $$.addHijos($2);}
;
//************************* FUNCIONES ************************
funcion
    : IDENTIFICADOR PARIZQ parametros PARDER DOSPTS tipo LLAVIZQ instrucciones LLAVDER {$$= new nodo("SFuncion","SFuncion"); $$.addHijos(new nodo("id",$1,this._$.first_line,@1.last_column),$3,$6,$8);}
    | IDENTIFICADOR PARIZQ PARDER DOSPTS tipo LLAVIZQ instrucciones LLAVDER {$$= new nodo("SFuncion","SFuncion"); $$.addHijos(new nodo("id",$1,this._$.first_line,@1.last_column),$5,$7);}
;

parametros 
    : parametros COMA parmetro {$1.addHijos($3); $$=$1;}
    | parmetro {$$= new nodo("FParametros","FParametros");  $$.addHijos($1)}
    | 
;

parmetro 
    : tipo IDENTIFICADOR {$$= new nodo("FPmt","FPmt");  $$.addHijos($1,new nodo("id",$2,this._$.first_line,@1.last_column))}
;
//************************* METODOS ************************
metodos
    : IDENTIFICADOR PARIZQ parametros PARDER LLAVIZQ instrucciones LLAVDER {$$= new nodo("SMetodo","SMetodo"); $$.addHijos(new nodo("id",$1,this._$.first_line,@1.last_column),$3,$6);}
    | IDENTIFICADOR PARIZQ parametros PARDER DOSPTS R_VOID LLAVIZQ instrucciones LLAVDER {$$= new nodo("SMetodo","SMetodo"); $$.addHijos(new nodo("id",$1,this._$.first_line,@1.last_column),$3,$8);}
    | IDENTIFICADOR PARIZQ PARDER LLAVIZQ instrucciones LLAVDER {$$= new nodo("SMetodo","SMetodo"); $$.addHijos(new nodo("id",$1,this._$.first_line,@1.last_column),$5);}
    | IDENTIFICADOR PARIZQ PARDER DOSPTS R_VOID LLAVIZQ instrucciones LLAVDER {$$= new nodo("SMetodo","SMetodo"); $$.addHijos(new nodo("id",$1,this._$.first_line,@1.last_column),$7);}
;
llamada
    : IDENTIFICADOR PARIZQ PARDER  {$$= new nodo("SLlamada","SLlamada"); $$.addHijos(new nodo("id",$1,this._$.first_line,@1.last_column));}
    | IDENTIFICADOR PARIZQ parametros_llamada PARDER {$$= new nodo("SLlamada","SLlamada"); $$.addHijos(new nodo("id",$1,this._$.first_line,@1.last_column),$3);}
;
parametros_llamada
    : parametros_llamada COMA expresion {$1.addHijos($3); $$=$1;}
    | expresion {$$= new nodo("FParametrosLL","FParametrosLL");  $$.addHijos($1)}
;
//************************* PRINT ************************
fprint
    : R_PRINT PARIZQ expresion PARDER  {$$= new nodo("FPrint","FPrint"); $$.addHijos($3)}
;
//************************* PRINT LN ************************
fprintln
    : R_PRINTLN PARIZQ expresion PARDER {$$= new nodo("FPrintln","FPrintln"); $$.addHijos($3)}
;
//************************* TO LOWER ************************
ftolower
    : R_TOLOWER PARIZQ expresion PARDER {$$= new nodo("FToLower","FToLower"); $$.addHijos($3)}
;
//************************* TO UPPER ************************
ftoupper
    : R_TOUPPER PARIZQ expresion PARDER {$$= new nodo("FToUpper","FToUpper"); $$.addHijos($3)}
;
//************************* ROUND ************************
fround
    : R_ROUND PARIZQ expresion PARDER {$$= new nodo("FRound","FRound"); $$.addHijos($3)}
;
//************************* LENGTH ************************
flength
    : R_LENGTH PARIZQ expresion PARDER {$$= new nodo("FLength","FLength"); $$.addHijos($3)}
;
//************************* TYPEOF ************************
ftypeof
    : R_TYPEOF PARIZQ expresion PARDER {$$= new nodo("FTypeOf","FTypeOf"); $$.addHijos($3)}
;
//************************* TO STRING ************************
ftostring
    : R_TOSTRING PARIZQ expresion PARDER {$$= new nodo("FToString","FToString"); $$.addHijos($3)}
;
//************************* TO CHAR ARRAY ************************
ftochararray
    : R_TOCHARARRAY PARIZQ expresion PARDER {$$= new nodo("FToCharArray","FToCharArray"); $$.addHijos($3)}
;
//************************* RUN ************************
frun
    : R_RUN llamada {$$= new nodo("FRun","FRun"); $$.addHijos($2)}
;
//*************************************************************************