# Source code: samples/snippets/fsharp/fssequences/snippet13.fs

Complete source file; linked examples may select a region or line range.

```
let seqInfinite =
    Seq.initInfinite (fun index ->
        let n = float (index + 1)
        1.0 / (n * n * (if ((index + 1) % 2 = 0) then 1.0 else -1.0)))

printfn "%A" seqInfinite
```
