# Source code: samples/snippets/fsharp/lang-ref-2/snippet6703.fs

Complete source file; linked examples may select a region or line range.

```
type MyStruct =
    struct
        val mutable myInt : int
        val mutable myString : string
    end

let mutable myStructObj = new MyStruct()
myStructObj.myInt <- 11
myStructObj.myString <- "xyz"

printfn "%d %s" (myStructObj.myInt) (myStructObj.myString)
```
