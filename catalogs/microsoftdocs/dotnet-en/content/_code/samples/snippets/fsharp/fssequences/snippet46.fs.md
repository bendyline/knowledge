# Source code: samples/snippets/fsharp/fssequences/snippet46.fs

Complete source file; linked examples may select a region or line range.

```
let seq1 = [1; 2; 3]
let seq2 = [4; 5; 6]
let sumSeq = Seq.map2 (fun x y -> x + y) seq1 seq2
printfn "%A" sumSeq
```
