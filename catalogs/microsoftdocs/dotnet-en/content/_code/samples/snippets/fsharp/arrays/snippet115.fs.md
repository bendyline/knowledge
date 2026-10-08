# Source code: samples/snippets/fsharp/arrays/snippet115.fs

Complete source file; linked examples may select a region or line range.

```
let array1 = [| 1 .. 100 |]
let printArray anarray =
    anarray
    |> Array.iter (printf "%A ")
    printfn ""
let arrayResult = Array.countBy (fun elem ->
    if (elem % 2 = 0) then 0 else 1) array1

printArray arrayResult
```
