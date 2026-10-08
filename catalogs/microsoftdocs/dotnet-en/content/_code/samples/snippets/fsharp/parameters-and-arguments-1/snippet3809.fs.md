# Source code: samples/snippets/fsharp/parameters-and-arguments-1/snippet3809.fs

Complete source file; linked examples may select a region or line range.

```
type Incrementor(z) =
    member this.Increment(i : int byref) =
       i <- i + z

let incrementor = new Incrementor(1)
let mutable x = 10
// Not recommended: Does not actually increment the variable.
incrementor.Increment(ref x)
// Prints 10.
printfn "%d" x

let mutable y = 10
incrementor.Increment(&y)
// Prints 11.
printfn "%d" y

let refInt = ref 10
incrementor.Increment(refInt)
// Prints 11.
printfn "%d" !refInt
```
