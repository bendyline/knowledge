# Source code: samples/snippets/fsharp/lang-ref-3/snippet105.fs

Complete source file; linked examples may select a region or line range.

```
//let sqrList = [ for i in 1..10 -> i*i ]
// Adding a type annotation fixes the problem:
let sqrList : int list = [ for i in 1..10 -> i*i ]
```
