# Source code: samples/snippets/fsharp/lists/snippet56.fs

Complete source file; linked examples may select a region or line range.

```
[ -10.0 .. 10.0 ]
|> List.maxBy (fun x -> 1.0 - x * x)
|> printfn "%A"
```
