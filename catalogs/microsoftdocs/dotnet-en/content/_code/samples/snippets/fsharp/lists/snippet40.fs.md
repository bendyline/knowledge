# Source code: samples/snippets/fsharp/lists/snippet40.fs

Complete source file; linked examples may select a region or line range.

```
let list1 = [ 1; 2; 3 ]
let list2 = [ -1; -2; -3 ]
let list3 = [ 0; 0; 0]
let listZip3 = List.zip3 list1 list2 list3
printfn "%A" listZip3
```
