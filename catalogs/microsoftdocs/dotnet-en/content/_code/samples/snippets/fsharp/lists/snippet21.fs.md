# Source code: samples/snippets/fsharp/lists/snippet21.fs

Complete source file; linked examples may select a region or line range.

```
let newListAddIndex = List.mapi (fun i x -> x + i) list1
printfn "%A" newListAddIndex
```
