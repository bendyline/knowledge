# Source code: samples/snippets/fsharp/arrays/snippet30.fs

Complete source file; linked examples may select a region or line range.

```
let array1 = [| 1 .. 10 |]
let array2 = Array.zeroCreate 20
// Copy 4 elements from index 3 of array1 to index 5 of array2.
Array.blit array1 3 array2 5 4
printfn "%A" array2
```
