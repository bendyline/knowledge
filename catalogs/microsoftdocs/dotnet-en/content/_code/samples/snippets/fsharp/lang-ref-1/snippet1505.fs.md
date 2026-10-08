# Source code: samples/snippets/fsharp/lang-ref-1/snippet1505.fs

Complete source file; linked examples may select a region or line range.

```
let (height, width) = (10, 10)

seq {
    for row in 0 .. width - 1 do
        for col in 0 .. height - 1 -> (row, col, row * width + col)
}

```
