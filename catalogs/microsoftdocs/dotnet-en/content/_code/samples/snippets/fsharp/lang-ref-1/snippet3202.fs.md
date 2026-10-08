# Source code: samples/snippets/fsharp/lang-ref-1/snippet3202.fs

Complete source file; linked examples may select a region or line range.

```
type MyClass(x: string) =
    let mutable myInternalValue = x

    member this.MyProperty
        with get () = myInternalValue
        and set (value) = myInternalValue <- value

```
