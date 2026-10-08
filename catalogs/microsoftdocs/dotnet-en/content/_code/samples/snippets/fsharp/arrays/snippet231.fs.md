# Source code: samples/snippets/fsharp/arrays/snippet231.fs

Complete source file; linked examples may select a region or line range.

```
let allNegative = Array.exists (fun elem -> abs (elem) = elem) >> not
printfn "%A" (allNegative [| -1; -2; -3 |])
printfn "%A" (allNegative [| -10; -1; 5 |])
printfn "%A" (allNegative [| 0 |])
```
