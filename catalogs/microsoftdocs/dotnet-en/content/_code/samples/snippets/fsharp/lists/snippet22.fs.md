# Source code: samples/snippets/fsharp/lists/snippet22.fs

Complete source file; linked examples may select a region or line range.

```
let listAddTimesIndex = List.mapi2 (fun i x y -> (x + y) * i) list1 list2
printfn "%A" listAddTimesIndex
```
