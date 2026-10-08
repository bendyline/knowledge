# Source code: samples/snippets/fsharp/modules/snippet6610.fs

Complete source file; linked examples may select a region or line range.

```
// This code produces a warning, but treats Z as a inner module.
module Y =
module Z =
    let z = 5
```
