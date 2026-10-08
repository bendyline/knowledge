# Source code: samples/snippets/fsharp/arrays/snippet15.fs

Complete source file; linked examples may select a region or line range.

```
printfn "%A" (Array.collect (fun elem -> [| 0 .. elem |]) [| 1; 5; 10|])
```
