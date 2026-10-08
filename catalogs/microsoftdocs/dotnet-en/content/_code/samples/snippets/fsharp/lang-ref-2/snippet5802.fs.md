# Source code: samples/snippets/fsharp/lang-ref-2/snippet5802.fs

Complete source file; linked examples may select a region or line range.

```
let divide x y =
  if (y = 0) then raise (System.ArgumentException("Divisor cannot be zero!"))
  else
     x / y
```
