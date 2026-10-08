# Source code: samples/snippets/fsharp/lists/snippet18.fs

Complete source file; linked examples may select a region or line range.

```
let list1 = [1; 2; 3]
let newList = List.map (fun x -> x + 1) list1
printfn "%A" newList
```
