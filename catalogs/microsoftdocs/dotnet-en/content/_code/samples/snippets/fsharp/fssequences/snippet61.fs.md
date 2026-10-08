# Source code: samples/snippets/fsharp/fssequences/snippet61.fs

Complete source file; linked examples may select a region or line range.

```
let seq1 = List.init 10 (fun index -> index.ToString())
           |> Seq.ofList
```
