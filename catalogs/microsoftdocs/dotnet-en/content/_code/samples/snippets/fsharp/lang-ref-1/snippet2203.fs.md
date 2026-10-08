# Source code: samples/snippets/fsharp/lang-ref-1/snippet2203.fs

Complete source file; linked examples may select a region or line range.

```
let xRef = ref 10

printfn "%d" xRef.Value

xRef.Value <- 11

printfn "%d" xRef.Value

```
