# Source code: samples/snippets/fsharp/lang-ref-1/snippet13071.fs

Complete source file; linked examples may select a region or line range.

```
let rec sum list =
    match list with
    | head :: tail -> head + sum tail
    | [] -> 0

```
