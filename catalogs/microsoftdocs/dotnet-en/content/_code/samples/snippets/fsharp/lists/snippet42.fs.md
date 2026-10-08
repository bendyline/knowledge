# Source code: samples/snippets/fsharp/lists/snippet42.fs

Complete source file; linked examples may select a region or line range.

```
let list1 = [10; 20; 30]
let collectList = List.collect (fun x -> [for i in 1..3 -> x * i]) list1
printfn "%A" collectList
```
