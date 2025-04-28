import  {LazyOp} from "./lib/InitDynamicLibrary.mjs";
import MariadbLazy from './lib/MariadbLazy.mjs';
import DbList from './lib/DbList.mjs';

export {LazyOp, MariadbLazy, DbList};


// let MariadbLazy = lazyOrm.MariadbLazy_create();
// lazyOrm.MariadbLazy_setTabeName(MariadbLazy, "table1"); 
// lazyOrm.MariadbLazy_setQueryType(MariadbLazy, Query.SELECT); 
// sendToLazyOrmCpp(MariadbLazy, "key1", 42);                 // int32
// sendToLazyOrmCpp(MariadbLazy, "key2", 3.14);               // double
// sendToLazyOrmCpp(MariadbLazy, "key3", null);               // nullptr
// sendToLazyOrmCpp(MariadbLazy, "key4", true);               // bool
// sendToLazyOrmCpp(MariadbLazy, "key5", "C++ compatible!");  // string
// sendToLazyOrmCpp(MariadbLazy, "key6", 2 ** 33);            // int64

// let queryString = lazyOrm.MariadbLazy_queryString(MariadbLazy);
// console.log(queryString);

// lazyOrm.MariadbLazy_setQueryType(MariadbLazy, Query.INSERT); 
// queryString = lazyOrm.MariadbLazy_queryString(MariadbLazy);
// console.log(queryString);



// console.log("\n--- TEST: Numeric Range 3 ---\n");

// const testCases = [
//   { key: "max_safe_int", val: Number.MAX_SAFE_INTEGER }, // 2^53 - 1
//   { key: "min_safe_int", val: Number.MIN_SAFE_INTEGER }, // -2^53 + 1
//   { key: "max_uint32", val: 0xFFFFFFFF },                // 32-bit max
//   { key: "overflow_uint32", val: 0xFFFFFFFF + 1 },       // > 32-bit → should go to int64
//   { key: "max_double", val: Number.MAX_VALUE },          // Max double precision
//   { key: "min_positive", val: Number.MIN_VALUE },        // Smallest positive double
//   { key: "negative_large", val: -(2n ** 63n) + 1n },        // Large negative (close to min int64)
//   { key: "positive_large", val: 2n ** 63n - 1n },         // Large positive (close to max int64)
//   { key: "negative", val: -123456789 },
//   { key: "float_edge", val: 1.7976931348623157e+308 },   // Max double again
//   { key: "subnormal", val: 5e-324 },                     // Smallest subnormal double
// ];

// for (const { key, val } of testCases) {
//   try {
//     // If BigInt, convert to Number safely (precision may be lost)
//     const v = typeof val === "bigint" ? Number(val) : val;
//     console.log(`Sending ${key}:`, v);
//     sendToLazyOrmCpp(MariadbLazy, key, v);
//   } catch (e) {
//     console.error(`Error sending ${key}:`, e);
//   }
// }

// console.log("\nQuery string after test cases:");
// queryString = lazyOrm.MariadbLazy_queryString(MariadbLazy);
// console.log(queryString);

// // lazyOrm.freeString(queryString);
// lazyOrm.MariadbLazy_destroy(MariadbLazy);
