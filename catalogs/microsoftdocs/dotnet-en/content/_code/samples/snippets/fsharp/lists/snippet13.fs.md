# Source code: samples/snippets/fsharp/lists/snippet13.fs

Complete source file; linked examples may select a region or line range.

```
let list1 = [ 1; 2; 3 ]
let list2 = [ -1; -2; -3 ]
let listZip = List.zip list1 list2
printfn "%A" listZip
```
