# Source code: samples/snippets/fsharp/arrays/snippet33.fs

Complete source file; linked examples may select a region or line range.

```
let removeOutliers array1 min max =
    Array.partition (fun elem -> elem > min && elem < max) array1
    |> fst
removeOutliers [| 1 .. 100 |] 50 60
|> printf "%A"
```
