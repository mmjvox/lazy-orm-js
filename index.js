const ffi = require("ffi-napi");
const path = require("path");

const libPath = path.join(__dirname, "/home/mmjvox/projects/lazy-orm-wrapper", "build", "liblazy-orm-wrapper.so");

const mylib = ffi.Library(libPath, {
  "myFunction": ["int", ["int", "int"]],
});

console.log(mylib.myFunction(2, 3)); // Call your C++ function!
