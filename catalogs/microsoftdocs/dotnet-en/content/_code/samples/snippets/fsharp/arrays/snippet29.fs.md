# Source code: samples/snippets/fsharp/arrays/snippet29.fs

Complete source file; linked examples may select a region or line range.

```
let avg2 = Array.averageBy (fun elem -> float elem) [|1 .. 10|]
printfn "%f" avg2
```
