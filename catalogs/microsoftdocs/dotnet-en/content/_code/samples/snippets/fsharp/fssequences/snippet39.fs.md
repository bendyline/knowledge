# Source code: samples/snippets/fsharp/fssequences/snippet39.fs

Complete source file; linked examples may select a region or line range.

```
// This function can be used on any sequence, so the same function
// works with both lists and arrays.
let allPositive coll = Seq.forall (fun elem -> elem > 0) coll
printfn "%A" (allPositive [| 0; 1; 2; 3 |])
printfn "%A" (allPositive [ 1; 2; 3 ])
```
