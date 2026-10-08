# Source code: samples/snippets/fsharp/arrays/snippet48.fs

Complete source file; linked examples may select a region or line range.

```
let printArray array1 =
    if (Array.isEmpty array1) then
        printfn "There are no elements in this array."
    else
        printfn "This array contains the following elements:"
        Array.iter (fun elem -> printf "%A " elem) array1
        printfn ""
printArray [| "test1"; "test2" |]
printArray [| |]
```
