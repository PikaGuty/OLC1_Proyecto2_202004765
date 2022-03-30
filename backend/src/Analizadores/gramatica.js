/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var gramatica = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,5],$V1=[1,16],$V2=[1,17],$V3=[1,18],$V4=[1,19],$V5=[1,20],$V6=[1,21],$V7=[1,22],$V8=[1,23],$V9=[1,24],$Va=[1,25],$Vb=[1,26],$Vc=[1,14],$Vd=[1,29],$Ve=[1,15],$Vf=[5,14,15,16,17,18,20,21,22,23,24,25,26,38,42,44],$Vg=[40,41],$Vh=[2,24],$Vi=[26,32,39],$Vj=[30,33,35,39,40,41],$Vk=[30,35],$Vl=[2,35],$Vm=[1,44],$Vn=[1,49],$Vo=[2,44],$Vp=[2,12],$Vq=[1,88],$Vr=[30,33],$Vs=[2,45];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"ini":3,"instrucciones":4,"EOF":5,"instruccion":6,"declaracion":7,"inc_dec":8,"dec_vectores":9,"mod_vectores":10,"sen_if":11,"asig_solo":12,"tipo":13,"R_INT":14,"R_DOUBLE":15,"R_BOOLEAN":16,"R_CHAR":17,"R_STRING":18,"expresion":19,"ENTERO":20,"DECIMAL":21,"R_TRUE":22,"R_FALSE":23,"CADENA":24,"CARACTER":25,"IDENTIFICADOR":26,"acs_vectores":27,"casteo":28,"lista":29,"COMA":30,"listavec":31,"CORIZQ":32,"CORDER":33,"dec":34,"PTCOMA":35,"asig":36,"IGUAL":37,"PARIZQ":38,"PARDER":39,"MAS":40,"MENOS":41,"R_IF":42,"LLAVIZQ":43,"LLAVDER":44,"R_ELSE":45,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",14:"R_INT",15:"R_DOUBLE",16:"R_BOOLEAN",17:"R_CHAR",18:"R_STRING",20:"ENTERO",21:"DECIMAL",22:"R_TRUE",23:"R_FALSE",24:"CADENA",25:"CARACTER",26:"IDENTIFICADOR",30:"COMA",32:"CORIZQ",33:"CORDER",35:"PTCOMA",37:"IGUAL",38:"PARIZQ",39:"PARDER",40:"MAS",41:"MENOS",42:"R_IF",43:"LLAVIZQ",44:"LLAVDER",45:"R_ELSE"},
productions_: [0,[3,2],[3,1],[4,2],[4,1],[4,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,0],[13,1],[13,1],[13,1],[13,1],[13,1],[19,1],[19,1],[19,1],[19,1],[19,1],[19,1],[19,1],[19,1],[19,1],[29,3],[29,1],[31,5],[31,4],[7,3],[34,3],[34,1],[36,3],[36,1],[12,4],[28,4],[8,4],[8,4],[9,10],[9,15],[9,9],[9,9],[27,4],[27,7],[10,7],[10,10],[11,7],[11,11],[11,9]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 5:
 console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); 
break;
case 34:
console.log($$[$0-2]+' = '+$$[$0])
break;
case 35:
console.log($$[$0]+' = 0')
break;
case 36:
console.log($$[$0-3]+' = '+$$[$0-1])
break;
case 37:
this.$=$$[$0-3]+""+$$[$0-2]+""+$$[$0-1]+""+$$[$0]
break;
case 38: case 39:
console.log($$[$0-3]+""+$$[$0-2]+""+$$[$0-1])
break;
}
},
table: [{2:$V0,3:1,4:2,5:[1,3],6:4,7:6,8:7,9:8,10:9,11:10,12:11,13:12,14:$V1,15:$V2,16:$V3,17:$V4,18:$V5,19:13,20:$V6,21:$V7,22:$V8,23:$V9,24:$Va,25:$Vb,26:$Vc,27:27,28:28,38:$Vd,42:$Ve},{1:[3]},{5:[1,30],6:31,7:6,8:7,9:8,10:9,11:10,12:11,13:12,14:$V1,15:$V2,16:$V3,17:$V4,18:$V5,19:13,20:$V6,21:$V7,22:$V8,23:$V9,24:$Va,25:$Vb,26:$Vc,27:27,28:28,38:$Vd,42:$Ve},{1:[2,2]},o($Vf,[2,4]),o($Vf,[2,5]),o($Vf,[2,6]),o($Vf,[2,7]),o($Vf,[2,8]),o($Vf,[2,9]),o($Vf,[2,10]),o($Vf,[2,11]),{26:[1,33],34:32,36:34},{40:[1,35],41:[1,36]},o($Vg,$Vh,{32:[1,37],37:[1,38]}),{38:[1,39]},o($Vi,[2,13]),o($Vi,[2,14]),o($Vi,[2,15]),o($Vi,[2,16]),o($Vi,[2,17]),o($Vj,[2,18]),o($Vj,[2,19]),o($Vj,[2,20]),o($Vj,[2,21]),o($Vj,[2,22]),o($Vj,[2,23]),o($Vj,[2,25]),o($Vj,[2,26]),{13:40,14:$V1,15:$V2,16:$V3,17:$V4,18:$V5},{1:[2,1]},o($Vf,[2,3]),{30:[1,42],35:[1,41]},o($Vk,$Vl,{32:[1,43],37:$Vm}),o($Vk,[2,33]),{40:[1,45]},{41:[1,46]},{20:[1,47]},{19:48,20:$V6,21:$V7,22:$V8,23:$V9,24:$Va,25:$Vb,26:$Vn,27:27,28:28,38:$Vd},{19:50,20:$V6,21:$V7,22:$V8,23:$V9,24:$Va,25:$Vb,26:$Vn,27:27,28:28,38:$Vd},{39:[1,51]},o($Vf,[2,31]),{26:[1,53],36:52},{33:[1,54]},{19:55,20:$V6,21:$V7,22:$V8,23:$V9,24:$Va,25:$Vb,26:$Vn,27:27,28:28,38:$Vd},{35:[1,56]},{35:[1,57]},{33:[1,58]},{35:[1,59]},o($Vj,$Vh,{32:[1,60]}),{39:[1,61]},{19:62,20:$V6,21:$V7,22:$V8,23:$V9,24:$Va,25:$Vb,26:$Vn,27:27,28:28,38:$Vd},o($Vk,[2,32]),o($Vk,$Vl,{37:$Vm}),{32:[1,64],37:[1,63]},o($Vk,[2,34]),o($Vf,[2,38]),o($Vf,[2,39]),o($Vg,$Vo,{32:[1,66],37:[1,65]}),o($Vf,[2,36]),{20:[1,67]},{43:[1,68]},o($Vj,[2,37]),{13:69,14:$V1,15:$V2,16:$V3,17:$V4,18:$V5,32:[1,70]},{33:[1,71]},{19:72,20:$V6,21:$V7,22:$V8,23:$V9,24:$Va,25:$Vb,26:$Vn,27:27,28:28,38:$Vd},{20:[1,73]},{33:[1,74]},{2:$V0,4:75,6:4,7:6,8:7,9:8,10:9,11:10,12:11,13:12,14:$V1,15:$V2,16:$V3,17:$V4,18:$V5,19:13,20:$V6,21:$V7,22:$V8,23:$V9,24:$Va,25:$Vb,26:$Vc,27:27,28:28,38:$Vd,42:$Ve,44:$Vp},{32:[1,76]},{19:79,20:$V6,21:$V7,22:$V8,23:$V9,24:$Va,25:$Vb,26:$Vn,27:27,28:28,29:77,30:[1,80],31:78,38:$Vd},{37:[1,81]},{35:[1,82]},{33:[1,83]},o($Vj,$Vo,{32:[1,84]}),{6:31,7:6,8:7,9:8,10:9,11:10,12:11,13:12,14:$V1,15:$V2,16:$V3,17:$V4,18:$V5,19:13,20:$V6,21:$V7,22:$V8,23:$V9,24:$Va,25:$Vb,26:$Vc,27:27,28:28,38:$Vd,42:$Ve,44:[1,85]},{19:86,20:$V6,21:$V7,22:$V8,23:$V9,24:$Va,25:$Vb,26:$Vn,27:27,28:28,38:$Vd},{30:$Vq,33:[1,87]},{30:[1,90],33:[1,89]},o($Vr,[2,28]),{32:[1,91]},{13:92,14:$V1,15:$V2,16:$V3,17:$V4,18:$V5},o($Vf,[2,46]),o($Vg,$Vs,{37:[1,93]}),{20:[1,94]},o($Vf,[2,48],{45:[1,95]}),{33:[1,96]},{35:[1,97]},{19:98,20:$V6,21:$V7,22:$V8,23:$V9,24:$Va,25:$Vb,26:$Vn,27:27,28:28,38:$Vd},{35:[1,99]},{32:[1,100]},{19:79,20:$V6,21:$V7,22:$V8,23:$V9,24:$Va,25:$Vb,26:$Vn,27:27,28:28,29:101,38:$Vd},{32:[1,102]},{19:103,20:$V6,21:$V7,22:$V8,23:$V9,24:$Va,25:$Vb,26:$Vn,27:27,28:28,38:$Vd},{33:[1,104]},{11:106,42:$Ve,43:[1,105]},{35:[1,107]},o($Vf,[2,42]),o($Vr,[2,27]),o($Vf,[2,43]),{19:79,20:$V6,21:$V7,22:$V8,23:$V9,24:$Va,25:$Vb,26:$Vn,27:27,28:28,29:108,38:$Vd},{30:$Vq,33:[1,109]},{19:110,20:$V6,21:$V7,22:$V8,23:$V9,24:$Va,25:$Vb,26:$Vn,27:27,28:28,38:$Vd},{35:[1,111]},o($Vj,$Vs),{2:$V0,4:112,6:4,7:6,8:7,9:8,10:9,11:10,12:11,13:12,14:$V1,15:$V2,16:$V3,17:$V4,18:$V5,19:13,20:$V6,21:$V7,22:$V8,23:$V9,24:$Va,25:$Vb,26:$Vc,27:27,28:28,38:$Vd,42:$Ve,44:$Vp},o($Vf,[2,50]),o($Vf,[2,40]),{30:$Vq,33:[1,113]},o($Vr,[2,30]),{33:[1,114]},o($Vf,[2,47]),{6:31,7:6,8:7,9:8,10:9,11:10,12:11,13:12,14:$V1,15:$V2,16:$V3,17:$V4,18:$V5,19:13,20:$V6,21:$V7,22:$V8,23:$V9,24:$Va,25:$Vb,26:$Vc,27:27,28:28,38:$Vd,42:$Ve,44:[1,115]},o($Vr,[2,29]),{32:[1,116]},o($Vf,[2,49]),{19:117,20:$V6,21:$V7,22:$V8,23:$V9,24:$Va,25:$Vb,26:$Vn,27:27,28:28,38:$Vd},{33:[1,118]},{35:[1,119]},o($Vf,[2,41])],
defaultActions: {3:[2,2],30:[2,1]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse (input) {
    var self = this,
        stack = [0],
        tstack = [], // token stack
        vstack = [null], // semantic value stack
        lstack = [], // location stack
        table = this.table,
        yytext = '',
        yylineno = 0,
        yyleng = 0,
        recovering = 0,
        TERROR = 2,
        EOF = 1;

    var args = lstack.slice.call(arguments, 1);

    //this.reductionCount = this.shiftCount = 0;

    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    // copy state
    for (var k in this.yy) {
      if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
        sharedState.yy[k] = this.yy[k];
      }
    }

    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);

    var ranges = lexer.options && lexer.options.ranges;

    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }

    function popStack (n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }

_token_stack:
    var lex = function () {
        var token;
        token = lexer.lex() || EOF;
        // if token isn't its numeric value, convert
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    }

    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        // retreive state number from top of stack
        state = stack[stack.length - 1];

        // use default actions if available
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            // read action for current state and first input
            action = table[state] && table[state][symbol];
        }

_handle_error:
        // handle parse error
        if (typeof action === 'undefined' || !action.length || !action[0]) {
            var error_rule_depth;
            var errStr = '';

            // Return the rule stack depth where the nearest error rule can be found.
            // Return FALSE when no error recovery rule was found.
            function locateNearestErrorRecoveryRule(state) {
                var stack_probe = stack.length - 1;
                var depth = 0;

                // try to recover from error
                for(;;) {
                    // check for error recovery rule in this state
                    if ((TERROR.toString()) in table[state]) {
                        return depth;
                    }
                    if (state === 0 || stack_probe < 2) {
                        return false; // No suitable error recovery rule available.
                    }
                    stack_probe -= 2; // popStack(1): [symbol, action]
                    state = stack[stack_probe];
                    ++depth;
                }
            }

            if (!recovering) {
                // first see if there's any chance at hitting an error recovery rule:
                error_rule_depth = locateNearestErrorRecoveryRule(state);

                // Report error
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push("'"+this.terminals_[p]+"'");
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line '+(yylineno+1)+":\n"+lexer.showPosition()+"\nExpecting "+expected.join(', ') + ", got '" + (this.terminals_[symbol] || symbol)+ "'";
                } else {
                    errStr = 'Parse error on line '+(yylineno+1)+": Unexpected " +
                                  (symbol == EOF ? "end of input" :
                                              ("'"+(this.terminals_[symbol] || symbol)+"'"));
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected,
                    recoverable: (error_rule_depth !== false)
                });
            } else if (preErrorSymbol !== EOF) {
                error_rule_depth = locateNearestErrorRecoveryRule(state);
            }

            // just recovered from another error
            if (recovering == 3) {
                if (symbol === EOF || preErrorSymbol === EOF) {
                    throw new Error(errStr || 'Parsing halted while starting to recover from another error.');
                }

                // discard current lookahead and grab another
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                symbol = lex();
            }

            // try to recover from error
            if (error_rule_depth === false) {
                throw new Error(errStr || 'Parsing halted. No suitable error recovery rule available.');
            }
            popStack(error_rule_depth);

            preErrorSymbol = (symbol == TERROR ? null : symbol); // save the lookahead token
            symbol = TERROR;         // insert generic error symbol as new lookahead
            state = stack[stack.length-1];
            action = table[state] && table[state][TERROR];
            recovering = 3; // allow 3 real symbols to be shifted before reporting a new error
        }

        // this shouldn't happen, unless resolve defaults are off
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: '+state+', token: '+symbol);
        }

        switch (action[0]) {
            case 1: // shift
                //this.shiftCount++;

                stack.push(symbol);
                vstack.push(lexer.yytext);
                lstack.push(lexer.yylloc);
                stack.push(action[1]); // push state
                symbol = null;
                if (!preErrorSymbol) { // normal execution/no error
                    yyleng = lexer.yyleng;
                    yytext = lexer.yytext;
                    yylineno = lexer.yylineno;
                    yyloc = lexer.yylloc;
                    if (recovering > 0) {
                        recovering--;
                    }
                } else {
                    // error just occurred, resume old lookahead f/ before error
                    symbol = preErrorSymbol;
                    preErrorSymbol = null;
                }
                break;

            case 2:
                // reduce
                //this.reductionCount++;

                len = this.productions_[action[1]][1];

                // perform semantic action
                yyval.$ = vstack[vstack.length-len]; // default to $$ = $1
                // default location, uses first token for firsts, last for lasts
                yyval._$ = {
                    first_line: lstack[lstack.length-(len||1)].first_line,
                    last_line: lstack[lstack.length-1].last_line,
                    first_column: lstack[lstack.length-(len||1)].first_column,
                    last_column: lstack[lstack.length-1].last_column
                };
                if (ranges) {
                  yyval._$.range = [lstack[lstack.length-(len||1)].range[0], lstack[lstack.length-1].range[1]];
                }
                r = this.performAction.apply(yyval, [yytext, yyleng, yylineno, sharedState.yy, action[1], vstack, lstack].concat(args));

                if (typeof r !== 'undefined') {
                    return r;
                }

                // pop off stack
                if (len) {
                    stack = stack.slice(0,-1*len*2);
                    vstack = vstack.slice(0, -1*len);
                    lstack = lstack.slice(0, -1*len);
                }

                stack.push(this.productions_[action[1]][0]);    // push nonterminal (reduce)
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                // goto new state = table[STATE][NONTERMINAL]
                newState = table[stack[stack.length-2]][stack[stack.length-1]];
                stack.push(newState);
                break;

            case 3:
                // accept
                return true;
        }

    }

    return true;
}};
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"case-insensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:// se ignoran espacios en blanco
break;
case 1:// comentario simple línea
break;
case 2:// comentario multiple líneas
break;
case 3:return 14
break;
case 4:return 15
break;
case 5:return 16
break;
case 6:return 17
break;
case 7:return 18
break;
case 8:return 22
break;
case 9:return 23
break;
case 10:return 'R_NEW'
break;
case 11:return 42
break;
case 12:return 45
break;
case 13:return 'R_SWITCH'
break;
case 14:return 'R_CASE'
break;
case 15:return 'R_DEFAULT'
break;
case 16:return 'R_WHILE'
break;
case 17:return 'R_FOR'
break;
case 18:return 'R_DO'
break;
case 19:return 'R_BREAK'
break;
case 20:return 'R_CONTINUE'
break;
case 21:return 'R_RETURN'
break;
case 22:return 'R_VOID'
break;
case 23:return 'R_PRINT';
break;
case 24:return 'R_PRINTLN';
break;
case 25:return 'R_TOLOWER';
break;
case 26:return 'R_TOUPPER';
break;
case 27:return 'R_ROUND';
break;
case 28:return 'R_LENGTH';
break;
case 29:return 'R_TYPEOF';
break;
case 30:return 'R_TOSTRING';
break;
case 31:return 'R_TOCHARARRAY';
break;
case 32:return 'R_RUN';
break;
case 33:return 'DOSPTS';
break;
case 34:return 35;
break;
case 35:return 43;
break;
case 36:return 44;
break;
case 37:return 38;
break;
case 38:return 39;
break;
case 39:return 32;
break;
case 40:return 33;
break;
case 41:return 30;
break;
case 42:return 40;
break;
case 43:return 41;
break;
case 44:return 'POR';
break;
case 45:return 'DIV';
break;
case 46:return 'POTENCIA';
break;
case 47:return 'MODULO';
break;
case 48:return 37;
break;
case 49:return 'IGUALACION';
break;
case 50:return 'DIFERENCIACION';
break;
case 51:return 'MENORQ';
break;
case 52:return 'MENIGUALQ';
break;
case 53:return 'MAYORQ';
break;
case 54:return 'MAYIGUALQ';
break;
case 55:return 21;
break;
case 56:return 20;
break;
case 57:return 26;
break;
case 58:return 25;
break;
case 59:return 24;
break;
case 60:return 5;
break;
case 61: console.error('Este es un error léxico: ' + yy_.yytext + ', en la linea: ' + yy_.yylloc.first_line + ', en la columna: ' + yy_.yylloc.first_column); 
break;
}
},
rules: [/^(?:[ \r\t\n\s]+)/i,/^(?:[/][/].*)/i,/^(?:[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/])/i,/^(?:int\b)/i,/^(?:double\b)/i,/^(?:boolean\b)/i,/^(?:char\b)/i,/^(?:string\b)/i,/^(?:true\b)/i,/^(?:false\b)/i,/^(?:new\b)/i,/^(?:if\b)/i,/^(?:else\b)/i,/^(?:switch\b)/i,/^(?:case\b)/i,/^(?:default\b)/i,/^(?:while\b)/i,/^(?:for\b)/i,/^(?:do\b)/i,/^(?:break\b)/i,/^(?:continue\b)/i,/^(?:return\b)/i,/^(?:void\b)/i,/^(?:print\b)/i,/^(?:println\b)/i,/^(?:tolower\b)/i,/^(?:toupper\b)/i,/^(?:round\b)/i,/^(?:length\b)/i,/^(?:typeof\b)/i,/^(?:tostring\b)/i,/^(?:tochararray\b)/i,/^(?:run\b)/i,/^(?::)/i,/^(?:;)/i,/^(?:\{)/i,/^(?:\})/i,/^(?:\()/i,/^(?:\))/i,/^(?:\[)/i,/^(?:\])/i,/^(?:,)/i,/^(?:\+)/i,/^(?:-)/i,/^(?:\*)/i,/^(?:\/)/i,/^(?:\^)/i,/^(?:%)/i,/^(?:=)/i,/^(?:==)/i,/^(?:!=)/i,/^(?:<)/i,/^(?:<=)/i,/^(?:>)/i,/^(?:>=)/i,/^(?:[0-9]+(\.[0-9]+)\b)/i,/^(?:[0-9]+\b)/i,/^(?:(([a-zA-Z])[a-zA-Z0-9_]*))/i,/^(?:('((\\([\'\"\\bfnrtv]))|([^\'\\]))'))/i,/^(?:("((\\([\'\"\\bfnrtv]))|([^\"\\]+))*"))/i,/^(?:$)/i,/^(?:.)/i],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = gramatica;
exports.Parser = gramatica.Parser;
exports.parse = function () { return gramatica.parse.apply(gramatica, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}