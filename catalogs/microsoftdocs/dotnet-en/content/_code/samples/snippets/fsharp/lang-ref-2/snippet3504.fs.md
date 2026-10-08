# Source code: samples/snippets/fsharp/lang-ref-2/snippet3504.fs

Complete source file; linked examples may select a region or line range.

```
type MyClass1(x) as this =
    // This use of the self identifier produces a warning - avoid.
    let x1 = this.X
    // This use of the self identifier is acceptable.
    do printfn "Initializing object with X =%d" this.X
    member this.X = x
```
