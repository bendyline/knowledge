# Source code: samples/snippets/fsharp/arrays/snippet19.fs

Complete source file; linked examples may select a region or line range.

```
[| 1 .. 10 |]
|> Array.filter (fun elem -> elem % 2 = 0)
|> Array.choose (fun elem -> if (elem <> 8) then Some(elem*elem) else None)
|> Array.rev
|> printfn "%A"
```
