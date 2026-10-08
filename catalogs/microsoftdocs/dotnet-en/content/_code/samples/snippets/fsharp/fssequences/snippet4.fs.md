# Source code: samples/snippets/fsharp/fssequences/snippet4.fs

Complete source file; linked examples may select a region or line range.

```
let (height, width) = (10, 10)
let coordinates = seq {
     for row in 0 .. width - 1 do
        for col in 0 .. height - 1 ->
            (row, col, row*width + col) }
```
