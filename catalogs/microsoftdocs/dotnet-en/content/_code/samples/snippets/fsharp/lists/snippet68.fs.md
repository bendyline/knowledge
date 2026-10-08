# Source code: samples/snippets/fsharp/lists/snippet68.fs

Complete source file; linked examples may select a region or line range.

```
[ 1 .. 10 ]
|> List.toSeq
|> Seq.truncate 5
|> Seq.iter (fun elem -> printf "%d " elem)
printfn ""
```
