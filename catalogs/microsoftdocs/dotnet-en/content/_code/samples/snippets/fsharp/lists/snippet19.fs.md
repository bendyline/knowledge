# Source code: samples/snippets/fsharp/lists/snippet19.fs

Complete source file; linked examples may select a region or line range.

```
let list1 = [1; 2; 3]
let list2 = [4; 5; 6]
let sumList = List.map2 (fun x y -> x + y) list1 list2
printfn "%A" sumList
```
