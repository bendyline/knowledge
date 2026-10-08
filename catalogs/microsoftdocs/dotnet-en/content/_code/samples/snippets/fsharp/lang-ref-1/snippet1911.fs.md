# Source code: samples/snippets/fsharp/lang-ref-1/snippet1911.fs

Complete source file; linked examples may select a region or line range.

```
type RecordTest = { X: int; Y: int }

let record1 = { X = 1; Y = 2 }
let record2 = { X = 1; Y = 2 }

if (record1 = record2) then
    printfn "The records are equal."
else
    printfn "The records are unequal."
```
