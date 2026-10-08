# Source code: samples/snippets/fsharp/arrays/snippet69.fs

Complete source file; linked examples may select a region or line range.

```
[| 1 .. 10 |]
|> Array.toSeq
|> Seq.truncate 5
|> Seq.iter (fun elem -> printf "%d " elem)
printfn ""
```
