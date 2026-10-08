# Source code: samples/snippets/fsharp/tuples/using-tuples.fsx

Complete source file; linked examples may select a region or line range.

```
let divRem a b =
   let x = a / b
   let y = a % b
   (x, y)

let sumNoCurry (a, b) = a + b

let sum a b = a + b

let addTen = sum 10
let result = addTen 95
// Result is 105.
```
