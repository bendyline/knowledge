# Source code: samples/snippets/fsharp/lang-ref-1/snippet2801.fs

Complete source file; linked examples may select a region or line range.

```
type IPrintable =
    abstract member Print: unit -> unit

type SomeClass1(x: int, y: float) =
    interface IPrintable with
        member this.Print() = printfn "%d %f" x y

```
