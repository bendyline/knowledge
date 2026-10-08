# Source code: samples/snippets/fsharp/lists/snippet6.fs

Complete source file; linked examples may select a region or line range.

```
let sortedList2 = List.sortBy (fun elem -> abs elem) [1; 4; 8; -2; 5]
printfn "%A" sortedList2
```
