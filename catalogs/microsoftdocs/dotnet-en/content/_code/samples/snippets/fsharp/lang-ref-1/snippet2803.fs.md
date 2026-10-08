# Source code: samples/snippets/fsharp/lang-ref-1/snippet2803.fs

Complete source file; linked examples may select a region or line range.

```
type SomeClass2(x: int, y: float) =
    member this.Print() = (this :> IPrintable).Print()

    interface IPrintable with
        member this.Print() = printfn "%d %f" x y

let x2 = new SomeClass2(1, 2.0)
x2.Print()
```
