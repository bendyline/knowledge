# Source code: samples/snippets/fsharp/lang-ref-1/snippet113.fs

Complete source file; linked examples may select a region or line range.

```
let function1 x = x + 1
let function2 x = x * 2
let h = function1 >> function2
let result5 = h 100
```
