# Source code: samples/snippets/fsharp/lang-ref-2/snippet5202.fs

Complete source file; linked examples may select a region or line range.

```
let seq1 = seq { for i in 1 .. 10 -> (i, i*i) }
for (a, asqr) in seq1 do
  printfn "%d squared is %d" a asqr
```
