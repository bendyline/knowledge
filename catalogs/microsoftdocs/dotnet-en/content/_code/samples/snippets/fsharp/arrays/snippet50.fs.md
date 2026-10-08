# Source code: samples/snippets/fsharp/arrays/snippet50.fs

Complete source file; linked examples may select a region or line range.

```
Array.length [| 1 .. 100 |] |> printfn "Length: %d"
Array.length [| |] |> printfn "Length: %d"
Array.length [| 1 .. 2 .. 100 |] |> printfn "Length: %d"
```
