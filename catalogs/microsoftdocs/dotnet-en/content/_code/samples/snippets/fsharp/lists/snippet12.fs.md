# Source code: samples/snippets/fsharp/lists/snippet12.fs

Complete source file; linked examples may select a region or line range.

```
let avg2 = List.averageBy (fun elem -> float elem) [1 .. 10]
printfn "%f" avg2
```
