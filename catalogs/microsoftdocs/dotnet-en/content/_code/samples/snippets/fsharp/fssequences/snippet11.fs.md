# Source code: samples/snippets/fsharp/fssequences/snippet11.fs

Complete source file; linked examples may select a region or line range.

```
// Convert an array to a sequence by using a cast.
let seqFromArray1 = [| 1 .. 10 |] :> seq<int>

// Convert an array to a sequence by using Seq.ofArray.
let seqFromArray2 = [| 1 .. 10 |] |> Seq.ofArray
```
