# Source code: samples/snippets/fsharp/lang-ref-1/snippet1704.fs

Complete source file; linked examples may select a region or line range.

```
let printSequence (sequence1: Collections.seq<_>) =
    Seq.iter (fun elem -> printf "%s " (elem.ToString())) sequence1

```
