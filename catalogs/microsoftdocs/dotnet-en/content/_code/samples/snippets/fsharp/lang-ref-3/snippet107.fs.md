# Source code: samples/snippets/fsharp/lang-ref-3/snippet107.fs

Complete source file; linked examples may select a region or line range.

```
//let emptyList10 = Array.create 10 []
// Adding an extra (unused) parameter makes it a function, which is generalizable.
let emptyList10 () = Array.create 10 []
```
