# Source code: samples/snippets/fsharp/arrays/snippet242.fs

Complete source file; linked examples may select a region or line range.

```
let allEqual = Array.forall2 (fun elem1 elem2 -> elem1 = elem2)
printfn "%A" (allEqual [| 1; 2 |] [| 1; 2 |])
printfn "%A" (allEqual [| 1; 2 |] [| 2; 1 |])
```
