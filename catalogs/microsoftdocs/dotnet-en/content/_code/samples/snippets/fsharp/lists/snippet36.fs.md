# Source code: samples/snippets/fsharp/lists/snippet36.fs

Complete source file; linked examples may select a region or line range.

```
let list1 = [1; 2; 3]
let newList = List.mapi (fun i x -> (i, x)) list1
printfn "%A" newList
```
