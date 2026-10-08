# Source code: samples/snippets/fsharp/lang-ref-1/snippet111.fs

Complete source file; linked examples may select a region or line range.

```
let apply2 (f: int -> int -> int) x y = f x y

let mul x y = x * y

let result2 = apply2 mul 10 20
```
