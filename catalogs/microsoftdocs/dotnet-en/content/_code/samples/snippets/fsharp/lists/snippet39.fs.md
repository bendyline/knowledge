# Source code: samples/snippets/fsharp/lists/snippet39.fs

Complete source file; linked examples may select a region or line range.

```
let listA, listB, listC = List.unzip3 [(1,2,3); (4,5,6)]
printfn "%A %A %A" listA listB listC
```
