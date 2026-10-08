# Source code: samples/snippets/fsharp/lang-ref-1/snippet2402.fs

Complete source file; linked examples may select a region or line range.

```
type MyClass2(dataIn) as self =
    let data = dataIn
    do self.PrintMessage()

    member this.PrintMessage() =
        printf "Creating MyClass2 with Data %d" data

```
