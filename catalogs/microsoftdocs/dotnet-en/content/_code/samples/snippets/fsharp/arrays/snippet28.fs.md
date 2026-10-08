# Source code: samples/snippets/fsharp/arrays/snippet28.fs

Complete source file; linked examples may select a region or line range.

```
let arrayFill1 = [| 1 .. 25 |]
Array.fill arrayFill1 2 20 0
printfn "%A" arrayFill1
```
