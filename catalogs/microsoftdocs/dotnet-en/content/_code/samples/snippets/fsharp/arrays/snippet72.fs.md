# Source code: samples/snippets/fsharp/arrays/snippet72.fs

Complete source file; linked examples may select a region or line range.

```
let array1 = [| 1; 2; 3 |]
let array2 = [| -1; -2; -3 |]
let arrayZip = Array.zip array1 array2
printfn "%A" arrayZip
```
