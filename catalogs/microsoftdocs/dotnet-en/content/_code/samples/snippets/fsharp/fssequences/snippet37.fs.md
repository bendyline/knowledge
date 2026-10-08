# Source code: samples/snippets/fsharp/fssequences/snippet37.fs

Complete source file; linked examples may select a region or line range.

```
let seqA = [| 2 .. 100 |]
let delta = 1.0e-10
let isPerfectSquare (x:int) =
    let y = sqrt (float x)
    abs(y - round y) < delta
let isPerfectCube (x:int) =
    let y = System.Math.Pow(float x, 1.0/3.0)
    abs(y - round y) < delta
let element = Seq.find (fun elem -> isPerfectSquare elem && isPerfectCube elem) seqA
let index = Seq.findIndex (fun elem -> isPerfectSquare elem && isPerfectCube elem) seqA
printfn "The first element that is both a square and a cube is %d and its index is %d." element index
```
