# Source code: samples/snippets/fsharp/arrays/snippet75.fs

Complete source file; linked examples may select a region or line range.

```
let array1 = [| 1 .. 10 |]

// The following chunks the array into sub-arrays of size 2
printfn "%A" (Array.chunkBySize 2 array1)

// The following chunks the array into sub-arrays of size 3, with the last array being a single element
printfn "%A" (Array.chunkBySize 3 array1)

```
