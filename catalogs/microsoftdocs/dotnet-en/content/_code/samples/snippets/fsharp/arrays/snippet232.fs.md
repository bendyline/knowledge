# Source code: samples/snippets/fsharp/arrays/snippet232.fs

Complete source file; linked examples may select a region or line range.

```
let haveEqualElement = Array.exists2 (fun elem1 elem2 -> elem1 = elem2)
printfn "%A" (haveEqualElement [| 1; 2; 3 |] [| 3; 2; 1|])
```
