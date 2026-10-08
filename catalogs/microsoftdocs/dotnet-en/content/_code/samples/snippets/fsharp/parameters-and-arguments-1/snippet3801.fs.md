# Source code: samples/snippets/fsharp/parameters-and-arguments-1/snippet3801.fs

Complete source file; linked examples may select a region or line range.

```
let makeList _ = [ for i in 1 .. 100 -> i * i ]
// The arguments 100 and 200 are ignored.
let list1 = makeList 100
let list2 = makeList 200
```
