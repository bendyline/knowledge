# Source code: samples/snippets/fsharp/getting-started/hello-square.fs

Complete source file; linked examples may select a region or line range.

```
module HelloSquare

let square x = x * x

[<EntryPoint>]
let main argv =
    printfn "%d squared is: %d!" 12 (square 12)
    0 // Return an integer exit code
```
