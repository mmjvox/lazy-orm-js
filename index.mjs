// import { dlopen } from "@xan105/ffi/koffi";

// export const LazyOrm = dlopen("/home/mmjvox/projects/lazy-orm-wrapper/build/liblazy-orm-wrapper", {
//   myFunction: {
//     result: "int",
//     parameters: [ "int","int" ]
//   },
//   libVersion: {
//     result: "string",
//     parameters: []
//   },
//   wrapperVersion: {
//     result: "string",
//     parameters: []
//   },
//   freeString: {
//     result: "void",
//     parameters: [ "string" ]
//   },
//   MariadbLazy_create: {
//     result: "pointer",
//     parameters: []
//   },
//   MariadbLazy_destroy: {
//     result: "void",
//     parameters: ["pointer"]
//   },
//   MariadbLazy_setTabeName: {
//     result: "void",
//     parameters: ["pointer", "string"]
//   },
//   MariadbLazy_setQueryType: {
//     result: "void",
//     parameters: ["pointer", "int"]
//   },
//   MariadbLazy_setProperty: {
//     result: "void",
//     parameters: ["pointer", "string"]
//   },
//   MariadbLazy_setProperty_null: {
//     result: "void",
//     parameters: ["pointer", "string"]
//   },
//   MariadbLazy_setProperty_bool: {
//     result: "void",
//     parameters: ["pointer", "string", "bool"]
//   },
//   MariadbLazy_setProperty_string: {
//     result: "void",
//     parameters: ["pointer", "string", "string"]
//   },
//   MariadbLazy_setProperty_ull: {
//     result: "void",
//     parameters: ["pointer", "string", "ulonglong"]
//   },
//   MariadbLazy_setProperty_ll: {
//     result: "void",
//     parameters: ["pointer", "string", "longlong"]
//   },
//   MariadbLazy_setProperty_double: {
//     result: "void",
//     parameters: ["pointer", "string", "double"]
//   },
//   // MariadbLazy_setProperty_ld: {
//   //   result: "void",
//   //   parameters: ["pointer", "string", "double"]
//   // },
//   doubleSend: {
//     result: "double",
//     parameters: ["double"]
//   },
//   int64Send: {
//     result: "longlong",
//     parameters: ["longlong"]
//   },
//   MariadbLazy_queryString: {
//     result: "string",
//     parameters: ["pointer"]
//   }
// });

// export const Query = {
//   UNDEFINED : -1,
//   INIT      : 0,
//   INSERT    : 10,
//   SELECT    : 11,
//   UPDATE    : 12,
//   DELETE    : 13,
//   INSERT_UPDATE: 14,
//   BULK_INSERT: 15,
//   INSERT_IGNORE: 16,
//   BULK_UPDATE  : 17
//   //TODO: BATCH_INSERT_UPDATE
// };


// var aaa = lazyOrm.myFunction(1, 2);

// console.log(aaa);


// console.log("lazyOrm.libVersion:",lazyOrm.libVersion());
// console.log("lazyOrm.wrapperVersion:",lazyOrm.wrapperVersion());



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
