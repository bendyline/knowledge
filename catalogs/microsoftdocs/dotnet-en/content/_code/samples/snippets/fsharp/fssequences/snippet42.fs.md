# Source code: samples/snippets/fsharp/fssequences/snippet42.fs

Complete source file; linked examples may select a region or line range.

```
let emptySeq = Seq.empty
let nonEmptySeq = seq { 1 .. 10 }
Seq.isEmpty emptySeq |> printfn "%b"
Seq.isEmpty nonEmptySeq |> printfn "%b"
```
