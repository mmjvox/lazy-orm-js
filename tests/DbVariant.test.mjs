import { test } from 'uvu';
import * as assert from 'uvu/assert';
import LazyOrmWrapper from '../lib/InitDynamicLibrary.mjs';


test('doubleSend', () => {

  const maxDouble = Number.MAX_VALUE;
  const minDouble = Number.MIN_VALUE;

  let md = LazyOrmWrapper.doubleSend(maxDouble);
  assert.is(md, maxDouble);

  md = LazyOrmWrapper.doubleSend(minDouble);
  assert.is(md, minDouble);

});

test('int64Send', () => {
  
  const maxInt64 = (2n ** 63n - 1n);
  const minInt64 = (-(2n ** 63n) + 1n);
  
  let mi = LazyOrmWrapper.int64Send(maxInt64);
  assert.is(mi, maxInt64);

  mi = LazyOrmWrapper.int64Send(minInt64);
  assert.is(mi, minInt64);

});

test.run();
