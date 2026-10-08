# Source code: samples/snippets/fsharp/lists/snippet8.fs

Complete source file; linked examples may select a region or line range.

```
let isDivisibleBy number elem = elem % number = 0
let result = List.find (isDivisibleBy 5) [ 1 .. 100 ]
printfn "%d " result
```
