# Source code: samples/snippets/fsharp/lang-ref-1/snippet3502.fs

Complete source file; linked examples may select a region or line range.

```
open Microsoft.FSharp.Core.Operators.Checked

let safeAddition () =
    try
        let result = 2147483647 + 1 // Attempt to add integers at their maximum boundary
        printfn "Result: %d" result
    with
    | :? System.OverflowException as ex ->
        printfn "Overflow occurred: %s" ex.Message

safeAddition()

// Output:
// Overflow occurred: Arithmetic operation resulted in an overflow.

```
