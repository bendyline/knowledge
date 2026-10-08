# Source code: samples/snippets/fsharp/arrays/snippet241.fs

Complete source file; linked examples may select a region or line range.

```
let allPositive = Array.forall (fun elem -> elem > 0)
printfn "%A" (allPositive [| 0; 1; 2; 3 |])
printfn "%A" (allPositive [| 1; 2; 3 |])
```
