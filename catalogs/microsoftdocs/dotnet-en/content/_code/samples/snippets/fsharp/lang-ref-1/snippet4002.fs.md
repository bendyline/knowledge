# Source code: samples/snippets/fsharp/lang-ref-1/snippet4002.fs

Complete source file; linked examples may select a region or line range.

```
let rec Even x = if x = 0 then true else Odd(x - 1)
and Odd x = if x = 0 then false else Even(x - 1)

```
