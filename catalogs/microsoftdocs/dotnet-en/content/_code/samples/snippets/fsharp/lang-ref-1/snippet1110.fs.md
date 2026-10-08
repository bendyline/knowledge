# Source code: samples/snippets/fsharp/lang-ref-1/snippet1110.fs

Complete source file; linked examples may select a region or line range.

```
type MyClass(a) =
    let field1 = a
    let field2 = "text"
    do printfn "%d %s" field1 field2
    member this.F input =
        printfn "Field1 %d Field2 %s Input %A" field1 field2 input
```
