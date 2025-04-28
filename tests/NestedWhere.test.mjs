import NestedWhere from "../lib/NestedWhere.mjs";
import LazyOrmWrapper from "../lib/InitDynamicLibrary.mjs";


const nestedArray = [
    [
        [
         [ "AGE 1","in 1","[4,5,6,7,8] 1" ],
         "or 1-2",
         [ "AGE 2","in 2","[1,2,3,4,5] 2" ],
         ],
        "and 2-2",
        [
         [ "AGE 3","in 3","[40,50,60,70,80] 3" ],
         "or 3-4",
         [ "AGE 4","in 4","[10,20,30,40,50] 4" ],
         ]
    ],
    "AND",
    [
        ["name","like","asqar1"],
        "OR",
        ["name","like","mamad1"]
    ],
    "NOT",
    [
        ["name","like","asqar2"],
        "OR",
        ["name","like","mamad2"]
    ],
    "AND NOT",
    [
        ["name","like","asqar3"],
        "OR",
        ["name","like","mamad3"]
    ],
    ["OR","NOT"],
    [
        ["name","like","asqar4"],
        "OR",
        ["name","like","mamad4"]
    ]
];


// const parsedStructure =  NestedWhere.parse(nestedArray);
// console.log(JSON.stringify(parsedStructure));
// console.log(LazyOrmWrapper.WhereFilter_toString(parsedStructure._WhereFilter));


const nestedArray2 = [
    [
        [
         [ "AGE","in","[4,5,6,7,8]" ],
         ["or"],
         [ "AGE","in","[1,2,3,4,5]" ],
         ],
        ["and"],
        [
         [ "AGE","in","[40,50,60,70,80]" ],
         ["or"],
         [ "AGE","in","[10,20,30,40,50]" ],
         ]
    ],
    ["AND"],
    [
        ["name","like","asqar"],
        ["OR"],
        ["name","like","mamad"]
    ],
    ["NOT"],
    [
        ["name","like","asqar"],
        ["OR"],
        ["name","like","mamad"]
    ],
    ["AND NOT"],
    [
        ["name","like","asqar"],
        ["OR"],
        ["name","like","mamad"]
    ],
    ["OR","NOT"],
    [
        ["name","like","asqar"],
        ["OR"],
        ["name","like","mamad"]
    ]
];

const parsedStructure2 =  NestedWhere.parse(nestedArray2);
parsedStructure2.joinNesteds();
// console.log(parsedStructure2);
console.log(LazyOrmWrapper.WhereFilter_toString(parsedStructure2._NativeWhereFilter));