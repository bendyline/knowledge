# Source code: samples/snippets/fsharp/arrays/snippet76.fs

Complete source file; linked examples may select a region or line range.

```
let inputArray = [| -5 .. 10 |]
let printArray array1 = Array.iter (printf "%A ") array1; printfn ""
printfn "Original array: "
printArray inputArray
printfn "\nArray with distinct absolute values: "
let arrayDistinctAbsoluteValue = Array.distinctBy (fun elem -> abs elem) inputArray
arrayDistinctAbsoluteValue |> printArray

```
