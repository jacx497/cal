'use strict';
const {calculate,operators}=window.Calculator;
const result=document.querySelector('#result'),expression=document.querySelector('#expression'),status=document.querySelector('#status');
let tokens=['0'],completed=false,failed=false;
const symbol={'*':'×','/':'÷','-':'−','+':'+'};
function render(){
  expression.textContent=tokens.length>1?tokens.map(t=>symbol[t]||t).join(' '):'Ready when you are';
  result.textContent=operators.has(tokens.at(-1))?tokens.at(-2):tokens.at(-1);
  status.textContent='Make room for a new thought.';
  document.querySelectorAll('[data-operator]').forEach(key=>key.setAttribute('aria-pressed',String(key.dataset.operator===tokens.at(-1))));
  if(tokens.length>1&&!operators.has(tokens.at(-1))){try{status.textContent='= '+calculate(tokens);}catch(error){status.textContent=error.message;}}
}
function clear(){tokens=['0'];completed=false;failed=false;}
function dispatch(action,value){
  if(action==='clear'){clear();render();return;}
  if(failed) clear();
  let last=tokens.at(-1);
  const isOperator=operators.has(last);
  if(action==='digit'||action==='decimal'){
    if(completed){clear();last='0';}
    const input=action==='decimal'?'.':value;
    if(isOperator) tokens.push(input==='.'?'0.':input);
    else if(!(input==='.'&&last.includes('.'))&&last.replace(/[^0-9]/g,'').length<12){
      if(last.includes('e')) tokens[tokens.length-1]=input==='.'?'0.':input;
      else tokens[tokens.length-1]=last==='0'&&input!=='.'?input:last==='-0'&&input!=='.'?'-'+input:last+input;
    }
  }else if(action==='operator'){
    completed=false;
    if(isOperator) tokens[tokens.length-1]=value;
    else if(tokens.length<99) tokens.push(value);
  }else if(action==='sign'){
    completed=false;
    if(isOperator) tokens.push('-0');
    else tokens[tokens.length-1]=last.startsWith('-')?last.slice(1):'-'+last;
  }else if(action==='percent'){
    completed=false;
    if(!isOperator) tokens[tokens.length-1]=String(Number((Number(last)/100).toPrecision(12)));
  }else if(action==='backspace'){
    if(completed) clear();
    else if(isOperator) tokens.pop();
    else{tokens[tokens.length-1]=last.includes('e')?'0':last.slice(0,-1);if(!tokens.at(-1)||tokens.at(-1)==='-')tokens[tokens.length-1]='0';}
  }else if(action==='equals'){
    if(isOperator){status.textContent='Add a number to finish.';return;}
    try{
      const previous=tokens.map(t=>symbol[t]||t).join(' '),answer=calculate(tokens);
      tokens=[String(answer)];completed=true;render();expression.textContent=previous+' =';status.textContent='A little clarity. There it is.';return;
    }catch(error){result.textContent='Oops';status.textContent=error.message;failed=true;return;}
  }
  render();
}
document.querySelectorAll('.key').forEach(key=>key.addEventListener('click',()=>{
  if(key.dataset.digit!==undefined)dispatch('digit',key.dataset.digit);
  else if(key.dataset.operator)dispatch('operator',key.dataset.operator);
  else dispatch(key.dataset.action);
}));
document.addEventListener('keydown',event=>{
  if(event.ctrlKey||event.metaKey||event.altKey||/^(INPUT|TEXTAREA|SELECT)$/.test(event.target.tagName))return;
  if(event.target.closest('button, a')&&(event.key==='Enter'||event.key===' '))return;
  const key=event.key;
  let action,value;
  if(/^\d$/.test(key)){action='digit';value=key;}
  else if(operators.has(key)){action='operator';value=key;}
  else action={'.':'decimal',',':'decimal',Enter:'equals','=':'equals',Escape:'clear',Delete:'clear',Backspace:'backspace','%':'percent'}[key];
  if(!action)return;
  event.preventDefault();dispatch(action,value);
});
render();
