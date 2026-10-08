# Source code: samples/snippets/fsharp/contour/snippet32.fs

Complete source file; linked examples may select a region or line range.

```
let checkFor item =
    let functionToReturn = fun lst ->
                           List.exists (fun a -> a = item) lst
    functionToReturn
```
