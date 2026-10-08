# Source code: samples/snippets/fsharp/lists/snippet33.fs

Complete source file; linked examples may select a region or line range.

```
let sumAList list =
    try
        List.reduce (fun acc elem -> acc + elem) list
    with
       | :? System.ArgumentException as exc -> 0

let resultSum = sumAList [2; 4; 10]
printfn "%d " resultSum
```
