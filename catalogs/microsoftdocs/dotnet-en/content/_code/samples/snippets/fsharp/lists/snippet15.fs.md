# Source code: samples/snippets/fsharp/lists/snippet15.fs

Complete source file; linked examples may select a region or line range.

```
let lists = List.unzip [(1,2); (3,4)]
printfn "%A" lists
printfn "%A %A" (fst lists) (snd lists)
```
