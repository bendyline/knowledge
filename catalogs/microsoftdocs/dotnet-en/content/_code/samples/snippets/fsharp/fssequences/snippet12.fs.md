# Source code: samples/snippets/fsharp/fssequences/snippet12.fs

Complete source file; linked examples may select a region or line range.

```
open System

let arr = ResizeArray<int>(10)

for i in 1 .. 10 do
    arr.Add(10)

let seqCast = Seq.cast arr
```
