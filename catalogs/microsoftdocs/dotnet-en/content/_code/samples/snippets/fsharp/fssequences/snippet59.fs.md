# Source code: samples/snippets/fsharp/fssequences/snippet59.fs

Complete source file; linked examples may select a region or line range.

```
let seq1 = [ -10 .. 10 ]
Seq.nth 5 seq1
|> printfn "The fifth element: %d"
```
