# Source code: samples/snippets/fsharp/fssequences/snippet48.fs

Complete source file; linked examples may select a region or line range.

```
[| for x in -100 .. 100 -> 4 - x * x |]
|> Seq.max
|> printfn "%A"
```
