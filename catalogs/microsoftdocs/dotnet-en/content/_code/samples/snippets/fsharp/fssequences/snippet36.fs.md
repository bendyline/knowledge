# Source code: samples/snippets/fsharp/fssequences/snippet36.fs

Complete source file; linked examples may select a region or line range.

```
let isDivisibleBy number elem = elem % number = 0
let result = Seq.find (isDivisibleBy 5) [ 1 .. 100 ]
printfn "%d " result
```
