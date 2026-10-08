# Source code: samples/snippets/fsharp/lang-ref-1/snippet1401.fs

Complete source file; linked examples may select a region or line range.

```
let exists (x: int option) =
    match x with
    | Some(x) -> true
    | None -> false

```
