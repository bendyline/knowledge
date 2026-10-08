# Source code: samples/snippets/fsharp/lang-ref-2/snippet3505.fs

Complete source file; linked examples may select a region or line range.

```
type MyClass2(x : int) =
    member this.X = x
    new() as this = MyClass2(0) then printfn "Initializing with X = %d" this.X
```
