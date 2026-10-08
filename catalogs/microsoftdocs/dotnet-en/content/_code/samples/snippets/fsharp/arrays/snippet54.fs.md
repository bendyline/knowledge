# Source code: samples/snippets/fsharp/arrays/snippet54.fs

Complete source file; linked examples may select a region or line range.

```
let array1 = [| 1; 2; 3 |]
let array2 = [| 4; 5; 6 |]
let arrayAddTimesIndex = Array.mapi2 (fun i x y -> (x + y) * i) array1 array2
printfn "%A" arrayAddTimesIndex
```
