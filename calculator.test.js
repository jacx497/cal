const test=require('node:test'),assert=require('node:assert/strict');
const {calculate}=require('./calculator.js');
test('arithmetic and precedence',()=>{
 assert.equal(calculate(['12','+','7']),19);assert.equal(calculate(['12','-','7']),5);
 assert.equal(calculate(['6','*','7']),42);assert.equal(calculate(['9','/','4']),2.25);
 assert.equal(calculate(['2','+','3','*','4']),14);assert.equal(calculate(['20','/','5','*','2','-','3']),5);
});
test('decimals, negatives, scientific numbers',()=>{
 assert.equal(calculate(['0.1','+','0.2']),0.3);assert.equal(calculate(['-5','*','-2']),10);assert.equal(calculate(['1e-7','+','2e-7']),3e-7);
});
test('reject invalid input and unsafe results',()=>{
 for(const tokens of [[],['1','+'],['NaN'],['2','?','3'],['1','/','0'],['1e308','*','1e308'],['alert(1)']])assert.throws(()=>calculate(tokens));
});
