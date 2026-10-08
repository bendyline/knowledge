# Source code: samples/snippets/fsharp/lang-ref-1/snippet3302.fs

Complete source file; linked examples may select a region or line range.

```
open System.Collections.Generic

type SparseMatrix() =
    let mutable table = new Dictionary<(int * int), float>()

    member this.Item
        with get (key1, key2) = table[(key1, key2)]
        and set (key1, key2) value = table[(key1, key2)] <- value

let matrix1 = new SparseMatrix()

for i in 1..1000 do
    matrix1[i, i] <- float i * float i

```
