# Source code: samples/snippets/fsharp/lang-ref-2/snippet73011.fs

Complete source file; linked examples may select a region or line range.

```
let x = 10
let result = lazy (x + 10)
printfn "%d" (result.Force())
```
