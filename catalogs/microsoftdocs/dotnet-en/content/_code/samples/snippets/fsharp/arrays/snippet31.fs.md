# Source code: samples/snippets/fsharp/arrays/snippet31.fs

Complete source file; linked examples may select a region or line range.

```
let array1 = [| 1 .. 10 |]
let array2 = Array.copy array1
printfn "%A\n%A" array1 array2
```
