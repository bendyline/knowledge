# Source code: samples/snippets/fsharp/arrays/snippet53.fs

Complete source file; linked examples may select a region or line range.

```
let array1 = [| 1; 2; 3 |]
let newArray = Array.mapi (fun i x -> (i, x)) array1
printfn "%A" newArray
```
