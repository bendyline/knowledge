# Source code: samples/snippets/fsharp/fssequences/snippet58.fs

Complete source file; linked examples may select a region or line range.

```
[| -10.0 .. 10.0 |]
|> Seq.minBy (fun x -> x * x - 1.0)
|> printfn "%A"
```
