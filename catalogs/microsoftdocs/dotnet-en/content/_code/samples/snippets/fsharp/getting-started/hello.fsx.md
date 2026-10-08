# Source code: samples/snippets/fsharp/getting-started/hello.fsx

Complete source file; linked examples may select a region or line range.

```
printfn "Hello from F# Interactive!"

let square x = x * x

[ 1 .. 10 ]
|> List.map square
|> printfn "Squares: %A"

```
