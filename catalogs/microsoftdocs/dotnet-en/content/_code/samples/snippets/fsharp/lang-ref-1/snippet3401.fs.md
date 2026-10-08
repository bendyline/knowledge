# Source code: samples/snippets/fsharp/lang-ref-1/snippet3401.fs

Complete source file; linked examples may select a region or line range.

```
type SomeType(factor0: int) =
    let factor = factor0
    member this.SomeMethod(a, b, c) = (a + b + c) * factor

    member this.SomeOtherMethod(a, b, c) = this.SomeMethod(a, b, c) * factor

```
