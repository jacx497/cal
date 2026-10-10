/* Arithmetic only: no eval, Function constructor, or external dependencies. */
(function(root){
  'use strict';
  const operators = new Set(['+', '-', '*', '/']);
  function calculate(tokens){
    if (!tokens.length || tokens.length % 2 === 0) throw new Error('Complete the expression.');
    const values = [], additions = [];
    for(let i=0;i<tokens.length;i+=2){
      if (!/^-?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i.test(String(tokens[i]))) throw new Error('Invalid number.');
      const value=Number(tokens[i]);
      if(!Number.isFinite(value)) throw new Error('Number is too large.');
      if(!i) values.push(value);
      else {
        const op=tokens[i-1];
        if(!operators.has(op)) throw new Error('Invalid operator.');
        if(op==='*'||op==='/'){
          if(op==='/'&&value===0) throw new Error('Cannot divide by zero.');
          values[values.length-1]=op==='*'?values.at(-1)*value:values.at(-1)/value;
        }else{additions.push(op);values.push(value);}
      }
    }
    const result=values.reduce((sum,value,i)=>!i?value:additions[i-1]==='+'?sum+value:sum-value,0);
    if(!Number.isFinite(result)) throw new Error('Result is too large.');
    return Number(result.toPrecision(12));
  }
  const api={calculate,operators};
  if(typeof module!=='undefined'&&module.exports) module.exports=api;
  else root.Calculator=api;
})(typeof window!=='undefined'?window:globalThis);
