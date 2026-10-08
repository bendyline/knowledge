# Source code: samples/snippets/fsharp/fssequences/snippet10.fs

Complete source file; linked examples may select a region or line range.

```
let seqFirst5MultiplesOf10 = Seq.init 5 (fun n -> n * 10)
Seq.iter (fun elem -> printf "%d " elem) seqFirst5MultiplesOf10
```
