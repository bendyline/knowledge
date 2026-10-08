# Source code: samples/snippets/fsharp/arrays/snippet17.fs

Complete source file; linked examples may select a region or line range.

```
printfn "%A" (Array.filter (fun elem -> elem % 2 = 0) [| 1 .. 10|])
```
