import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { MariadbLazy, DbList, LazyOp } from '../index.mjs';



let lazyOrm = new MariadbLazy();
lazyOrm[LazyOp.SELECT] = "student";
lazyOrm["<<"] = ["name","age","hair","*"];
// lazyOrm[LazyOp.Properties] = ["name","age","hair","*"];
lazyOrm[LazyOp.GROUPBY] = ["group1","group2"];
lazyOrm[LazyOp.ORDERBY] = ["num1","num2"];
lazyOrm[LazyOp.LIMIT] = [11,23];
lazyOrm[LazyOp.WHERE] = [["grade","in", DbList([1,5,7,9]) ]];

console.log(lazyOrm.queryString());


// test('doubleSend', () => {

//   const maxDouble = Number.MAX_VALUE;
//   const minDouble = Number.MIN_VALUE;

//   let md = LazyOrmWrapper.doubleSend(maxDouble);
//   assert.is(md, maxDouble);

//   md = LazyOrmWrapper.doubleSend(minDouble);
//   assert.is(md, minDouble);

// });

// test.run();
