# Source code: samples/snippets/fsharp/fssequences/snippet21.fs

Complete source file; linked examples may select a region or line range.

```
let sequence = seq { 1 .. 100 }
let printSeq seq1 = Seq.iter (printf "%A ") seq1; printfn ""
let sequences3 = Seq.groupBy (fun index ->
    if (index % 2 = 0) then 0 else 1) sequence
sequences3 |> printSeq
```
