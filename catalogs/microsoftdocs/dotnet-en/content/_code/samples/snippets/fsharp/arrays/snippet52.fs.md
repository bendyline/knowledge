# Source code: samples/snippets/fsharp/arrays/snippet52.fs

Complete source file; linked examples may select a region or line range.

```
let array1 = [| 1; 2; 3 |]
let array2 = [| 4; 5; 6 |]
let arrayOfSums = Array.map2 (fun x y -> x + y) array1 array2
printfn "%A" arrayOfSums
```
