# Source code: samples/snippets/fsharp/lang-ref-1/snippet4001.fs

Complete source file; linked examples may select a region or line range.

```
let rec fib n =
    if n <= 2 then 1 else fib (n - 1) + fib (n - 2)

```
