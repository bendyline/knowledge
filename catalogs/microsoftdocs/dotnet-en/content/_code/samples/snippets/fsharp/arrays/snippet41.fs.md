# Source code: samples/snippets/fsharp/arrays/snippet41.fs

Complete source file; linked examples may select a region or line range.

```
let array1 = [|1; 4; 8; -2; 5|]
Array.sortInPlaceBy (fun elem -> abs elem) array1
printfn "%A" array1
```
