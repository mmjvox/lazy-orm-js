import { test } from 'uvu';
import * as assert from 'uvu/assert';
import MariadbLazy from '../lib/MariadbLazy.mjs';
import {LazyOrmQuery, LazyOrmProperties, LazyOrmFilter, LazyOrmWhere} from '../lib/InitDynamicLibrary.mjs';



let lazyOrm = new MariadbLazy();
lazyOrm[LazyOrmQuery.SELECT] = "student";
lazyOrm["<<"] = ["name","age","hair","*"];
// lazyOrm[LazyOrmProperties] = ["name","age","hair","*"];
lazyOrm[LazyOrmFilter.GROUPBY] = ["group1","group2"];
lazyOrm[LazyOrmFilter.ORDERBY] = ["num1","num2"];
lazyOrm[LazyOrmFilter.LIMIT] = [11,23];

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
