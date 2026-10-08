# Source code: samples/snippets/fsharp/lang-ref-1/snippet2804.fs

Complete source file; linked examples may select a region or line range.

```
let makePrintable (x: int, y: float) =
    { new IPrintable with
        member this.Print() = printfn "%d %f" x y }

let x3 = makePrintable (1, 2.0)
x3.Print()

```
