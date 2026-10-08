# Source code: samples/snippets/fsharp/lang-ref-1/snippet2401.fs

Complete source file; linked examples may select a region or line range.

```
type MyClass1(x: int, y: int) =
    do printfn "%d %d" x y
    new() = MyClass1(0, 0)

```
