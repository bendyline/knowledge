# Source code: samples/snippets/fsharp/lang-ref-3/snippet302.fs

Complete source file; linked examples may select a region or line range.

```
// Type annotations on a parameter.
let addu1 (x : uint32) y =
    x + y

// Type annotations on an expression.
let addu2 x y =
    (x : uint32) + y
```
