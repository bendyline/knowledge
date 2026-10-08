# Source code: samples/snippets/fsharp/arrays/snippet71.fs

Complete source file; linked examples may select a region or line range.

```
let array1, array2, array3 = Array.unzip3 [| (1, 2,3 ); (3, 4, 5) |]
printfn "%A" array1
printfn "%A" array2
printfn "%A" array3
```
