# Source code: samples/snippets/fsharp/lang-ref-3/snippet201.fs

Complete source file; linked examples may select a region or line range.

```
let inline increment x = x + 1
type WrapInt32() =
    member inline this.incrementByOne(x) = x + 1
    static member inline Increment(x) = x + 1
```
