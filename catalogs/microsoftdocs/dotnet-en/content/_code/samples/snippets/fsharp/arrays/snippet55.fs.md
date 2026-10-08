# Source code: samples/snippets/fsharp/arrays/snippet55.fs

Complete source file; linked examples may select a region or line range.

```
[| for x in -100 .. 100 -> 4 - x * x |]
|> Array.max
|> printfn "%A"
```
