# Source code: samples/snippets/fsharp/lang-ref-2/snippet4815.fs

Complete source file; linked examples may select a region or line range.

```
let detect1 x =
    match x with
    | 1 -> printfn "Found a 1!"
    | (var1 : int) -> printfn "%d" var1
detect1 0
detect1 1
```
