# Source code: samples/snippets/fsharp/fssequences/snippet57.fs

Complete source file; linked examples may select a region or line range.

```
[| for x in -100 .. 100 -> x * x - 4 |]
|> Seq.min
|> printfn "%A"
```
