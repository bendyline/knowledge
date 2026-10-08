# Source code: samples/snippets/fsharp/fssequences/snippet47.fs

Complete source file; linked examples may select a region or line range.

```
let seq1 = [1; 2; 3]
let newSeq = Seq.mapi (fun i x -> (i, x)) seq1
printfn "%A" newSeq
```
