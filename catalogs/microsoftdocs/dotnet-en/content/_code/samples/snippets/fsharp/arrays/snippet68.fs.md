# Source code: samples/snippets/fsharp/arrays/snippet68.fs

Complete source file; linked examples may select a region or line range.

```
[| 1 .. 10 |]
|> Array.toList
|> List.rev
|> List.iter (fun elem -> printf "%d " elem)
printfn ""
```
