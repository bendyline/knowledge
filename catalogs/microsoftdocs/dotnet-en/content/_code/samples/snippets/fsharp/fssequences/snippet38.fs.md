# Source code: samples/snippets/fsharp/fssequences/snippet38.fs

Complete source file; linked examples may select a region or line range.

```
let sumSeq sequence1 = Seq.fold (fun acc elem -> acc + elem) 0 sequence1
Seq.init 10 (fun index -> index * index)
|> sumSeq
|> printfn "The sum of the elements is %d."
```
