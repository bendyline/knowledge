# Source code: samples/snippets/fsharp/lang-ref-2/snippet5208.fs

Complete source file; linked examples may select a region or line range.

```
let function4() =
    for i in 10 .. -1 .. 1 do
        printf "%d " i
    printfn " ... Lift off!"
function4()
```
