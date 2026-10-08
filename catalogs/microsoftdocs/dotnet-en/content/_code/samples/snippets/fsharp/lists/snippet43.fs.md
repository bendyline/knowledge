# Source code: samples/snippets/fsharp/lists/snippet43.fs

Complete source file; linked examples may select a region or line range.

```
List.init 10 (fun i -> (i, i * i))
|> List.filter (fun (n, nsqr) -> n % 2 = 0)
|> List.rev
|> List.iter (fun (n, nsqr) -> printfn "(%d, %d) " n nsqr)
```
