# Source code: samples/snippets/fsharp/lang-ref-2/snippet5207.fs

Complete source file; linked examples may select a region or line range.

```
let mutable count = 0
for _ in list1 do
   count <- count + 1
printfn "Number of elements in list1: %d" count
```
