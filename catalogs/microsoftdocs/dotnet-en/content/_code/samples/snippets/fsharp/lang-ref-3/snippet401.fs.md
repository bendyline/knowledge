# Source code: samples/snippets/fsharp/lang-ref-3/snippet401.fs

Complete source file; linked examples may select a region or line range.

```
let inline (+@) x y = x + x * y
// Call that uses int.
printfn "%d" (1 +@ 1)
// Call that uses float.
printfn "%f" (1.0 +@ 0.5)
```
