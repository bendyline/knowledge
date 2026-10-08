# Source code: samples/snippets/fsharp/arrays/snippet38.fs

Complete source file; linked examples may select a region or line range.

```
let sortedArray2 = Array.sortBy (fun elem -> abs elem) [|1; 4; 8; -2; 5|]
printfn "%A" sortedArray2
```
