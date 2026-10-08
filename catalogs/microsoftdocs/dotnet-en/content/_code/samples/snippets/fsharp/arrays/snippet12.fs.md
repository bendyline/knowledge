# Source code: samples/snippets/fsharp/arrays/snippet12.fs

Complete source file; linked examples may select a region or line range.

```
let a1 = [| 0 .. 99 |]
let a2 = Array.sub a1 5 10
printfn "%A" a2
```
