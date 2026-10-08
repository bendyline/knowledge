# Source code: samples/snippets/fsharp/arrays/snippet70.fs

Complete source file; linked examples may select a region or line range.

```
let array1, array2 = Array.unzip [| (1, 2); (3, 4) |]
printfn "%A" array1
printfn "%A" array2
```
