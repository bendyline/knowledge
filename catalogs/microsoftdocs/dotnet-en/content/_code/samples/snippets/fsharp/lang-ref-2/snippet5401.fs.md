# Source code: samples/snippets/fsharp/lang-ref-2/snippet5401.fs

Complete source file; linked examples may select a region or line range.

```
let subtractUnsigned (x : uint32) (y : uint32) =
    assert (x > y)
    let z = x - y
    z
// This code does not generate an assertion failure.
let result1 = subtractUnsigned 2u 1u
// This code generates an assertion failure.
let result2 = subtractUnsigned 1u 2u
```
