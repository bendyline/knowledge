# Source code: samples/snippets/fsharp/arrays/snippet67.fs

Complete source file; linked examples may select a region or line range.

```
[| 1 .. 10 |]
|> Array.sumBy (fun x -> x * x)
|> printfn "Sum: %d"
```
