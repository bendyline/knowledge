# Source code: samples/snippets/fsharp/lang-ref-1/snippet1508.fs

Complete source file; linked examples may select a region or line range.

```
let multiplicationTable =
    seq {
        for i in 1..9 do
            for j in 1..9 -> (i, j, i * j)
    }

```
