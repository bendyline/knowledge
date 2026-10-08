# Source code: samples/snippets/fsharp/lists/snippet20.fs

Complete source file; linked examples may select a region or line range.

```
let newList2 = List.map3 (fun x y z -> x + y + z) list1 list2 [2; 3; 4]
printfn "%A" newList2
```
