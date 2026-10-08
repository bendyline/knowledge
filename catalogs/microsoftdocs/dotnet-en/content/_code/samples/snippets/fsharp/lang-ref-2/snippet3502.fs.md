# Source code: samples/snippets/fsharp/lang-ref-2/snippet3502.fs

Complete source file; linked examples may select a region or line range.

```
type MyStruct =
    struct
       val X : int
       val Y : int
       val Z : int
       new(x, y, z) = { X = x; Y = y; Z = z }
    end

let myStructure1 = new MyStruct(1, 2, 3)
```
