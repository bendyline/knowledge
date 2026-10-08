# Source code: samples/snippets/fsharp/lists/snippet23.fs

Complete source file; linked examples may select a region or line range.

```
let collectList = List.collect (fun x -> [for i in 1..3 -> x * i]) list1
printfn "%A" collectList
```
