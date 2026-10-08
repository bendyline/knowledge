# Source code: samples/snippets/fsharp/arrays/snippet56.fs

Complete source file; linked examples may select a region or line range.

```
[| -10.0 .. 10.0 |]
|> Array.maxBy (fun x -> 1.0 - x * x)
|> printfn "%A"
```
