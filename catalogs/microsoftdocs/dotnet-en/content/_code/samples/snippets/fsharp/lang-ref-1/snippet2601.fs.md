# Source code: samples/snippets/fsharp/lang-ref-1/snippet2601.fs

Complete source file; linked examples may select a region or line range.

```
type MyClassBase1() =
    let mutable z = 0
    abstract member function1: int -> int

    default u.function1(a: int) =
        z <- z + a
        z

type MyClassDerived1() =
    inherit MyClassBase1()
    override u.function1(a: int) = a + 1

```
