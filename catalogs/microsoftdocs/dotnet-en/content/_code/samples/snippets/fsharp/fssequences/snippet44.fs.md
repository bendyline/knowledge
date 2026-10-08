# Source code: samples/snippets/fsharp/fssequences/snippet44.fs

Complete source file; linked examples may select a region or line range.

```
let table1 = seq { for i in 1 ..10 do
                      for j in 1 .. 10 ->
                          (i, j, i*j)
                 }
Seq.length table1 |> printfn "Length: %d"
```
