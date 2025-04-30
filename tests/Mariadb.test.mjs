import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { MariadbLazy, DbList, LazyOp } from '../index.mjs';


test('select', () => {

    let lazyOrm = new MariadbLazy();
    lazyOrm[LazyOp.SELECT] = "student";
    lazyOrm["<<"] = ["name","age","hair","*"];
    // lazyOrm[LazyOp.PROPERTIES] = ["name","age","hair","*"];
    lazyOrm[LazyOp.GROUPBY] = ["group1","group2"];
    lazyOrm[LazyOp.ORDERBY] = ["num1","num2"];
    lazyOrm[LazyOp.LIMIT] = [11,23];
    lazyOrm[LazyOp.WHERE] = [["grade","in", DbList([1,5,7,9]) ]];
    

  assert.is(lazyOrm.queryString(), "SELECT *,`age`,`hair`,`name` FROM student WHERE (`grade` in (1,5,7,9))  GROUP BY 'group1','group2'  ORDER BY 'num1','num2'  LIMIT 11,23 ;");

});


test('insert', () => {

    let lazyOrm = new MariadbLazy();
    lazyOrm[LazyOp.INSERT]="student";
    lazyOrm["name"]="anya";
    lazyOrm["age"]= 6;
    lazyOrm["hair"]="pink";
    lazyOrm["cute"]=true;
    

  assert.is(lazyOrm.queryString(), "INSERT INTO student (`age`,`cute`,`hair`,`name`) VALUES ('6',true,'pink','anya') ;");

});

test.run();
