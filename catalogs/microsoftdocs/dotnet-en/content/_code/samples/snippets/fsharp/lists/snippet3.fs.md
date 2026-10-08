# Source code: samples/snippets/fsharp/lists/snippet3.fs

Complete source file; linked examples may select a region or line range.

```
let isAllZeroes list = List.forall (fun elem -> elem = 0.0) list
printfn "%b" (isAllZeroes [0.0; 0.0])
printfn "%b" (isAllZeroes [0.0; 1.0])
```
