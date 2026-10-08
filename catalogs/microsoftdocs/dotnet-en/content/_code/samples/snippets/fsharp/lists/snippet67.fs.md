# Source code: samples/snippets/fsharp/lists/snippet67.fs

Complete source file; linked examples may select a region or line range.

```
[ 1 .. 10 ]
|> List.sumBy (fun x -> x * x)
|> printfn "Sum: %d"
```
